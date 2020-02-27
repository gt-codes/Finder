import React from 'react';
import './styles/FriendsList.css';
import { graphql } from 'react-apollo'
import {getFriendsQuery} from '../queries'

const Friend = ({data}) => {
    return (
        <div className='fn-container'>
            <img src={'https://i.pravatar.cc/50'} alt='avatar'/>
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
                            <Friend data={item} key={idx}/>
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