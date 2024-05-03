import React, {useEffect, useState} from 'react';
// import { Helmet } from 'react-helmet';
import '../src/components/scss/App.css';
import NavbarTop from "./components/Navbar/Navbar";
import FooterBottom from "./components/Footer/Footer";
import MapComponent from "./components/Map/Map";
import Info from "./components/Info/Info";
import BugForm from "./components/BugForm/BugForm";
import ContactForm from "./components/ContactForm/ContactForm";
import SuccessModal from "./components/SuccessModal/SuccessModal";
import FailModal from "./components/FailModal/FailModal";
import PWAModal from "./components/PWAModal/PWAModal";
import FooterMobileModal from './components/FooterMobileModal/FooterMobileModal';
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
  let isLoading: any, setIsLoading: any;
  [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = () => {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 500);
  //   }
  //
  //   return () => {
  //     unsubscribe();
  //   };
  // });

  return (
      <>
        {isLoading ? (
            <LoadingScreen />
        ) : null}
        <>
          <Info></Info>
          <BugForm></BugForm>
          <ContactForm></ContactForm>
          <SuccessModal></SuccessModal>
          <FailModal></FailModal>
          <PWAModal></PWAModal>
          <NavbarTop />
          <MapComponent handleLoadingChange={setIsLoading}  />
          <FooterMobileModal />
          <FooterBottom />
        </>
      </>
  );
}

export default App;
