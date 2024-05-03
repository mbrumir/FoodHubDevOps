import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './FooterMobileModal.css';


function handleModals (e: React.MouseEvent<HTMLElement, MouseEvent>) {
	const target = e.target as HTMLElement;
	const modalToShow = target.classList.value;
	
	const body = document.querySelector('body') as HTMLElement;
	const footer = document.querySelector('footer') as HTMLElement;
	const modal = document.querySelector(`div.${modalToShow}`) as HTMLElement;
	const footer_modal = document.querySelector(`div.show-footer-modal`) as HTMLElement;

	modal.style.display='block';
	footer_modal.style.display='none';
	setTimeout(() => {
		body.classList.add(`${modalToShow}`);
		body.classList.remove(`show-footer-modal`);
		footer.classList.add('hide');
	}, 1)
}

function closeModal () {
    const body = document.querySelector('body') as HTMLElement;
	const modal = document.querySelector('div.footer-mobile-modal') as HTMLElement;
    const footer = document.querySelector('.footer') as HTMLElement;
    
    body.classList.remove('show-footer-modal');
    footer.classList.remove('hide');
	setTimeout(() => {
        modal.style.display="none";
	}, 300)
}

function FooterMobileModal() {
    return (
        <div className="footer-mobile-modal show-footer-modal" style={{zIndex:10}}>
            <div className="footer-mobile-modal__content">
                <ul>
					<li onClick={e => handleModals(e)} className='show-info-modal'>O projekcie</li>
					<li onClick={e => handleModals(e)} className='show-bug-form'>Zgłoś błąd</li>
					<li onClick={e => handleModals(e)} className='show-contact-form'>Kontakt</li>
                    <a target='_blank' rel="noreferrer" href="https://www.buymeacoffee.com/foodhubapp">Wesprzyj nas!</a>
				</ul>
            </div>
            <span onClick={closeModal} className="close_btn"><FontAwesomeIcon icon={faXmark}/></span>
            <div className="footer-mobile-modal__background"></div>
        </div>
    )
}

export default FooterMobileModal;