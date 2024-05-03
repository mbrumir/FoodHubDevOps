import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './Info.css';

function closeInfoModal () {
    const body = document.querySelector('body') as HTMLElement;
	const modal = document.querySelector('div.info_modal') as HTMLElement;
    const footer = document.querySelector('.footer') as HTMLElement;
    
    body.classList.remove('show-info-modal');
    body.classList.remove('support-us');
    footer.classList.remove('hide');
	setTimeout(() => {
        modal.style.display="none";
	}, 300)
}

function Info() {
	return (
    <>
        <div className="info_modal support-us show-info-modal">
            <div className="info_modal__content">
                <section className="info_modal__content--welcome">
                    <h2>O projekcie</h2>
                    <p>Jesteśmy grupą znajomych, którzy wpadli na pomysł stworzenia mapki z miejscami polecanych przez polskich youtuberów. Nasza mapka ma ułatwić Wam poszukiwanie restauracji z pysznym jedzeniem oraz pomóc odkryć ciekawe miejsca na kulinarnej mapię Polski.</p>
                </section>

                <section className="info_modal__content--how-it-works">
                    <h2>Jak to działa?</h2>
                    <p>Sztuczna inteligencja skanuje codziennie kanały gastronomicznych youtuberów. Jeśli pojawi się nowy film, AI szuka restauracji z filmu na Google Maps i dodaje pinezkę na mapie wraz z krótką, zredagowaną przez AI opinią danego youtubera.</p>
                </section>

                <section className="info_modal__content--support">
                    <h2>Wsparcie</h2>
                    <p>Samodzielnie opłacamy serwery, licencje oraz domenę potrzebne do stworzenia tego projektu. Na projekcie nie planujemy zarabiać ani umieszczać reklam, abyście mogli cieszyć się czystą, wolną od reklam stroną. Naszym celem jest rozwinięcie projektu, dodanie wiekszej ilości twórców, stworzenie dedykowanej aplikacji oraz wprowadzenie nowych funkcji, takich jak wyszukiwanie restaruacji w okolicy.</p>
                    <p>Jeśli chcecie wesprzeć naszą pracę i przyczynić się do rozwoju projektu, możecie wesprzeć nas finansowo.<br /> Za każdą złotówkę serdecznie dziękujemy! ❤️</p>
                    <a target="_blank" rel="noreferrer" href='https://www.buymeacoffee.com/foodhubapp'>Buy me a coffee</a>
                </section>
                <span onClick={closeInfoModal} className="close_btn"><FontAwesomeIcon icon={faXmark}/></span>
            </div>

            <div className="info_modal__background"></div>
        </div>
    </>
	);
}

export default Info;