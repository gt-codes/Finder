import React, {useState, useEffect, useRef} from 'react';
import './styles/AddFriendFragment.css';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import {addFriendMutation, getFriendsQuery} from '../queries';
// import apiKey from '../rapidTables';
import groupedCities from '../resources/cities.js'

const AddFriendFragment = (props) => {
    const {currUser} = props;
    const [name,setName] = useState('');
    const [location,setLocation] = useState('');
    const locationInput = useRef(null);
    const [notes,setNotes] = useState('');
    const [filteredCities,setFilteredCities] = useState([]);
    const [openCities,setOpenCities] = useState(true);

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
        let temp = [];
        let cities = []; 

        if(!openCities)
            setOpenCities(true)
        
        setLocation(currVal);

        for (const state in groupedCities) {
            let stateArray = Object.keys(groupedCities[state]).map(key => {
                return [groupedCities[state][key]];
            });        
            temp = [...temp,stateArray.filter(currCity => currCity[0].city.includes(currVal))]
        }   
        temp.forEach(state => {
            let a = []
            state.forEach(item => a = [...a,item[0]])
            cities = [...cities,a];
        })                
        
        setFilteredCities(cities.filter(item => item.length > 0));
        
        // let data = await fetch(`https://wft-geo-db.p.mashape.com/v1/geo/cities?limit=10&offset=0&namePrefix=${currVal}&countryIds=US`, {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': apiKey,
        //     }
        // })
        // let cities = await data.json()
        // setFilteredCities(cities.data)       
    }

    useEffect(() => {
        if(!props.addFriend)
            setName('');setLocation('');setNotes('');
    },[props]);

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
                    <div className='aff-loc'>
                        <input 
                            placeholder='Location'
                            value={location}
                            onChange={updateLocation} 
                            required           
                            type='text'     
                            ref={locationInput}   
                        />
                        <div className={location === '' ? 'filter-menu' : filteredCities.length > 0 && openCities ? 'filter-menu show' : 'filter-menu'}>
                            {
                                filteredCities.map((item,idx) => (
                                    <li key={idx} 
                                        onClick={() => {
                                            setOpenCities(false)
                                            setLocation(`${item[0].city}, ${item[0].state}`)
                                        }}
                                    >{item[0].city}, {item[0].state}</li>
                                ))
                            }
                        </div>
                    </div>
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