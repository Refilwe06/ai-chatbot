import React, { useContext, useEffect } from 'react';
import Menu from './Menu';
import logo from '../assets/logo.png';
import { UserContext } from '../context/UserContext';
const Sidenav = () => {
    const { setUser } = useContext(UserContext);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || null;
        setUser(user);
    }, [])
    return (
        <>
            <div className="logo">
                <img src={logo} alt="Superpage" width={'100%'} />
            </div>
            <Menu />
        </>
    )
}

export default Sidenav;