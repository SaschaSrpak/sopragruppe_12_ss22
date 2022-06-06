import React, { Component } from "react";
import { Typography, Grid, Button } from "@material-ui/core";

import Box from '@mui/material/Box';

/*
 *@fileOverview 
 *@author Luca Trautmann
*/



class Login extends Component {

	constructor (props){
		super(props)
	}


	/*
	Rendert Login Page
	*/
	render() {

		return (
			<div>
				<p> wir sind bei login</p>
				<Box sx={{ textAlign: 'center', fontSize: 'h3.fontSize', fontWeight: 'bold', marginBottom: '5rem', marginTop: 'rem' }}>Zeitmanagement App</Box>
				<Button variant='contained' color='primary' onClick={this.props.google}>
					Einloggen mit Google
				</Button>

			</div>
		);
	}
}

export default Login;