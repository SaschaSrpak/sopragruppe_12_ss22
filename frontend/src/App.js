import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import { Container, Toolbar } from '@mui/material';
import './App.css';
import firebaseConfig from './components/login/firebaseconfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Header from './components/layout/Header';
import Login from './components/login/Login';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Projektanzeige from './components/pages/Projektanzeige';
import Buchungen from './components/pages/Buchungen';
import Profil from './components/pages/Profil';
import Error from './components/Zwischenelemente/Error';
import { initializeApp } from 'firebase/app';
import Projektwahl from './components/pages/ProjekteWahl';
import Auslese from './components/pages/Auslese';
import { SystemAPI } from "./api";
import ProfilRegistrierung from './components/pages/ProfilRegristrierung';




export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      newUser: false,
      authLoading: true,
      open: false,
      person: null,
    };
  }

  componentDidMount() {
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
        this.setState({ currentUser: user, authLoading: false })
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

  handleAuthStateChange = (user) => {
    if (user) {
      user.getIdToken().then(token => {
        document.cookie = `token=${token};path=/`;
        SystemAPI.getAPI().getPersonByFirebaseID(user.uid).then(person => {

          let open = false
          console.log(person)
          
          if(person.name === "Vorname") {
            console.log("checkuser")
            open = true
          }
          this.setState({
            currentUser: user,
            open: open,
            person: person,
            authError: null,
            authLoading: false
          });
        })
      }).catch(e => {
        this.setState({
          authError: e,
          authLoading: true
        });
      })
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

  checkNewUser = () => {
    if (this.state.person.name === "Vorname") {
      console.log("checkuser")
      this.setState({
        open: true
      })
    }
  }



  render() {
    const { currentUser, authError, appError, open, person } = this.state;



    if (this.state.authLoading === true) {
      return (
        <Login google={this.handleSignInButtonClicked} />
      )
    } else {
      console.log(this.state.currentUser)
      return (

        <div>
          <Toolbar />
          <Router>
            <Container maxWidth='md'>
              <Header user={currentUser} />
              {person ? <ProfilRegistrierung user={currentUser} open={open} handleClose={() => this.setState({ open: false })} /> : null}
              <Routes>
                <Route path='/static/reactclient' element={
                  <Navigate replace to={'/home'} />
                }></Route>
                <Route path={'/home'} element={<Home />} />
                <Route path={'/buchungen'} element={<Buchungen user={currentUser}/>} />
                <Route path={'/auslese'} element={<Auslese />} />
                <Route path={'/projektanzeige'} element={<Projektanzeige user={currentUser}/>} />
                <Route path={'/projektewahl'} element={<Projektwahl user={currentUser} />} />
                <Route path={'/about'} element={<About />} />
                <Route path={'/profil'} element={<Profil />} />
              </Routes>
              <Error error={authError} contextErrorMsg={`Something went wrong during sighn in process.`} onReload={this.handleSignInButtonClicked} />
              <Error error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
            </Container>
          </Router>
        </div >
      );
    };
  }
}


export default App;
