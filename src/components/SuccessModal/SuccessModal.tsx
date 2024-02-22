import React from 'react';
import './SuccessModal.css';

function SuccessModal() {
	return (
    <>
        <div className="success_modal show-success-modal" style={{ zIndex: 100}}>
            <span>Wiadomość została wysłana!</span>
        </div>
    </>
	);
}

export default SuccessModal;