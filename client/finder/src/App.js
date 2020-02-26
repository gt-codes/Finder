import React from 'react';
import logo from './logo.svg';
import './App.css';
const firebase = require('../src/firebaseConfig');
var db = firebase.firestore();


const App = () => {
  const addFriend = async(name,location,notes) => {  
    await db.collection("Users").add({ 
        name, 
        location, 
        notes,
        timestamp: Date.now()
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => addFriend('Jacob','New York, NY','Testing')}>Add Document to Firebase</button>
      </header>
    </div>
  );
}

export default App;
