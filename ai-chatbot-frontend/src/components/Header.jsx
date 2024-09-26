import React, { useContext } from 'react'
import avatar from '../assets/avatar.png';
import Icon from './Icon';
import getIconPath from '../utilities/getIcons';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    }
    return (
        <div className='header'>
            {
                user ?
                    <>
                        <b><small>{`${user.first_name} ${user.last_name}`}</small> </b>
                        <img src={avatar} alt="User" width={35} />
                        <Icon path={getIconPath('sign_out')} height={20} width={20} onClick={() => logout()} classes='pointer' />

                    </>
                    :
                    <div className='login-btn' onClick={() => navigate('/login')}>
                        <Icon path={getIconPath('sign_in')} height={20} width={20} onClick={() => { }} />
                        Login
                    </div>
            }
        </div>
    )
}

export default Header