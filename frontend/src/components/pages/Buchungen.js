import React,{component} from 'react';
import Button from '@mui/material/Button';
import Error from '../Zwischenelemente/Error';
import Loader from '../Zwischenelemente/Loader'
import { touchRippleClasses } from '@mui/material';

/** 
 *@fileOverview 
 *@author Kim Kausler
*/

export class Buchungen extends Component{

    constructor(props){
        super(probs);

        this.state={
            buchungen:[],
            loadingBuchungError: null, 
            loadingLoader: null,    
        };

    }

    newBuchung(){
        API
    }



    render(){
        return(
            <div>
                <h1>Buchungen</h1>
                <Button variant="contained" onClick={(e)=>this.probs.changeState(id)}> Kommen </Button>
                <Button variant="contained" onClick={(e)=>this.probs.changeState(id)}> Gehen </Button>
            </div>
        )

    }

}


export default Buchungen;
