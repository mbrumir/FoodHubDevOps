import React from 'react';
import {Box, Form} from 'react-bulma-components';
function MapObjectDetails({display}: { display: any }) {
	const displayStyle = display ? "block" : "none";
	return (
		<div style={{position: "absolute", top: "30px", right: "30px", display: displayStyle}} className={'map--restaurant-details'}>
			<Box>
				<h2>Kebab DRWAL</h2>
				<p>Ocena adslj</p>
				<p>Ocena adslj</p>
				<p>Ocena adslj</p>
				<p>Ocena adslj</p>
				<p>Ocena adslj</p>
				<p>Ocena adslj</p>
				<p>Ocena adslj</p>
				<p>Ocena adslj</p>
				<p>Ocena adslj</p>
				<iframe width="390" height="200" src="https://www.youtube.com/embed/wiX8oofW5B8"
				        title="Cute Cat Dancing - Speed Up" frameBorder="0"
				        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				        allowFullScreen></iframe>
			</Box>
		</div>
	);
}

export default MapObjectDetails;
