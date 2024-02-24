import React from 'react';
// import { Helmet } from 'react-helmet';
import '../src/components/scss/App.css';
import { Columns } from 'react-bulma-components';
import NavbarTop from "./components/Navbar/Navbar";
import FooterBottom from "./components/Footer/Footer";
import MapComponent from "./components/Map/Map";
import Info from "./components/Info/Info";
import BugForm from "./components/BugForm/BugForm"; 
import ContactForm from "./components/ContactForm/ContactForm"; 
import SuccessModal from "./components/SuccessModal/SuccessModal"; 
import FailModal from "./components/FailModal/FailModal"; 
import PWAModal from "./components/PWAModal/PWAModal"; 

function App() {
  return (
      <>
        <Info></Info>
        <BugForm></BugForm>
        <ContactForm></ContactForm>
        <SuccessModal></SuccessModal>
        <FailModal></FailModal>
        <PWAModal></PWAModal>
        <NavbarTop />
        <div className={'map-container'}>
          <Columns style={{height: "100%"}}>
            <MapComponent />
            {/*<Columns.Column size={12} desktop={{size: 8, offset: 0, narrow: false}} style={{height: "100%", padding: 0}}>*/}
            {/*  <MapComponent />*/}
            {/*</Columns.Column>*/}
            {/*<Columns.Column size={12} backgroundColor={"white"} desktop={{size: 4, offset: 0, narrow: false}} style={{height: "100%", padding: 0}}>*/}
            {/*</Columns.Column>*/}
          </Columns>
        </div>
        <FooterBottom />
        {/* <Helmet><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script></Helmet> */}
      </>
  );
}

export default App;
