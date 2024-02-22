import React, {useState} from 'react';
// import { db } from "../../firebase";
// import { collection, addDoc } from "@firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { functions } from '../../firebase';
import { httpsCallable } from '@firebase/functions';
import './ContactForm.css';

const verifyTurnstileToken = httpsCallable(functions, 'verifyTurnstileToken');

function closeForm () {
    const body = document.querySelector('body') as HTMLElement;
	const modal = document.querySelector('div.show-contact-form') as HTMLElement;
    const footer = document.querySelector('.footer') as HTMLElement;
    
    body.classList.remove('show-contact-form');
    footer.classList.remove('hide');
	setTimeout(() => {
        modal.style.display="none";
	}, 300)
}

function showMessageModal(modal_class: string) {
    const body = document.querySelector('body') as HTMLElement;
    const modal = document.querySelector(`.${modal_class}`) as HTMLElement;

    modal.style.display="block";
    setTimeout(() => {
        body.classList.add(`${modal_class}`)
    }, 1);
    setTimeout(() => {
        body.classList.remove(`${modal_class}`)
        setTimeout(() => {
            modal.style.display="none";
        }, 300)
    }, 5000);
}


function ContactForm() {
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !title || !message) {
            setErrorMessage('Proszę wypełnić wszystkie pola');
            return;
        } else {
            setErrorMessage('');
        }

        if (!validateEmail(email)) {
            setErrorMessage('Proszę podać poprawny adres e-mail');
            return;
        } else {
            setErrorMessage('');
        }

        try {

            // const newContactMessage = {
            //     email: email,
            //     title: title,
            //     message: message,
            // }

            // const bugsCollection = collection(db, 'contact');
            // await addDoc(bugsCollection, newContactMessage);

            // setEmail('');
            // setTitle('');
            // setMessage('');
            // setErrorMessage('');

            verifyTurnstileToken().then((result) => {
                console.log(result);
                showMessageModal(`show-success-modal`);
            });

        } catch (error) {
            console.error('Error adding document: ', error);
            showMessageModal(`show-fail-modal`);
        }
    }

	return (
    <>
        <div className='form-container show-contact-form'>
            <form className='form' onSubmit={handleSubmit} method="POST">
                <h2>Skontaktuj się z nami!</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className='form-email'>
                    <label htmlFor="email">Email</label>
                    <input type='email' name='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='form-title'>
                    <label htmlFor="title">Tytuł</label>
                    <input type='text' name='title' id='title' required value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className='form-description'>
                    <label htmlFor="description">Wiadomość</label>
                    <textarea name='description' id='description' required value={message} onChange={(e) => setMessage(e.target.value)}/>
                </div>
                <span onClick={closeForm} className="close_btn"><FontAwesomeIcon icon={faXmark}/></span>
                <div className="cf-turnstile" data-sitekey="0x4AAAAAAASRXIzn5mKvkH1s"></div>
                <button className="form_btn">Wyślij</button>
            </form>

            <div className="form-container__background"></div>
        </div>
    </>
	);
}

export default ContactForm;