import * as React from "react";
import { Component } from "react";
import { Link } from '@material-ui/core';
import { Toolbar } from '@mui/material';

export class About extends Component {



    render (){
      return(
        <div>
          <Toolbar/>
          <p variant='h6'>
            Zeiterfassungsprojekt
          </p>
          <br />
          <p>
            React Frontend written by <Link href='https://www.youtube.com/watch?v=czTksCF6X8Y&t=15s'>Alle</Link>
          </p>
          <p>
            Python Backend written by <Link href='https://www.youtube.com/watch?v=czTksCF6X8Y&t=15s'>Alle</Link>
          </p>
          <br />
          <p variant='body2'>
            © Gruppe 8 2022, all rights reserved.
          </p>
        </div>
      )
    }
    
};
export default About;