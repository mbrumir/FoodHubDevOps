import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Footer } from 'react-bulma-components';
import './Footer.css';

// function showInfoModal () {
// 	const body = document.querySelector('body') as HTMLElement;
// 	const modal = document.querySelector('div.info_modal') as HTMLElement;

// 	modal.style.display="block";
// 	setTimeout(() => {
// 		body.classList.add('show-info-modal');
// 	}, 1)
// }

// function supportUs () {
// 	const body = document.querySelector('body') as HTMLElement;
// 	const modal = document.querySelector('div.info_modal') as HTMLElement;

// 	modal.style.display="block";
// 	setTimeout(() => {
// 		body.classList.add('support-us');
// 	}, 1)
// }

function handleModals (e: React.MouseEvent<HTMLElement, MouseEvent>) {
	const target = e.target as HTMLElement;
	const modalToShow = target.classList.value;
	
	const body = document.querySelector('body') as HTMLElement;
	const footer = document.querySelector('footer') as HTMLElement;
	const modal = document.querySelector(`div.${modalToShow}`) as HTMLElement;

	modal.style.display='flex';
	setTimeout(() => {
		body.classList.add(`${modalToShow}`);
		footer.classList.add('hide');
	}, 1)
}

function FooterBottom() {
	return (
			<Footer
				textColor={"white"}
				backgroundColor={"black"}
				alignItems={"center"}
			>

			<div className="support">
				<a target='_blank' rel="noreferrer" href="https://www.buymeacoffee.com/foodhubapp">Wesprzyj nas!</a>
			</div>

			<div className="footer-menu">
				<ul>
					<li onClick={e => handleModals(e)} className='show-info-modal'>O projekcie</li>
					<li onClick={e => handleModals(e)} className='show-bug-form'>Zgłoś błąd</li>
					<li onClick={e => handleModals(e)} className='show-contact-form'>Kontakt</li>
				</ul>
			</div>

			<a href="https://devkids.app?source=foodhub" target="_blank" rel="noreferrer" className='logo'>
				<div className='text-container'>
					<p className='devkid' style={{color: "white", fontWeight: 500}}>
							Made by DevKids
					</p>
					<p className='contact' style={{fontWeight: 500}}>
							Współpraca
					</p>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
						style={{height: "20px", fill: "white", marginLeft: "5px"}}>
						<path
								d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25V288H128V251.7c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z"/>
					</svg>
				</div>
			</a>

			<button onClick={e => handleModals(e)} className="show-footer-modal"><FontAwesomeIcon icon={faBars}/></button>

			</Footer>
	);
}

export default FooterBottom;
