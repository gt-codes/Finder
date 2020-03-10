import React from 'react';
import './styles/Header.css';

const Header = ({currUser,onClick}) => {
    return (
        <div className='header-container'>
            <h1>Finder</h1>
            <p>{!currUser ? '' : currUser.email}</p>
            <button onClick={onClick}>Logout</button>
        </div>
    );
}

export default Header;