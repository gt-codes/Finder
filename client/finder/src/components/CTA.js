import React from 'react';
import './styles/CTA.css';

const CTA = (props) => {
    return (
        <div className='cta-container' onClick={() => props.onClick(true)}>
            <i className="material-icons">add</i>
        </div>
    );
}

export default CTA;