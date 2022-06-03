import React, { Component } from "react";
import { Typography, Grid, Button} from "@material-ui/core";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import firebaseConfig from './firebaseconfig';
import {  Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';

/*
 *@fileOverview 
 *@author Luca Trautmann
*/


class Login extends Component {
    
/*
Rendert Login Page
*/
	render() {

		const uiConfig = {
			// Popup signin flow rather than redirect flow.
			signInFlow: 'popup',
			signInOptions: [
				GoogleAuthProvider.PROVIDER_ID,
			]

			};
			const auth = getAuth();
			auth.languageCode = 'de';
			if(auth.currentUser){
				return <Navigate to="./App"/>
			}

			return (
				<div>
					<p> wir sind bei login</p>				
					<Box sx={{ textAlign: 'center' , fontSize: 'h3.fontSize', fontWeight: 'bold', marginBottom: '5rem', marginTop:'rem'}}>Zeitmanagement App</Box>
					<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
				</div>
			);
	}
}
export default Login;