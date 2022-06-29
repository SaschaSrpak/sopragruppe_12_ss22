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


/**
 *@fileOverview 
 *@author Luca Trautmann
*/

export class App extends Component {

  constructor(props) {
    //Konstruiert alle für Funktionen benötigten Variablen
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

  //Sorgt bei Knopfdruck für einloggen des Nutzers
  handleSignInButtonClicked = () => {
    console.log("login gedrückt")
    const auth = getAuth();
    auth.languageCode = 'en';
    const provider = new GoogleAuthProvider();

   
    //Login erfolgt durch ein Google-Auth Popup
    signInWithPopup(auth, provider)
      .then((result) => {
        // Teilt einen Google Access Token dem Nutzer zu.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // Speichert die Userinfo des Users.
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
      //Ruft den Token und User auf
      user.getIdToken().then(token => {
        document.cookie = `token=${token};path=/`;
        SystemAPI.getAPI().getPersonByFirebaseID(user.uid).then(person => {

          let open = false
          console.log(person)
          //Prüft ob User Neu angelegt ist und offnet bei ===Vorname das Profilregistrierungs-Popup
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
      // User hat sich ausgeloggt also wir der Token gelöscht
      document.cookie = 'token=;path=/';

      // User-Status auf null setzen nach Logout
      this.setState({
        currentUser: null,
        authLoading: true
      });
    }
  }


  checkNewUser = () => {
    //Prüft ob User Neu angelegt ist und offnet bei ===Vorname das Profilregistrierungs-Popup
    if (this.state.person.name === "Vorname") {
      console.log("checkuser")
      this.setState({
        open: true
      })
    }
  }



  render() {
    const { currentUser, authError, appError, open, person } = this.state;


    //Prüft ob ein user eingeloggt ist und wenn nicht wird er zur Login-Page navigiert
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
              {/* Prüft nach neuer Person und übergibt Parameter an ProfilRegistrierung */}
              {person ? <ProfilRegistrierung user={currentUser} open={open} handleClose={() => this.setState({ open: false })} /> : null}
              <Routes>
                <Route path='/static/reactclient' element={
                  <Navigate replace to={'/home'} />
                }></Route>
                <Route path={'/home'} element={<Home />} />
                <Route path={'/buchungen'} element={<Buchungen user={currentUser}/>} />
                <Route path={'/auslese'} element={<Auslese />} />
                <Route path={'/projektanzeige'} element={<Projektanzeige />} />
                <Route path={'/projektewahl'} element={<Projektwahl />} />
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
