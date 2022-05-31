import React, { Component } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Card, Typography } from '@mui/material';
import firebaseConfig from './firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './components/layout/Header';



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
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <Card>
            <Typography variant="h1">
              Hello World
            </Typography>
          </Card>
        </header>
      </div>
    )
  };
}

export default App;
