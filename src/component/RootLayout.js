import React from 'react';
import {Outlet} from 'react-router-dom';
import NavBarPanel from './NavBarPanel';

import {Provider} from "react-redux";
import store from "../store/store";
import Footer from './Footer';


const RootLayout = () => {
  return (
    <>
    <Provider store={store}> 

    
        <div><NavBarPanel /></div>
        
        <main>
            <Outlet />
        </main>

    <div style={{marginTop: "50px"}}>
    <Footer />
    </div>
        
    </Provider>
    </>
    
  )
}

export default RootLayout