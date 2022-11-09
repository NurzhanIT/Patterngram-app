import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { createContext } from "react";
import { getAuth } from "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyAJdOo-rLrpiNtcswyP0MeNarg9LEbaR58",
  authDomain: "chat-project-e44f0.firebaseapp.com",
  projectId: "chat-project-e44f0",
  storageBucket: "chat-project-e44f0.appspot.com",
  messagingSenderId: "905383029241",
  appId: "1:905383029241:web:c54fb5e77d807ebbeab528",
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider
    value={{
      auth,
      firebase,
      firestore,
    }}
  >
    <App firestore={firestore} />
  </Context.Provider>
);
