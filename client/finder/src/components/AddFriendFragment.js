import React, {useState, useRef} from 'react';
import './styles/AddFriendFragment.css';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import {addFriendMutation, getFriendsQuery} from '../queries';
import {LongMenu} from './Dropdown';
import apiKey from '../rapidTables'

const AddFriendFragment = (props) => {
    const {currUser} = props;
    const [name,setName] = useState('');
    const [location,setLocation] = useState('');
    const locationInput = useRef(null);
    const [notes,setNotes] = useState('');
    const [filteredCities,setFilteredCities] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const closeFragment = () => {
        setName('');setLocation('');setNotes('');
        props.close(false);
    } 
    const addFriend = () => {
        if(name==='' || location==='' || notes==='')
            return;
        props.addFriendMutation({
            variables: {
                uid:currUser,
                name,
                city:location.split(', ')[0],
                state:location.split(', ')[1],
                notes
            },
            refetchQueries: [
                {query: getFriendsQuery}
            ]
        })
        setName('');setLocation('');setNotes('');
        props.close(false);
    }    

    const updateLocation = async(e) => {
        let currVal = e.target.value;
        setLocation(e.target.value);

        let data = await fetch(`https://wft-geo-db.p.mashape.com/v1/geo/cities?limit=10&offset=0&namePrefix=${currVal}&countryIds=US`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
            }
        })
        let cities = await data.json()
        setFilteredCities(cities)        
        setAnchorEl(locationInput.current)

    }
    return (
        <div className={props.show ? 'aff-wrapper show' : 'aff-wrapper'}>
            <form>
                <div className='aff-tr'>
                    <input 
                        placeholder='Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        type='text'
                    />
                    <input 
                        placeholder='Location'
                        value={location}
                        onChange={updateLocation} 
                        required           
                        type='text'     
                        ref={locationInput}   
                        // onFocus={() => setAnchorEl(locationInput.current)}
                    />
                    <LongMenu data={filteredCities} anchor={anchorEl} setAnchor={setAnchorEl}/>
                </div>
                <div className='aff-br'>
                    <h3>Notes</h3>
                    <textarea 
                        placeholder="Where'd you meet this person?"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className='aff-footer'>
                    <div onClick={closeFragment}>Cancel</div>
                    <button type='submit' onClick={addFriend}>Confirm</button>
                </div>
            </form>
        </div>
    );
}

export default compose(
    graphql(addFriendMutation,{name:"addFriendMutation"})
)(AddFriendFragment);