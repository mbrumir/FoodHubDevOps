import React, {useEffect} from "react";
import { useState } from "react";
import {
	AdvancedMarker,
	APIProvider,
	Map,
	Marker,
	Pin
} from '@vis.gl/react-google-maps';
import MapFilters from "./MapFilters";
import MapObjectDetails from "./MapObjectDetails";

const API_KEY = "AIzaSyButo3F2cEMH6mNiMGIhbqypnxY3YeMGq0";
function MapComponent() {
	const [markers, setMarkers] = useState<any[]>([]);
	const [restaurantDetails, setRestaurantDetails] = useState<any>(false);

	useEffect(() => {
		let markerObj = [];
		for (let i = 0; i < 5; i++) {
			markerObj.push({
				lat: 52 + Math.random() * 2,
				lng: 18 + Math.random() * 2
			});
		}
		setMarkers(markerObj)
	}, []);

	return (
				<APIProvider apiKey={API_KEY} libraries={['marker']}>
					<Map
							mapId={'bf51a910020fa25a'}
							defaultZoom={7}
							defaultCenter={{lat: 52, lng: 19}}
							gestureHandling={'greedy'}
							style={{position: "relative"}}
							disableDefaultUI>
						<MapFilters />
						<MapObjectDetails display={restaurantDetails} />
						{ markers.map((marker, index) => (
								<Marker
										position={marker}
										clickable={true}
										onClick={() => setRestaurantDetails(!restaurantDetails)}
										title={'clickable google.maps.Marker'}
								/>
						))}
						{/* simple marker */}
					</Map>
				</APIProvider>
	);
};

export default MapComponent;

