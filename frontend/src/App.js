import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { Card, Typography } from '@mui/material';
import firebaseConfig from './components/login/firebaseconfig';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
import Header from './components/layout/Header';
import { Container } from '@mui/system';
import Login from './components/login/Login';



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

  render() {
    const { currentUser, authError, appError, apiUser, loading} = this.state;

    const auth = getAuth();
    if(auth.currentUser){
        return <Navigate to="/"/>
    }
    return (
      
      <div>
        <p> Wir sind auf der APP</p>
        <Router basename={`${process.env.PUBLIC_URL}`}> {/* fügt automatisch die url vor jedem link ein */}
					<Header currentUser={currentUser} apiUser={apiUser}/>
          {
            currentUser?
              <>
                  <Redirect from='/' to='About' />
									<Route exact path='/About'>
										<About />
									</Route> 
              </>
              :
              <>
                <Redirect from='/' to='About' />
                <Login/>
              </>

          
        }
					
					
				</Router>
      </div>
    
    )
  };
}

export default App;
