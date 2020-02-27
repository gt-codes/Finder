import React, {useState} from 'react';
import './styles/AddFriendFragment.css';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import {addFriendMutation, getFriendsQuery} from '../queries';

const AddFriendFragment = (props) => {
    const [name,setName] = useState('');
    const [location,setLocation] = useState('');
    const [notes,setNotes] = useState('');
    
    const closeFragment = () => {
        setName('');setLocation('');setNotes('');
        props.close(false);
    } 
    const addFriend = () => {
        props.addFriendMutation({
            variables: {
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
    return (
        <div className={props.show ? 'aff-wrapper show' : 'aff-wrapper'}>
            <div className='aff-tr'>
                <input 
                    placeholder='Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    placeholder='Location'
                    value={location}
                    onChange={e => setLocation(e.target.value)}                    
                />
            </div>
            <div className='aff-br'>
                <h3>Notes</h3>
                <textarea 
                    placeholder="Where'd you meet this person?"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                ></textarea>
            </div>
            <div className='aff-footer'>
                <div onClick={closeFragment}>Cancel</div>
                <div onClick={addFriend}>Confirm</div>
            </div>
        </div>
    );
}

export default compose(
    graphql(addFriendMutation,{name:"addFriendMutation"})
)(AddFriendFragment);