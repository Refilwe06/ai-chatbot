import React, { useState } from 'react';
import '../styles/drawer.css'; // Import the CSS file for styling
import Icon from './Icon';
import getIconPath from '../utilities/getIcons';
import Sidenav from './Sidenav';

const Drawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Icon path={getIconPath('menu')} height={20} width={20} onClick={() => setIsOpen(!isOpen)} classes='pointer hamburger-icon' />
            <div className={`drawer ${isOpen ? 'open' : ''}`}>
                <div className="sidenav">
                    <Sidenav handleClose={toggleDrawer} />
                </div>
            </div>

            {/* Overlay */}
            {isOpen && <div className="overlay" onClick={toggleDrawer}></div>}
        </div>
    );
};

export default Drawer;
