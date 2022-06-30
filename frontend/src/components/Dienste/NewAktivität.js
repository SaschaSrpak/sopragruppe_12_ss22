import React, {Component} from 'react'
import Error from '../Zwischenelemente/Error'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'


/** 
 *@fileOverview 
 *@author
*/

export class NewAktivität extends Component {
    constructor(props){
        super(props);
        this.state = {
            activity_name: "",
            man_day_capacity: "",
            persons_responsible: [],
            openNewActivity: false,
        }
    }

    handleCloseClick = () => {
        this.setState({
            openNewActivity: false
        })
    }

    render(){

        const {activity_name, man_day_capacity, persons_responsible} = this.state;
        const {openNewActivity} = this.props

        return (
            <div>
                <DialogTitle>Neue Aktivität erstellen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Füllen Sie bitte das folgende Formular aus, um eine neue Aktivität zu erstellen.
                    </DialogContentText>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="activity_name"
                        label="Name der Aktivität"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={activity_name} 
                        onChange={this.handleChange}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="man_day_capacity"
                        label="Kapazität in Personentagen"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={man_day_capacity} 
                        onChange={this.handleChange}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="persons_responsible"
                        label="Zuständige Personen"
                        type="string"
                        fullWidth
                        variant="standard"
                        value={persons_responsible} 
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleCloseClick}>Abbrechen</Button>
                    <Button>Speichern</Button>
                </DialogActions>
            </div>
        )
    }
}