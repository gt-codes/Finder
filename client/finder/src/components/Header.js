import React from 'react';
import './styles/Header.css';

const Header = (props) => {
    return (
        <div className='header-container'>
            <h1>Finder</h1>
            <button onClick={props.onClick}>Logout</button>
        </div>
    );
}

export default Header;