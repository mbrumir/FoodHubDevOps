import React, {useEffect, useState} from "react";
import {
	// AdvancedMarker,
	APIProvider,
	Map,
	Marker
	// Pin
} from '@vis.gl/react-google-maps';
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

	useEffect(() => {
		const fetchData = async () => {
			try {
				let restaurantsCollection = collection(db, "restaurants");
				let q = query(
					restaurantsCollection,
					where("place", "!=", null)
					);

				const typesSnapshot = await getDocs(q);
				setRestaurants(typesSnapshot.docs.map((doc) => doc.data()));
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, [filters]);

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
		
		if (restaurantDetails && restaurantDetails.style.display === 'flex') {
			footer.classList.add('hide');
		}
	}

	function handleShowRestaurantDetails() {
		const modal = document.querySelector('div.map--restaurant-details') as HTMLElement;

		if (modal) {
			modal.style.display="flex";
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
				{/* simple marker */}
			</Map>
		</APIProvider>
	);
};

export default MapComponent;