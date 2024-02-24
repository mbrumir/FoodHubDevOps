import React, { useState, useEffect } from 'react';
import './PWAModal.css';

const PWAModal: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<any | null>(null);
  const [declinedPWA, setDeclinedPWA] = useState<boolean>(!!localStorage.getItem('declinedPWA'));

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choiceResult = await installPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          console.log('Użytkownik zaakceptował instalację');
        } else {
          console.log('Użytkownik anulował instalację');
        }
      } catch (error) {
        console.error('Błąd podczas próby instalacji:', error);
      }
    }
  };

  const handleDeclineClick = () => {
    setDeclinedPWA(true);
    localStorage.setItem('declinedPWA', 'true');
  };

  return (
    <>
      {!declinedPWA && (
        <div className="pwa_modal" style={{zIndex:100}}>
          <div className="pwa_modal__modal-content">
            <h2>Zainstaluj aplikację</h2>
            <p>Chcesz zainstalować aplikację FoodHub na swoim urządzeniu?</p>
            <div className="pwa_modal__modal-content__buttons">
                <button className="pwa_modal__modal-content__buttons--cancel_btn" onClick={handleDeclineClick}>
                Odrzuć
                </button>
                <button className="pwa_modal__modal-content__buttons--accept_btn" onClick={handleInstallClick}>
                Zainstaluj
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAModal;
