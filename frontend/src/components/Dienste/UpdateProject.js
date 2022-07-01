import React, {Component} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Error from '../Zwischenelemente/Error';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import SystemAPI from '../../api/SystemAPI';
import ProjektBO from '../../api/ProjektBO';

/** 
 *@fileOverview Das ist der Dialog-Pup-Up, der beim Erstellen eines neuen Projekts angezeigt wird.
 *@author 
*/

export class UpdateProject extends Component {

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
            open: true,
        }
    }
     componentDidMount() {
        SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result)=>{
            console.log(result)
            this.setState({
                creator: result.name + " " + result.surname,
                creatorid : result.id
            })
    })
     }


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

// schreibt die Projektdaten in die Datenbank
        // Doesn't Work yet omg
        
    addProject = () => {
        let newProject = new ProjektBO(this.state.name, this.state.creatorid, this.state.client, this.state.description, this.state.set_deadline, this.state.project_duration, this.state.activities, this.state.creatorid);
        SystemAPI.getAPI().addProject(newProject).then(response => {
            console.log(response)
        })
    }



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
                        label="Projektdauer in Personentagen"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={project_duration} 
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Abbrechen</Button>
                    <Button onClick={this.addProject}>Speichern</Button>
                </DialogActions>
            </div>
        )
    }
}

export default UpdateProject;