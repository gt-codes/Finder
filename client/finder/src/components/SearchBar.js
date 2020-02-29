import React, {useState} from 'react';
import './styles/SearchBar.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dropdown from './Dropdown';

const SearchBar = (props) => {
    const [filter,setFilter] = useState('city');
    const [anchorEl, setAnchorEl] = useState(null);
    const [query,setQuery] = useState('');
    const placeholder = `Search by ${filter}`

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className='sb-wrapper'>
            <div className='sb-container'>
                <div className='sb-s'>
                    <i className="material-icons" onClick={() => props.updateQuery(query)}>search</i>                  
                    <input
                        value={query} 
                        onChange={e => setQuery(e.target.value)}
                        placeholder={placeholder}
                    />
                </div>
                <div className='sb-f' onClick={handleClick}>
                    <Dropdown updateFilter={setFilter} currFilter={filter.charAt(0).toUpperCase() + filter.slice(1)}/>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;