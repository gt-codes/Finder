import React, {useState,useEffect} from 'react';
import './styles/FriendsList.css';
import { graphql } from 'react-apollo'
import {getFriendsQuery} from '../queries'
import avi from '../resources/defaultAvi.png'

const Friend = (props) => {
    const {data} = props;
    return (
        <div className='fn-container' 
            onClick={() => {
                props.openFriend(true);
                props.selectFriend(data.graphqlID)
            }}
        >
            <img src={avi} alt='avatar'/>
            <h3>{data.name}</h3>
        </div>
    );
}

const FriendsList = (props) => {
    const {friends} = props.data; 
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        props.chooseFriend(selected)
    }, [selected,props])
    return (
        <div className='fl-wrapper'>
            <div className='fl-container'>
                {
                    friends ?
                        friends.map((item,idx) => (
                            <Friend data={item} key={idx} openFriend={props.openFriend} selectFriend={setSelected}/>
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