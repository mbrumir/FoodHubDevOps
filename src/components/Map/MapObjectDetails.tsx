import React from 'react';
import {Box} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './MapObjectDetails.css';

function MapObjectDetails({display}: { display: any }) {
	const displayStyle = display ? "block" : "none";

	function handleCloseModal(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		const modal = target.closest('div.map--restaurant-details') as HTMLElement;

		modal.style.display="none";
	}

	return (
		<div style={{display: displayStyle, zIndex: 10}} className={'map--restaurant-details'}>
			<Box>
				<div className="header">
					<img src="https://cdn.aniagotuje.com/pictures/articles/2023/07/45574163-v-1500x1500.jpg" alt="zdjęcie z restauracji" width="80px" height="80px"></img>

					<div className="header__content">
						<div className="header__content__name">
							<h2 style={{ WebkitBoxOrient: 'vertical', boxOrient: 'vertical', display: '-webkit-box' }}>Kebab DRWAL</h2>	
							<span>(Kebabownia)</span>
						</div>

						<div className="header__content__opinions">
							<div className="header__content__opinions--stars_container">
								<FontAwesomeIcon icon={faStar} className='star first'/>
								<FontAwesomeIcon icon={faStar} className='star second'/>
								<FontAwesomeIcon icon={faStar} className='star third'/>
								<FontAwesomeIcon icon={faStar} className='star fourth'/>
								<FontAwesomeIcon icon={faStar} className='star fifth'/>
							</div>

							<p><span>650</span> ocen</p>
						</div>
					</div>

					<div className="header__pricing">
						<FontAwesomeIcon icon={faDollarSign} className='dollar first'/>
						<FontAwesomeIcon icon={faDollarSign} className='dollar second'/>
						<FontAwesomeIcon icon={faDollarSign} className='dollar third'/>
					</div>
				</div>

				<div className="restaurant-info">
					<div className="restaurant-info__delivery">
						<FontAwesomeIcon icon={faCarSide}/>
						<span>Możliwa dostawa</span>
					</div>

					<div className="restaurant-info__phone">
						<FontAwesomeIcon icon={faPhone}/>
						<span>501 203 340</span>
					</div>

					<div className="restaurant-info__website">
						<FontAwesomeIcon icon={faGlobe}/>
						<a href="google.com">www.kebsikdrwal.pl</a>
					</div>

					<div className="restaurant-info__address">
						<FontAwesomeIcon icon={faLocationDot}/>
						<span>Śląska 17a, 80-232 Gdańsk</span>
					</div>

				</div>

				<div className="creator-rating">
					<p>Opinia twórcy</p>
					<div>
					<FontAwesomeIcon icon={faQuoteRight}/>
					<span>No jest wszystko w porządku, dobrze jest, dobrze robią, wszystko jest w porządku</span>
					</div>
				</div>

				<iframe height="200" src="https://www.youtube.com/embed/wiX8oofW5B8"
				        title="Cute Cat Dancing - Speed Up" frameBorder="0"
				        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				        allowFullScreen></iframe>

				<span onClick={e => handleCloseModal(e)} className="close-btn"><FontAwesomeIcon icon={faXmark}/></span>
			</Box>
		</div>
	);
}

export default MapObjectDetails;
