import React, { Component } from "react";
import { Typography, Grid, Button} from "@material-ui/core";



class SignIn extends Component {
    
    
    render() {
        return (
			<div>
				<p align='center'> Welcome to the HdM React/Python Project Showcase</p>
				<p align='center'>It appears, that you are not signed in.</p>
				<p align='center'>To use the services of the HdM Bank please</p>
				<Grid container justify='center'>
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
export default SignIn;