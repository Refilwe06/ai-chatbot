import React from 'react'
import MenuItem from './MenuItem'
import { STATIC_MENU } from '../staticData/MENU'
const Menu = () => {
    return (
        <>
            {
                STATIC_MENU.map((item, index) => {
                    return (
                        <MenuItem key={index} {...item} classes={index === 0 ? 'active-link' : ''} />
                    )
                })
            }
        </>
    )
}

export default Menu