import React, {useState} from 'react';
import { db } from "../../firebase";
import { collection, addDoc } from "@firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './BugForm.css';

function closeForm () {
    const body = document.querySelector('body') as HTMLElement;
	const modal = document.querySelector('div.show-bug-form') as HTMLElement;
    const footer = document.querySelector('.footer') as HTMLElement;
    
    body.classList.remove('show-bug-form');
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
        body.classList.add('show-success-modal')
    }, 1);
    setTimeout(() => {
        body.classList.remove('show-success-modal')
        setTimeout(() => {
            modal.style.display="none";
        }, 300)
    }, 5000);
}


function BugForm() {
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !title || !description) {
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
            const newBugReport = {
                email: email,
                title: title,
                description: description,
            }

            const bugsCollection = collection(db, 'bugs');
            await addDoc(bugsCollection, newBugReport);

            setEmail('');
            setTitle('');
            setDescription('');
            setErrorMessage('');

            showMessageModal(`show-success-modal`);
        } catch (error) {
            console.error('Error adding document: ', error);
            showMessageModal(`show-fail-modal`);
        }
    }

	return (
    <>
        <div className='show-bug-form form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <h2>Natknąłeś się na błąd? <br/>Daj nam znać!</h2>
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
                    <label htmlFor="description">Opis</label>
                    <textarea name='description' id='description' required value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <span onClick={closeForm} className="close_btn"><FontAwesomeIcon icon={faXmark}/></span>
                <button type="submit" className="form_btn">Wyślij</button>
            </form>

            <div className="form-container__background"></div>
        </div>

    </>
	);
}

export default BugForm;