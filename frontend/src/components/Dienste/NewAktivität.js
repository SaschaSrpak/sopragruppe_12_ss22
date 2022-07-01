import React, {Component} from 'react';
import Error from '../Zwischenelemente/Error';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import SystemAPI from '../../api/SystemAPI';
import AktivitaetBO from '../../api/AktivitätBO';


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
            projectChoice: this.props.projectChoice,
        }
    }

// Soll den Dialog schließen mit Abbrechen button why is this not working?
    handleCloseClick = () => {
        this.setState({
            openNewActivity: false
        })
    }

// Erlaubt das befüllen der Textfelder
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

// Erstellt die neue Aktivität und schließt das Dialogfenster
    addActivity = () => {
        let newActivity = new AktivitaetBO(this.state.activity_name, this.state.man_day_capacity, this.state.persons_responsible);
        SystemAPI.getAPI().addActivity(newActivity).then(response => {
            SystemAPI.getAPI().addActivityToProject(this.state.projectChoice, response.id)
            console.log(response)
        })
    }


    // addActivity = () => {
    //     let newActivity = new AktivitätBO(this.state.activity_name, this.state.man_day_capacity, this.state.persons_responsible);
    //     SystemAPI.getAPI().addActivityToProject(this.state.projectChoice, newActivity).then(response => {
    //         console.log(response)
    //     })
    // }

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
                    <Button onClick={this.handleCloseClick}>Abbrechen</Button>
                    <Button onClick={this.addActivity}>Speichern</Button>
                </DialogActions>
            </div>
        )
    }
}