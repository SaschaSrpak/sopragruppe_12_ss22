import React, { Component } from "react";
import { Typography, Grid, Button } from "@material-ui/core";

/**
 *@fileOverview Loginseite welche dem Nutzer angezeigt wird wenn dieser nicht eingeloggt ist.
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
					<Typography align='center' variant='h2'>Wilkommen bei der Zeitmanagement App</Typography>
					<br />
					<Typography align='center' variant='h6'>Anscheinend sind Sie noch nicht eingeloggt</Typography>
					<br />
					<Grid container justify='center'>
						<Button variant='contained' color='primary' onClick={this.props.google}>Einloggen mit Google</Button>

					</Grid>
					<br/>
					
				</div>
			);
		}
	}

export default Login;