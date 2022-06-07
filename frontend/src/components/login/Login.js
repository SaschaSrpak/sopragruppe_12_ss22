import React, { Component } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import { Container } from "@mui/system";

/**
 *@fileOverview 
 *@author Luca Trautmann
*/



class Login extends Component {

	constructor(props) {
		super(props)
	}

	/*
	Rendert Login Page
	*/
	render() {

		return (
			<div>
				<p> wir sind bei login</p>
				<Typography align='center' variant='h6'>Zeitmanagement App</Typography>
				<Grid container justify='center'>
					<Button variant='contained' color='primary' onClick={this.props.google}>
						Einloggen mit Google
					</Button>
				</Grid>
			</div>
		);
	}
}

export default Login;