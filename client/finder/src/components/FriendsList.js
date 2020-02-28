import React, {useState,useEffect} from 'react';
import './styles/FriendsList.css';
import { graphql } from 'react-apollo'
import {getFriendsQuery} from '../queries'
import avi from '../resources/defaultAvi.png'
import { DotLoader } from 'react-spinners';
import EmptyState from './EmptyState';

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
    const {friends,loading} = props.data;     
    const [selected, setSelected] = useState('');

    console.log(props);
    
    useEffect(() => {
        props.chooseFriend(selected)
    }, [selected,props])
        
    return !loading ?
        friends.length === 0 ?
        (
            <div style={{width:'100vw',height:'83vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <EmptyState />
                <h1 style={{marginTop:'10px',color:'#525456',fontWeight:500, textAlign:'center',fontSize:24}}>You haven't added anyone yet</h1>
                <h2 style={{marginTop:'10px',color:'#F95738',fontWeight:400, textAlign:'center',fontSize:20}}>Try adding someone!</h2>
            </div>             
        )
        :
        (
            <div className='fl-wrapper'>
                <div className='fl-container'>
                    {
                        friends.map((item,idx) => (
                            <Friend data={item} key={idx} openFriend={props.openFriend} selectFriend={setSelected}/>
                        ))
                    }
                </div>
            </div>
        ) 
    : 
    (
        <div style={{width:'100vw',height:'83vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <DotLoader
                css=""
                size={50}
                color={"#F95738"}
                loading={true}
            />
            <h1 style={{marginTop:'10px',color:'#525456',fontWeight:500}}>Grabbing Friends</h1>
        </div>        
    )
}

export default graphql(getFriendsQuery, {
    options: props => {
        return {
            variables: {
                id: props.currUser
            }
        }
    }
})(FriendsList);