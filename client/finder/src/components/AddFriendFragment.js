import React, {useState} from 'react';
import './styles/AddFriendFragment.css';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import {addFriendMutation, getFriendsQuery} from '../queries';

const AddFriendFragment = (props) => {
    const {currUser} = props;
    const [name,setName] = useState('');
    const [location,setLocation] = useState('');
    const [notes,setNotes] = useState('');
    
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
                        onChange={e => setLocation(e.target.value)} 
                        required           
                        type='text'        
                    />
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