import React from 'react';
import './App.css';
import { Columns } from 'react-bulma-components';
import NavbarTop from "./components/Navbar/Navbar";
import FooterBottom from "./components/Footer/Footer";
import MapComponent from "./components/Map/Map";

function App() {
  return (
      <>
        <NavbarTop />
        <div
          style={{
            height: "85vh",
            width: "100vw",
          }}
        >
          <Columns style={{height: "100%", paddingTop: "1rem"}}>
            <MapComponent />
            {/*<Columns.Column size={12} desktop={{size: 8, offset: 0, narrow: false}} style={{height: "100%", padding: 0}}>*/}
            {/*  <MapComponent />*/}
            {/*</Columns.Column>*/}
            {/*<Columns.Column size={12} backgroundColor={"white"} desktop={{size: 4, offset: 0, narrow: false}} style={{height: "100%", padding: 0}}>*/}
            {/*</Columns.Column>*/}
          </Columns>
        </div>
        <FooterBottom />
      </>
  );
}

export default App;
