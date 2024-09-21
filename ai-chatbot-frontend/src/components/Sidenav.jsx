import React from 'react';
import Menu from './Menu';
import logo from '../assets/logo.png';
const Sidenav = () => {
    return (
        <>
            <div className="logo">
                <img src={logo} alt="Superpage" />
            </div>
            <Menu />
        </>
    )
}

export default Sidenav;