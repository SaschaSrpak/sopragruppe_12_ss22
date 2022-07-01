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
            set_deadline: "",
            project_duration: "",
            activities: [],
            persons_responsible: [],
            open: true,
        }
    }
     componentDidMount() {
        SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result)=>{
            this.setState({
                creator: result.name + " " + result.surname,
                creatorid : result.id
            })
        SystemAPI.getAPI().getProject(this.props.projectdata).then((result) => {
            this.setState({
                client: result.client,
                name: result.name,
                description: result.description,
                deadlineid: result.deadline,
                project_durationid: result.project_duration,
                creator: result.creator


            })
            SystemAPI.getAPI().getProjectDeadline(result.set_deadline).then((result) => {
                this.setState({
                    deadline: result.time_of_event
                })

            })
            SystemAPI.getAPI().getProjectDuration(result.project_duration).then((result) => {
                this.setState({
                    project_duration: result.duration
                })


            })
            console.log(result)
            console.log(result.creator)
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
        
    updateProject = () => {

        let newProject = new ProjektBO(this.state.name, this.state.creatorid, this.state.client, this.state.description, this.state.deadlineid, this.state.project_durationid, this.state.deadlineid);
        newProject.setName(this.state.name);
        newProject.setCreator(this.state.name);
        newProject.setClient(this.state.name);
        newProject.setDescription(this.state.name);
        newProject.setProject_Duration(this.state.name);
        newProject.setPersons_Responsible(this.state.name);
        newProject.setId(this.state.name);
        newProject.setLast(this.state.name);


        console.log(newProject)
        SystemAPI.getAPI().updateProject(newProject).then(response => {
            console.log(response)
        })
    }



// rendert das Dialogfenster mit allen relevanten Daten um ein neues Projekt zu erstellen
    render(){

        const { name, creator, client, description, set_deadline, project_duration } = this.state;

        return(
            <div>
                <DialogTitle> Projekt: "{this.state.name}" bearbeiten</DialogTitle>
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
                        value={this.state.name}
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
                        value={this.state.client}
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
                        value={this.state.description}
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
                        value={this.state.deadline}
                        onChange={this.handleChange}
                        InputLabelProps={{
                                shrink: true,
                            }}
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="project_duration"
                        label="Projektdauer in Personentagen"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={this.state.project_duration}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Abbrechen</Button>
                    <Button onClick={this.updateProject}>Speichern</Button>
                </DialogActions>
            </div>
        )
    }
}

export default UpdateProject;