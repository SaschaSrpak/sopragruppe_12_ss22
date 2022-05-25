import React, { Component } from "react";
import { Typography, Grid, Button} from "@material-ui/core";



class SignIn extends Component {
    
/*
Click Event von SignIn Button und ruft die onSignIn Methode auf
*/

    handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}


	render() {
		return (
			<div>
				<Typography sx={{margin: 2}} align='center' variant='h6'>Willkommen zur Zeitmanagement App</Typography>
				<Typography sx={{margin: 2}} align='center'>Du bist nicht eingeloggt</Typography>
				<Typography sx={{margin: 2}} align='center'>To use the services of the HdM Bank please</Typography>
				<Grid container justifyContent='center'>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Sign in with Google
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	}

}

SignIn.propTypes = {
/* 
Handler-Funktion, die aufgerufen wird, wenn der Benutzer sich anmelden möchte.
*/
	onSignIn: PropTypes.func.isRequired,
}

export default SignIn;