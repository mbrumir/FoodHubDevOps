import React, {useEffect, useState} from "react";
import {
	APIProvider,
	Map,
	useMap,
	AdvancedMarker,
	Marker,
	// Pin
} from '@vis.gl/react-google-maps';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import MapFilters from "./MapFilters";
import MapObjectDetails from "./MapObjectDetails";
import { db } from "../../firebase";
import { collection, getDocs, where, query } from "@firebase/firestore";

const API_KEY = "AIzaSyButo3F2cEMH6mNiMGIhbqypnxY3YeMGq0";
function MapComponent() {
	const [restaurants, setRestaurants] = useState<any[]>([]);
	const [markers, setMarkers] = useState<any[]>([]);
	const [restaurantDetails, setRestaurantDetails] = useState<any>(false);
	const [filters, setFilters] = useState<any>({}); // { creatorOption, foodOption, priceOption }
	const [firstTime, setFisrtTime] = useState<any>(true);

	useEffect(() => {
        const storedRestaurants = localStorage.getItem('restaurants');
        if (storedRestaurants && firstTime === true) {
            setRestaurants(JSON.parse(storedRestaurants));
			setFisrtTime(false);
        } else {
			fetchData();
		}
    }, [filters]);

	
	const fetchData = async () => {
		try {
			let restaurantsCollection = collection(db, "restaurants");
			let q = query(
				restaurantsCollection,
				where("place", "!=", null)
				);
			
			switch (true) {
				case filters.foodOption !== 'any' && filters.priceOption !== 'any':
					q = query(
						restaurantsCollection,
						where("place.price_level", "==", parseInt(filters.priceOption)),
						where("food_type", "==", filters.foodOption),
						where("place", "!=", null)
					);
					break;
					
				case filters.foodOption !== 'any':
					q = query(
						restaurantsCollection,
						where("place", "!=", null),
						where("food_type", "==", filters.foodOption)
						);
						break;
						
				case filters.priceOption !== 'any':
					// let priceOption = parseInt(filters.priceOption); // Konwertujemy opcję ceny na liczbę
					// let maxPrice = priceOption + 0.5; // Określamy maksymalną cenę na podstawie opcji ceny
					// Map.tsx:54 Error fetching data:  FirebaseError: Cannot have inequality filters on multiple properties: [place.price_level, place]
					q = query(
						restaurantsCollection,
						where("place", "!=", null),
						where("place.price_level", "==", parseInt(filters.priceOption)),
						// where("place.price_level", "<", maxPrice)
					);
					break;

			}

			const typesSnapshot = await getDocs(q);
			const restaurantsData = typesSnapshot.docs.map((doc) => doc.data());
			setRestaurants(restaurantsData);
			localStorage.setItem('restaurants', JSON.stringify(restaurantsData));

		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};
	
	useEffect(() => {
		const markers = restaurants.map((restaurant) => {
			return {
				lat: restaurant.place.geometry.location.lat,
				lng: restaurant.place.geometry.location.lng,
				name: restaurant.place.name,
			}
		});
		setMarkers(markers);
	}, [restaurants]);

	
	function hideFooter() {
		const footer = document.querySelector('footer') as HTMLElement;
		const restaurantDetails = document.querySelector('div.map--restaurant-details') as HTMLElement;
		
		if (restaurantDetails && restaurantDetails.style.display === 'block') {
			footer.classList.add('hide');
		}
	}

	function handleShowRestaurantDetails() {
		const modal = document.querySelector('div.map--restaurant-details') as HTMLElement;

		if (modal) {
			modal.style.display="block";
		}
	}

	return (
		<APIProvider apiKey={API_KEY} libraries={['marker']}>
			<Map
					mapId={'bf51a910020fa25a'}
					defaultZoom={7}
					defaultCenter={{lat: 52, lng: 19}}
					gestureHandling={'greedy'}
					style={{position: "relative"}}
					disableDefaultUI>
				<MapFilters setFilters={setFilters}/>
				<MapObjectDetails restaurantName={restaurantDetails}/>
				{ markers.map((marker, index) => (
					<Marker
						position={marker}
						clickable={true}
						onClick={() => {
							handleShowRestaurantDetails();
							setRestaurantDetails(marker.name);
							setTimeout(() => {
								hideFooter();
							}, 1);
						}}
						title={marker.name}
					/>
				))}
			</Map>
		</APIProvider>
	);
}

export default MapComponent;
