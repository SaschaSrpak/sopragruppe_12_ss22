import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import { Card, Typography } from '@mui/material';
import firebaseConfig from './components/login/firebaseconfig';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
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
                    
            {/**  Container, der die Höhe des Viewports minus margin top und margin bottom hat*/}
            <Container maxWidth='xl' sx={{mt:12, mb:8 }}>
              <Routes>
                
                <Route path="" element={!currentUser?<Navigate to="/login"/>:<Outlet/>}>
                  
								  <Route path='/about' element={<About setLoading={this.setLoading}/>}/>
                </Route>
                
                <Route path='/login' element={<Login setLoading={this.setLoading}/>} />
              
              </Routes>
            </Container>  
				</Router>
      </div>
    
    )
  };
}

export default App;
