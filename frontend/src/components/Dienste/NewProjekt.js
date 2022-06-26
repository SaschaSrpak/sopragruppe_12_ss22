import React, {Component} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Error from '../Zwischenelemente/Error';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';

/** 
 *@fileOverview Das ist der Dialog-Pup-Up, der beim Erstellen eines neuen Projekts angezeigt wird.
 *@author 
*/

export class NewProjekt extends Component {

// Constructor
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            creator: "",
            client: "",
            description: "",
            set_deadline: "2022-07-04T12:00",
            project_duration: "",
            activities: [],
            persons_responsible: [],
        }
    }

// beim Betätigen des Buttons Speichern wird das Projekt in die Datenbank geschrieben
    addProjekt = () => {}

// Beim Betätigen des Buttons "Abbrechen" wird das Dialogfenster geschlossen
    handleClose = () => {
        this.setState({
            open: false
        });
    }
    

// Setzt Props auf die State-Variablen für Projektdaten
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

// schreibt die Projektdaten aus den Props in die Datenbank




// rendert das Dialogfenster mit allen relevanten Daten um ein neues Projekt zu erstellen
    render(){

        const { name, creator, client, description, set_deadline, project_duration, activities, persons_responsible } = this.state;

        return(
            <div>
                <DialogTitle>Neues Projekt erstellen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Füllen Sie bitte das folgende Formular aus, um ein neues Projekt zu erstellen.
                    </DialogContentText>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Projektname"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name} 
                        onChange={this.handleChange}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="creator"
                        label="Projektersteller"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={creator} 
                        onChange={this.handleChange}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="client"
                        label="Client"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={client} 
                        onChange={this.handleChange}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Projektbeschreibung"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={description} 
                        onChange={this.handleChange}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="set_deadline"
                        label="Deadline"
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                        value={set_deadline} 
                        onChange={this.handleChange}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="project_duration"
                        label="Projektdauer in Stunden"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={project_duration} 
                        onChange={this.handleChange}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="activities"
                        label="Aktivitäten Innerhalb des Projekts"
                        type="string"
                        fullWidth
                        variant="standard"
                        value={activities} 
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
                    <Button onClick={this.props.handleClose}>Abbrechen</Button>
                    <Button>Speichern</Button>
                </DialogActions>
            </div>
        )
    }
}

export default NewProjekt;