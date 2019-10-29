import React from "react";

import './Box.css'

export const  Box  = (props) => {
    return (
        <div >
            <div className='boxContainer'>&nbsp;{props.locker && props.locker.cost? props.locker.cost: ' '}</div>
        </div>
    );
}

