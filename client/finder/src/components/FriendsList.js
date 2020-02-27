import React from 'react';
import './styles/FriendsList.css';
import { graphql } from 'react-apollo'
import {getFriendsQuery} from '../queries'

const Friend = (props) => {
    const {data} = props;
    return (
        <div className='fn-container' onClick={() => props.openFriend(true)}>
            <img src={'https://i.pravatar.cc/75'} alt='avatar'/>
            <div className='fn-md'>
                <div className='fn-md-tr'>
                    <h3>{data.name}</h3>
                    <h4>{data.city}, {data.state}</h4>
                </div>
                <p>{data.notes}</p>
            </div>
        </div>
    );
}

const FriendsList = (props) => {
    const {friends} = props.data;
    console.log(friends);
    
    return (
        <div className='fl-wrapper'>
            <div className='fl-container'>
                
                {
                    friends ?
                        friends.map((item,idx) => (
                            <Friend data={item} key={idx} openFriend={props.openFriend}/>
                        ))
                    :
                    <div>
                        <h1 style={{textAlign:'center'}}>Loading Your Friends</h1>
                    </div>
                }
            </div>
        </div>
    );
}

export default graphql(getFriendsQuery)(FriendsList);