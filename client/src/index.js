import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import firebase from "firebase/app";
//Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAtP21Dfn6O424IFIduwYN2Ac4EpWKRtTc",
  authDomain: "feisbuciuc---react.firebaseapp.com",
  projectId: "feisbuciuc---react",
  storageBucket: "feisbuciuc---react.appspot.com",
  messagingSenderId: "428115420554",
  appId: "1:428115420554:web:babaf580f698a7fe7e9473",
  measurementId: "G-8VBNGES9DC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.querySelector("#root"));

//https://colorhunt.co/palette/273741
