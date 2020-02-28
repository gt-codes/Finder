import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import CTA from './components/CTA';
import FriendsList from './components/FriendsList';
import AddFriendFragment from './components/AddFriendFragment';
import DetailsFragment from './components/DetailsFragment';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
})

const App = () => {
  const [addFriend,setAddFriend] = useState(false);
  const [viewFriend,setViewFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState('n');

  return (
    <ApolloProvider client={client}>
      <div className='wrapper'>
        <Header />
        <FriendsList openFriend={setViewFriend} chooseFriend={setSelectedFriend}/>
        <CTA onClick={setAddFriend}/>
        <AddFriendFragment show={addFriend} close={setAddFriend}/>
        <DetailsFragment show={viewFriend} chosenFriend={selectedFriend} close={setViewFriend}/>
        <div className={viewFriend || addFriend ? 'overlay show' : 'overlay'}
          onClick={() => {
            addFriend ? setAddFriend(false) : setViewFriend(false);
          }}
        ></div>
      </div>
    </ApolloProvider>
  );
}

export default App;
