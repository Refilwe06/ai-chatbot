import React from 'react';

const Icon = ({ fill = 'none', strokeWidth = 1.5, classes = '', path, width, height, viewBox = '0 0 24 24' }) => {
    return (
        <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox={viewBox} strokeWidth={strokeWidth} stroke="currentColor" className={classes}>
            <path strokeLinecap="round" strokeLinejoin="round" d={path} />
        </svg>
    )
}

export default Icon;