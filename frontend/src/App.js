import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Card, Typography } from '@mui/material';
import firebaseConfig from './components/login/firebaseconfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Header from './components/layout/Header';
import { Container } from '@mui/system';
import Login from './components/login/Login';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Projektanzeige from './components/pages/Projektanzeige';
import ContextErrorMessage from './components/Zwischenelemente/Error';



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
        <Router basename={process.env.PUBLIC_URL}>
          <Container maxWidth='md'>
            <Header user={currentUser} />
            {
              // Is a user signed in?
              currentUser ?
                <>
                  <Navigate from='/' to='home' />
                  <Route exact path='/home'>
                    <Home />
                  </Route>
                  <Route path='/projekte'>
                    <Projektanzeige />
                  </Route>
                  <Route path='/about' component={About} />
                </>
                :
                // else show the sign in page
                <>
                  <Navigate to="login" />
                  <Login google={this.handleSignInButtonClicked} />
                </>
            }
            {/* <ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sighn in process.`} onReload={this.handleSignInButtonClicked} />
            <ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} /> */}
          </Container>
        </Router>
      </div>
    );

  };
}

export default App;