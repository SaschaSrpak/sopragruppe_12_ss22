import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import { Container, Toolbar } from '@mui/material';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './components/login/firebaseconfig';
import Header from './components/layout/Header';
import Login from './components/login/Login';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Projektanzeige from './components/pages/Projektanzeige';
import Buchungen from './components/pages/Buchungen';
import Profil from './components/pages/Profil';
import Error from './components/Zwischenelemente/Error';
import Projektwahl from './components/pages/ProjekteWahl';
import Auslese from './components/pages/Auslese';
import SystemAPI from './api/SystemAPI'




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


  static getDerivedStateFromError(error) {
    return { appError: error };
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

  handleSignIn = () => {
    this.setState({
      authLoading: true
    });
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider);
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }




  render() {
    const { currentUser, authError, appError } = this.state;



    if (this.state.authLoading === true) {
      return (
        <Login google={this.handleSignIn} />
      )
    } else {
      console.log(this.state.currentUser)
      //console.log(SystemAPI.getApi().getPerson(10004))
      return (

        <div>
          <Toolbar />
          <Router>
            <Container maxWidth='md'>
              <Header user={currentUser} />
              <Routes>
                <Route path='/static/reactclient' element={
                  <Navigate replace to={'/home'} />
                }></Route>
                <Route path={'/home'} element={<Home />} />
                <Route path={'/buchungen'} element={<Buchungen />} />
                <Route path={'/auslese'} element={<Auslese />} />
                <Route path={'/projektanzeige'} element={<Projektanzeige />} />
                <Route path={'/projektewahl'} element={<Projektwahl />} />
                <Route path={'/about'} element={<About />} />
                <Route path={'/profil'} element={<Profil />} />
              </Routes>
              <Error error={authError} contextErrorMsg={`Something went wrong during sighn in process.`} onReload={this.handleSignIn} />
              <Error error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
            </Container>
          </Router>
        </div >
      );
    }
  }
}


export default App;
