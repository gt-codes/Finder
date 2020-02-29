import React, {useState, useEffect} from 'react';
import './styles/SearchBar.css';
import Dropdown from './Dropdown';

const SearchBar = (props) => {
    const [filter,setFilter] = useState('city');
    const [query,setQuery] = useState('');
    const placeholder = `Search by ${filter}`

    useEffect(() => {
        props.updateFilter(filter);
    },[filter,props]);

    return (
        <div className='sb-wrapper'>
            <div className='sb-container'>
                <div className='sb-s'>
                    <i className="material-icons" onClick={() => props.updateQuery(query)}>search</i>                  
                    <input
                        value={query} 
                        onKeyPress={e => e.key === 'Enter' ? props.updateQuery(query) : null}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={placeholder}
                    />
                </div>
                <div className='sb-f'>
                    <Dropdown updateFilter={setFilter} currFilter={filter.charAt(0).toUpperCase() + filter.slice(1)}/>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;