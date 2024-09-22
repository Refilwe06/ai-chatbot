import React, { useState } from 'react'
import avatar from '../assets/avatar.png';
import Icon from './Icon';
import getIconPath from '../utilities/getIcons';



const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <div className='header'>
            {
                isLoggedIn ?
                    <>
                        <b><small>{'Johnson Doe'}</small> </b>
                        <img src={avatar} alt="User" width={35} />
                    </>
                    :
                    <div className='login-btn'>
                        <Icon path={getIconPath('sign_in')} height={20} width={20} />
                        Login
                    </div>
            }
        </div>
    )
}

export default Header