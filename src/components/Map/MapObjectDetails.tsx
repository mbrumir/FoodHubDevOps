import React, {useEffect, useState} from 'react';
import {Box} from 'react-bulma-components';
import { db } from "../../firebase";
import { collection, getDocs, where, query } from "@firebase/firestore";
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

function MapObjectDetails(restaurantName: any) {
	const [restaurant, setRestaurant] = useState<any[]>([]);
	const [starsNumber, setStarsNumber] = useState<any>('');
	const [dolarsNumber, setDolarsNumber] = useState<any>('');

	function handleCloseModal(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		const modal = target.closest('div.map--restaurant-details') as HTMLElement;
		const footer = document.querySelector('.footer') as HTMLElement;
		
		if (modal) {
			modal.style.display="none";
		}

		footer.classList.remove('hide');
	}

	useEffect(() => {
		setRestaurant([]);
		const fetchData = async () => {
			try {
				let restaurantCollection = collection(db, "restaurants");
				let q = query(
					restaurantCollection,
					where("place.name", "==", `${restaurantName.restaurantName}`)
					);

				const typesSnapshot = await getDocs(q);
				setRestaurant(typesSnapshot.docs.map((doc) => doc.data()));
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchData();
	}, [restaurantName]);

	useEffect(() => {
		setStarsNumber('');
		const stars = async () => {
			try {
				if (restaurant[0]?.place?.rating) {
					const stars = restaurant[0]?.place?.rating;
					
					switch (true) {
						case stars < 1.5:
							setStarsNumber('one');
							break;
						case stars < 2.5:
							setStarsNumber('two');
							break;
						case stars < 3.5:
							setStarsNumber('three');
							break;
						case stars < 4.5:
							setStarsNumber('four');
							break;
						case stars < 5:
							setStarsNumber('five');
							break;
					}
				}
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		}

		stars();
	}, [restaurant]);

	useEffect(() => {
		setDolarsNumber('');
		const dollars = async () => {
			try {
				if (restaurant[0]?.place?.price_level) {
					const dollars = restaurant[0]?.place?.price_level;
					
					switch (true) {
						case dollars === 1:
							setDolarsNumber('one');
							break;
						case dollars === 2:
							setDolarsNumber('two');
							break;
						case dollars === 3:
							setDolarsNumber('three');
							break;
						case dollars === 4:
							setDolarsNumber('four');
							break;
						case dollars === 5:
							setDolarsNumber('five');
							break;
					}
				}
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		}

		dollars();
	}, [restaurant]);

	return (
		<>
		{restaurant[0] ? (
			<div className={'map--restaurant-details'}>
				<Box>
					<div className="header">
						<img src="https://cdn.aniagotuje.com/pictures/articles/2023/07/45574163-v-1500x1500.jpg" alt="zdjęcie z restauracji" width="80px" height="80px"></img>

						<div className="header__content">
							<div className="header__content__name">
								<h2 style={{ WebkitBoxOrient: 'vertical', boxOrient: 'vertical', display: '-webkit-box' }}>{restaurant[0]?.place?.name}</h2>	
								<span>({restaurant[0]?.food_type})</span>
							</div>

							<div className="header__content__opinions">
								<div className={`header__content__opinions--stars_container ${starsNumber}`}>
									<FontAwesomeIcon icon={faStar} className='star first'/>
									<FontAwesomeIcon icon={faStar} className='star second'/>
									<FontAwesomeIcon icon={faStar} className='star third'/>
									<FontAwesomeIcon icon={faStar} className='star fourth'/>
									<FontAwesomeIcon icon={faStar} className='star fifth'/>
								</div>

								<p><span>{restaurant[0]?.place?.user_ratings_total}</span> ocen</p>
							</div>
						</div>

						<div className={`header__pricing ${dolarsNumber}`}>
							<FontAwesomeIcon icon={faDollarSign} className='dollar first'/>
							<FontAwesomeIcon icon={faDollarSign} className='dollar second'/>
							<FontAwesomeIcon icon={faDollarSign} className='dollar third'/>
							<FontAwesomeIcon icon={faDollarSign} className='dollar fourth'/>
							<FontAwesomeIcon icon={faDollarSign} className='dollar fifth'/>
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
							<span>
							{restaurant[0]?.location?.street && restaurant[0]?.location?.street !== 'false' && `${restaurant[0]?.location?.street} `}
							{restaurant[0]?.location?.street_number && restaurant[0]?.location?.street_number !== 'false' && `${restaurant[0]?.location?.street_number}, `}
							{restaurant[0]?.location?.city && restaurant[0]?.location?.city !== 'false' && `${restaurant[0]?.location?.city}`}
							</span>
						</div>

					</div>

					<div className="creator-rating">
						<p>Opinia twórcy</p>
						<div>
						<FontAwesomeIcon icon={faQuoteRight}/>
						<span>{restaurant[0]?.review}</span>
						</div>
					</div>

					<iframe width="100%" height="200" src={`https://www.youtube.com/embed/${restaurant[0]?.videoId}`}
							title="Cute Cat Dancing - Speed Up" frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen></iframe>

					<span onClick={e => handleCloseModal(e)} className="close-btn"><FontAwesomeIcon icon={faXmark}/></span>
				</Box>
			</div>
		) : (
			<div className={'map--restaurant-details placeholder'}>
			<Box>
				<div className="header">
					<div className='header__img_placeholder'></div>

					<div className="header__content">
						<div className="header__content__name">
							<span className="header__content__name--title"></span>
							<span className="header__content__name--reviews"></span>
						</div>

						<div className="header__content__opinions">
							<span></span>
						</div>
					</div>
				</div>

				<div className="restaurant-info">
					<div className="restaurant-info__delivery">
						<span></span>
					</div>

					<div className="restaurant-info__phone">
						<span></span>
					</div>

					<div className="restaurant-info__website">
						<span></span>
					</div>

					<div className="restaurant-info__address">
						<span></span>
					</div>

				</div>

				<div className="creator-rating">
					<div></div>
				</div>

				<div className="video_placeholder"></div>

				<span onClick={e => handleCloseModal(e)} className="close-btn"><FontAwesomeIcon icon={faXmark}/></span>
			</Box>
		</div>
		)}
		</>
	);
}

export default MapObjectDetails;
