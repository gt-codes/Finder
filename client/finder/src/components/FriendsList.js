import React, {useState,useEffect} from 'react';
import './styles/FriendsList.css';
import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright';
import {getFriendsQuery, queryFriendsByCity, queryFriendsByState} from '../queries'
import avi from '../resources/images/defaultAvi.png'
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
const Spinner = () => {
    return (
        <div style={{width:'100vw',height:'60vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
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

const FriendsList = (props) => {
    const {friends,loading} = props.getFriendsQuery;     
    const [selected, setSelected] = useState('');
    
    useEffect(() => {
        props.chooseFriend(selected)
    }, [selected,props])
    
    if(props.query !== '') {
        if(props.filter === 'city') {
            const {friendsByCity,loading} = props.queryFriendsByCity;     
            if(!loading) {
                return friendsByCity.length === 0 ?
                (
                    <div style={{width:'100vw',height:'60vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <EmptyState />
                        <h1 style={{marginTop:'10px',color:'#525456',fontWeight:500, textAlign:'center',fontSize:24}}>You haven't met anyone from {props.query}</h1>
                    </div>             
                )
                :
                (
                    <div className='fl-wrapper'>
                        <div className='fl-container'>
                            {
                                friendsByCity.map((item,idx) => (
                                    <Friend data={item} key={idx} openFriend={props.openFriend} selectFriend={setSelected}/>
                                ))
                            }
                        </div>
                    </div>
                )         
            }
            else return <Spinner />
        } else {
            const {friendsByState,loading} = props.queryFriendsByState;     
            if(!loading) {
                return friendsByState.length === 0 ?
                (
                    <div style={{width:'100vw',height:'60vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <EmptyState />
                        <h1 style={{marginTop:'10px',color:'#525456',fontWeight:500, textAlign:'center',fontSize:24}}>You haven't met anyone from {props.query}</h1>
                    </div>             
                )
                :
                (
                    <div className='fl-wrapper'>
                        <div className='fl-container'>
                            {
                                friendsByState.map((item,idx) => (
                                    <Friend data={item} key={idx} openFriend={props.openFriend} selectFriend={setSelected}/>
                                ))
                            }
                        </div>
                    </div>
                )         
            }
            else return <Spinner />
        }
    }
    if(!loading) {
        return friends.length === 0 ?
        (
            <div style={{width:'100vw',height:'60vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
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
    }
    return <Spinner />
}

export default compose(
    graphql(getFriendsQuery, {
        name: "getFriendsQuery",
        options: props => {
            return {
                variables: {
                    id: props.currUser
                }
            }
        }
    }),
    graphql(queryFriendsByCity, {
        name: "queryFriendsByCity",
        options: props => {
            return {
                variables: {
                    city: props.query
                }
            }
        }
    }),    
    graphql(queryFriendsByState, {
        name: "queryFriendsByState",
        options: props => {
            return {
                variables: {
                    state: props.query
                }
            }
        }
    }), 
)(FriendsList);