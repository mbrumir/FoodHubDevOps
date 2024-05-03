import React from 'react';
import './FailModal.css';

function FailModal() {
	return (
    <>
        <div className="fail_modal show-fail-modal" style={{ zIndex: 100}}>
            <span>Wystąpił błąd podczas wysyłania wiadomości</span>
        </div>
    </>
	);
}

export default FailModal;