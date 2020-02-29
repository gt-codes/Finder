import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import CTA from './components/CTA';
import FriendsList from './components/FriendsList';
import AddFriendFragment from './components/AddFriendFragment';
import DetailsFragment from './components/DetailsFragment';
import SearchBar from './components/SearchBar';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {StyledFirebaseAuth} from 'react-firebaseui';
const firebase = require('./firebaseConfig');

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
})

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [currUser,setCurrUser] = useState(null);
  const [addFriend,setAddFriend] = useState(false);
  const [viewFriend,setViewFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState('n');
  const [searchQuery,setSearchQuery] = useState('');
  const [filter,setFilter] = useState('city');

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [ "google.com" ],
    callbacks: { signedInSuccess: () => false }
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setSignedIn(!!user)
      setCurrUser(user)
    })
  },[]);

  return !signedIn ?
    (
      <StyledFirebaseAuth 
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    )
  :
    (
      <ApolloProvider client={client}>
        <div className='wrapper'>
          <Header onClick={() => firebase.auth().signOut()}/>
          <SearchBar updateQuery={setSearchQuery} updateFilter={setFilter}/>
          <FriendsList 
            query={searchQuery} 
            filter={filter}
            currUser={currUser ? currUser.uid : 'n'} 
            openFriend={setViewFriend} 
            chooseFriend={setSelectedFriend}
          />
          <CTA onClick={setAddFriend}/>
          <AddFriendFragment currUser={currUser ? currUser.uid : 'n'} show={addFriend} close={setAddFriend}/>
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
