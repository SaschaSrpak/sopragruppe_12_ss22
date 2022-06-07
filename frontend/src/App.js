import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Navigation, NavigationType } from 'react-router-dom';
import './App.css';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebaseConfig from './components/login/firebaseconfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Header from './components/layout/Header';
import Login from './components/login/Login';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Projektanzeige from './components/pages/Projektanzeige';
import Buchungen from './components/pages/Buchungen';
import Error from './components/Zwischenelemente/Error';
import {initializeApp} from 'firebase/app'




export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      newUser: false,
      authLoading: true,
    };
  }

  componentDidMount(){
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    onAuthStateChanged(auth, this.handleAuthStateChange)
  }

  handleSignInButtonClicked = () => {
    const auth = getAuth();
    auth.languageCode = 'en';
    const provider = new GoogleAuthProvider();

    //funciton aufstellen onlcick
    
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.setState({ currentUser: user , authLoading: false})
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

  handleAuthStateChange = user => {
    if (user) {
    
      user.getIdToken().then(token => {
        document.cookie = `token=${token};path=/`;

        this.setState({
          currentUser: user,
          authError: null,
          authLoading: false
        });
      }).catch(e => {
        this.setState({
          authError: e,
          authLoading: true
        });
      });
    } else {
      // User has logged out, so clear the id token
      document.cookie = 'token=;path=/';

      // Set the logged out user to null
      this.setState({
        currentUser: null,
        authLoading: true
      });
    }
  }

  render() {
    const { currentUser, authError, appError, loading } = this.state;

    

    if (this.state.authLoading === true) {
      return (
        <Login google={this.handleSignInButtonClicked} />
      )
    } else {
console.log(this.state.currentUser)
      return (
        <div>
          <Router>
            <Header user={currentUser} />
            <Routes>
              <Route path='/static/reactclient' element={
                <Navigate replace to={'/home'} />
              }></Route>
              <Route path={'/home'} element={<Home />} />
              <Route path={'/buchungen'} element={<Buchungen />} />
              <Route path={'/projektanzeige'} element={<Projektanzeige />} />
              <Route path={'/about'} element={<About />} />

            </Routes>

            <Error error={authError} contextErrorMsg={`Something went wrong during sighn in process.`} onReload={this.handleSignInButtonClicked} />
            <Error error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
          </Router>
        </div >


      );

    };
  }
}

export default App;


/* {
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

      <Login google={this.handleSignInButtonClicked} />
    </>
} */