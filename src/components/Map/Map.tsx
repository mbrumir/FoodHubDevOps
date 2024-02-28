import React, {useEffect, useRef, useState} from "react";
import {
	APIProvider,
	Map,
	useMap,
	AdvancedMarker
	// Pin
} from '@vis.gl/react-google-maps';

import {MarkerClusterer} from '@googlemaps/markerclusterer';
import type {Marker} from '@googlemaps/markerclusterer';
import MapFilters from "./MapFilters";
import MapObjectDetails from "./MapObjectDetails";
import { db } from "../../firebase";
import { collection, getDocs, where, query, doc, getDoc, DocumentSnapshot } from "@firebase/firestore";

const API_KEY = "AIzaSyButo3F2cEMH6mNiMGIhbqypnxY3YeMGq0";
function MapComponent() {
	const [restaurants, setRestaurants] = useState<any[]>([]);
	const [markers, setMarkers] = useState<any[]>([]);
	const [restaurantDetails, setRestaurantDetails] = useState<any>(false);
	const [filters, setFilters] = useState<any>({}); // { creatorOption, foodOption, priceOption }
	const [firstTime, setFisrtTime] = useState<any>(true);

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

				if (localUpdated != updated) {
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

	type Props = {points: any[]};

	const Markers = ({points} : Props) => {
		const map = useMap();
		const [markers, setMarkers] = useState<{[key: string]: Marker}>({});
		const clusterer = useRef<MarkerClusterer | null>(null);

		// Initialize MarkerClusterer
		useEffect(() => {
			console.log(123);
			if (!map) return;
			if (!clusterer.current) {
				clusterer.current = new MarkerClusterer({map});
			}
		}, [map]);

		// Update markers
		useEffect(() => {
			clusterer.current?.clearMarkers();
			clusterer.current?.addMarkers(Object.values(markers));
		}, [markers]);

		const setMarkerRef = (marker: Marker | null, key: string) => {
			if (marker && markers[key]) return;
			if (!marker && !markers[key]) return;

			setMarkers(prev => {
				if (marker) {
					return {...prev, [key]: marker};
				} else {
					const newMarkers = {...prev};
					delete newMarkers[key];
					return newMarkers;
				}
			});
		};

		return (
				<>
					{points.map(point => (
							<AdvancedMarker
									position={point}
									key={point.key}
									ref={marker => setMarkerRef(marker, point.key)}
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
				</>
		);
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
				<Markers points={markers} />
				{/*{ markers.map((marker, index) => (*/}
				{/*	<Marker*/}
				{/*		position={marker}*/}
				{/*		clickable={true}*/}
				{/*		onClick={() => {*/}
				{/*			handleShowRestaurantDetails();*/}
				{/*			setRestaurantDetails(marker.name);*/}
				{/*			setTimeout(() => {*/}
				{/*				hideFooter();*/}
				{/*			}, 1);*/}
				{/*		}}*/}
				{/*		title={marker.name}*/}
				{/*	/>*/}
				{/*))}*/}
				{/*/!* simple marker *!/*/}
			</Map>
		</APIProvider>
	);
}

export default MapComponent;
