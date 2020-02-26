const fire = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyDB9a3CMqNicfu1Y0PfrOZ4Z1-fmYM_pT0",
    authDomain: "finder-gt.firebaseapp.com",
    databaseURL: "https://finder-gt.firebaseio.com",
    projectId: "finder-gt",
    storageBucket: "finder-gt.appspot.com",
    messagingSenderId: "608533682468",
    appId: "1:608533682468:web:9a8cc89ae8dd28b3b17bb1",
    measurementId: "G-STZJ1Z2CKC"
  };

  const firebase = fire.initializeApp(firebaseConfig);
  module.exports = firebase;