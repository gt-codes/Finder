import React from 'react';
import './styles/FriendsList.css';
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo'

const getFriendsQuery = gql`
    {
        friends {
            name
            city
            state
        }
    }
`

const Friend = ({data}) => {
    return (
        <div className='fn-container'>
            <h3>{data.name}</h3>
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