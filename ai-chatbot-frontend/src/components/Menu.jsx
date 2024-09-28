import React, { useContext } from 'react'
import MenuItem from './MenuItem'
import { STATIC_MENU } from '../staticData/sampleData'
import { UserContext } from '../context/UserContext'
const Menu = ({ handleClose }) => {
    const { user } = useContext(UserContext);
    return (
        <>
            {
                user
                    ?
                    STATIC_MENU.map((item, index) => {
                        return (
                            <div onClick={handleClose} key={index}>
                                <MenuItem {...item} classes={item.label === 'AI Chat' ? 'active-link' : ''} />
                            </div>
                        )
                    })
                    :
                    'Login to see menu items'
            }
        </>
    )
}

export default Menu