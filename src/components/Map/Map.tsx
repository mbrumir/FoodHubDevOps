import React, {useEffect, useState} from "react";
import {
	APIProvider,
	Map,
	AdvancedMarker
	// Pin
} from '@vis.gl/react-google-maps';

import MapFilters from "./MapFilters";
import PinsLegend from "../PinsLegend/PinsLegend";
import MapObjectDetails from "./MapObjectDetails";
import { db } from "../../firebase";
import { collection, getDocs, where, query, doc, getDoc, DocumentSnapshot } from "@firebase/firestore";
import './Map.css';

const API_KEY = "AIzaSyButo3F2cEMH6mNiMGIhbqypnxY3YeMGq0";
function MapComponent() {
	const defaultFiters = {
		creatorOption: 'any',
		foodOption: 'any',
		priceOption: 'any',
		mualaOption: false
	};
	const [restaurants, setRestaurants] = useState<any[]>([]);
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

	const filterByMuala = (arr: any[], isMualla: boolean) => {
		return arr.filter(function(obj) {
					return obj.isMualla === isMualla;
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
			let requiredRestaurantData = restaurantsData.map((restaurant) => {
				return {
					lat: restaurant.place.geometry.location.lat,
					lng: restaurant.place.geometry.location.lng,
					name: restaurant.place.name,
					key: restaurant.updated,
					type: restaurant.food_type,
					creator: restaurant.channelId
				}
			});
			setRestaurants(restaurantsData);
			localStorage.setItem('restaurants', JSON.stringify(requiredRestaurantData));
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

				if (localUpdated !== updated || !localStorage.getItem('restaurants')) {
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

			if (filters.foodOption !== 'Rodzaj') {
				searchedRestaurants = filterByFood(searchedRestaurants, filters.foodOption);
            }

			if (filters.priceOption !== 'Cena') {
				searchedRestaurants = filterByPrice(searchedRestaurants, parseInt(filters.priceOption));
            }

			if (filters.creatorOption !== 'Twórcy') {
				searchedRestaurants = filterByChannelId(searchedRestaurants, filters.creatorOption);
            }

			if (filters.mualaOption) {
				searchedRestaurants = filterByMuala(searchedRestaurants, filters.mualaOption);
			}

		setRestaurants(searchedRestaurants);
	}, [filters]);

	return (
		<APIProvider apiKey={API_KEY} libraries={['marker']}>
			<Map
					mapId={'bf51a910020fa25a'}
					defaultZoom={7}
					minZoom={3}
					defaultCenter={{lat: 52, lng: 19}}
					gestureHandling={'greedy'}
					style={{position: "relative"}}
					disableDefaultUI>
				<MapFilters setFilters={setFilters}/>
				<PinsLegend></PinsLegend>
				<MapObjectDetails restaurantName={restaurantDetails}/>
				{ restaurants.map((point, index) => (
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
							<span className={`${point.type} ${point.creator}`}></span>
						</AdvancedMarker>
				))}
				{/*/!* simple marker *!/*/}
			</Map>
		</APIProvider>
	);
}

export default MapComponent;
