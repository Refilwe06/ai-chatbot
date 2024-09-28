import React from 'react';
import Icon from './Icon';
import getIconPath from '../utilities/getIcons';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ icon, label, route, viewBox, fill, strokeWidth, classes }) => {
    const navigate = useNavigate();

    return (
        <div className={'menu-item pointer ' + classes} onClick={() => navigate(route || 'chat-history')}>
            <Icon path={getIconPath(icon)} width={20} height={20} viewBox={viewBox} fill={fill} strokeWidth={strokeWidth} />
            <span>{label}</span>
        </div>
    )
}

export default MenuItem;