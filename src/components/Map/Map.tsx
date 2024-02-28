import React, {useEffect, useRef, useState} from "react";
import {
	APIProvider,
	Map,
	useMap,
	AdvancedMarker
	// Pin
} from '@vis.gl/react-google-maps';

import MapFilters from "./MapFilters";
import MapObjectDetails from "./MapObjectDetails";
import { db } from "../../firebase";
import { collection, getDocs, where, query, doc, getDoc, DocumentSnapshot } from "@firebase/firestore";

const API_KEY = "AIzaSyButo3F2cEMH6mNiMGIhbqypnxY3YeMGq0";
function MapComponent() {
	const defaultFiters = {
		creatorOption: 'any',
		foodOption: 'any',
		priceOption: 'any'
	};
	const [restaurants, setRestaurants] = useState<any[]>([]);
	const [markers, setMarkers] = useState<any[]>([]);
	const [filters, setFilters] = useState<any>(defaultFiters); // { creatorOption, foodOption, priceOption }
	const [restaurantDetails, setRestaurantDetails] = useState<any>(false);

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

	const filterByFood = (arr: any[], food_type: string) => {
		return arr.filter(function(obj) {
					return obj.food_type === food_type;
				}
		)
	}

	const filterByPrice = (arr: any[], price_level: number) => {
		return arr.filter(function(obj) {
					return obj.place.price_level === price_level;
				}
		)
	}

	const filterByChannelId = (arr: any[], channel_id: string) => {
		return arr.filter(function(obj) {
					return obj.channelId === channel_id;
				}
		)
	}

	const fetchData = async () => {
		try {
			let restaurantsCollection = collection(db, "restaurants");
			let q = query(
					restaurantsCollection,
					where("place", "!=", null)
			);

			const typesSnapshot = await getDocs(q);
			let restaurantsData = typesSnapshot.docs.map((doc) => doc.data());
			setRestaurants(restaurantsData);
			localStorage.setItem('restaurants', JSON.stringify(restaurantsData));
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};

	useEffect(() => {
		const fetchConfigData = async () => {
			try {
				const videoConfigDocRef = doc(db, "config", "videos");
				const videoConfigSnapshot: DocumentSnapshot<any> = await getDoc(videoConfigDocRef);
				let updated = videoConfigSnapshot.data().updated;
				let localUpdated = localStorage.getItem('updated');
				if (!localUpdated) {
					updated = new Date().getTime();
				}

				if (localUpdated != updated || !localStorage.getItem('restaurants')) {
					localStorage.setItem('updated', updated);
					fetchData();
				}

			} catch (error) {
				console.error("Error fetching data: ", error);
			}

		}

		fetchConfigData();
	}, []);

	useEffect(() => {
		let localRestaurants = JSON.parse(localStorage.getItem('restaurants') as string);

		if (localRestaurants) {
			setRestaurants(localRestaurants);
		} else {
			fetchData();
		}

		let searchedRestaurants = JSON.parse(localStorage.getItem('restaurants') as string);
		switch (true) {

			case filters.foodOption !== 'Rodzaj':
				searchedRestaurants = filterByFood(searchedRestaurants, filters.foodOption);
				break;

			case filters.priceOption !== 'Cena':
				searchedRestaurants = filterByPrice(searchedRestaurants, parseInt(filters.priceOption));
				break;

			case filters.creatorOption !== 'Twórcy':
				searchedRestaurants = filterByChannelId(searchedRestaurants, filters.creatorOption);
				break;
		}
		setRestaurants(searchedRestaurants);
	}, [filters]);

	useEffect(() => {
		const markers = restaurants.map((restaurant) => {
			return {
				lat: restaurant.place.geometry.location.lat,
				lng: restaurant.place.geometry.location.lng,
				name: restaurant.place.name,
				key: restaurant.updated
			}
		});
		setMarkers(markers);
	}, [restaurants]);

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
				{ markers.map((point, index) => (
						<AdvancedMarker
								position={point}
								key={point.key}
								onClick={() => {
									handleShowRestaurantDetails();
									setRestaurantDetails(point.name);
									setTimeout(() => {
										hideFooter();
									}, 1);
								}}
						>
							<span className="tree">🌳</span>
						</AdvancedMarker>
				))}
				{/*/!* simple marker *!/*/}
			</Map>
		</APIProvider>
	);
}

export default MapComponent;
