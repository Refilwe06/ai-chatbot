import React from 'react';
import Icon from './Icon';
import getIconPath from '../utilities/getIcons';

const MenuItem = ({ icon, label, route, viewBox, fill, strokeWidth, classes }) => {
    return (
        <div className={'menu-item pointer' + classes}>
            <Icon path={getIconPath(icon)} width={20} height={20} viewBox={viewBox} fill={fill} strokeWidth={strokeWidth} />
            <span>{label}</span>
        </div>
    )
}

export default MenuItem;