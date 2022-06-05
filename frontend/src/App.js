import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { Card, Typography } from '@mui/material';
import firebaseConfig from './components/login/firebaseconfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Header from './components/layout/Header';
import { Container } from '@mui/system';
import Login from './components/login/Login';
import About from './components/pages/About'



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      loading: [],
      newUser: false,
    };
  }
  handleSignInButtonClicked = () => {
    const provider = new GoogleAuthProvider();

    //funciton aufstellen onlcick
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.setState({ currentUser: user })
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  /* handleAuthStateChanged=(user){
    this.setState
  } */

  render() {
    const { currentUser, authError, appError, apiUser, loading } = this.state;

    const auth = getAuth();
    if (auth.currentUser) {
      return <Navigate to="/" />
    }
    return (

      <div>
        <p> Wir sind auf der APP</p>
        <Router basename={`${process.env.PUBLIC_URL}`}> {/* fügt automatisch die url vor jedem link ein */}>
          <Header currentUser={currentUser}  />
          <Routes>
            <Route path="" element={!currentUser ? <Navigate to="/login" /> : <Navigate to="/about"/>}>
              <Route path='/about' element={<About setLoading={this.setLoading} />} />              
            </Route>
            <Route path='/login' element={<Login setLoading={this.setLoading} google={this.handleSignInButtonClicked}/> } />
          </Routes>
        </Router>
      </div >

    )
  };
}

export default App;