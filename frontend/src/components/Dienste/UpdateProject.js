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
import {ProjektDeadlineBO} from "../../api";
import {EndereignisBO} from "../../api";
import {ProjektlaufzeitBO} from "../../api";

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
            last_modified_date: ''
        }
    }
     componentDidMount() {
        SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result)=>{
            console.log(result)
            this.setState({
                creator: result.name + " " + result.surname,
                creatorid : result.id,
                managerstatus: result.manager_status
            })
        SystemAPI.getAPI().getProject(this.props.projectdata).then((result) => {
            console.log(result)
            this.setState({
                client: result.client,
                name: result.name,
                description: result.description,
                deadlineid: result.set_deadline,
                project_durationid: result.project_duration,
                creator: result.creator,
                projectid: result.id,



            })

            SystemAPI.getAPI().getProjectDeadline(result.set_deadline).then((result) => {
                this.setState({
                    time_of_event: result.time_of_event,
                    event_name: result.event_name,
                    deadlineid: result.id

                })

            })
            SystemAPI.getAPI().getProjectDuration(result.project_duration).then((result) => {
                this.setState({
                    project_duration: result.duration,
                    duration_start: result.start,
                    duration_ende: result.end,
                    duration_id: result.id,
                    duration_name: result.name
                })


            })

            console.log(result)
            console.log(result.creator)
        })
    })
     }


// Beim Betätigen des Buttons "Abbrechen" wird das Dialogfenster geschlossen
    handleClose = () => {
        this.props.handleCloseEdit();
    }
    

// Setzt Props auf die State-Variablen für Projektdaten
    handleChange = (event) => {
        console.log(event.target.id)
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

// schreibt die Projektdaten in die Datenbank
        // Doesn't Work yet omg

    updateProject = () => {
    if( this.state.managerstatus === "1"){
        if(this.state.client,this.state.description,this.state.name,this.set_deadline){
        console.log(this.state.persons_responsible)
        let newProject = new ProjektBO();
        newProject.setName(this.state.name);
        newProject.setCreator(this.state.creator);
        newProject.setClient(this.state.client);
        newProject.setDescription(this.state.description);
        newProject.setProject_Duration(this.state.project_durationid);
        newProject.setSet_deadline(this.state.deadlineid);
        newProject.setPersons_Responsible([]);
        newProject.setActivities([]);
        newProject.setId(this.state.projectid);
        newProject.setLastModifiedDate(this.state.last_modified_date);

        let newDeadline = new ProjektDeadlineBO();
        newDeadline.setEventName(this.state.event_name);
        newDeadline.setTimeOfEvent(this.state.set_deadline);
        newDeadline.setId(this.state.deadlineid);
        newDeadline.setLastModifiedDate("");


        let newDuration = new ProjektlaufzeitBO();
        newDuration.setDuration(this.state.project_duration);
        newDuration.setStart(this.state.duration_start);
        newDuration.setEnd(this.state.duration_ende);
        newDuration.setName(this.state.duration_name);
        newDuration.setId(this.state.duration_id);
        newDuration.setLastModifiedDate("");



        SystemAPI.getAPI().updateProject(newProject).then(response => {
        })
        SystemAPI.getAPI().updateProjectDeadline(newDeadline).then(response => {
        })

        SystemAPI.getAPI().getEndEvent(this.state.duration_ende).then(response => {
            let newendereignis = new EndereignisBO()
            newendereignis.setEventName(response.event_name)
            newendereignis.setTimeOfEvent(this.state.set_deadline)
            newendereignis.setId(response.id)
            newendereignis.setLastModifiedDate(response.last_modified_date)
            SystemAPI.getAPI().updateEndEvent(newendereignis)
            SystemAPI.getAPI().updateProjectDuration(newDuration).then(response => {
        })
            alert("Projekt wurde bearbeitet")
            this.props.handleCloseEdit(newProject, newendereignis, newDuration);
        })}else{
            alert("Füllen Sie alle Felder aus")
        }
    }else{
        alert("Sie haben keine Berechtigung diese Handlung durchzuführen")
    }
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
                        //value={this.state.time_of_event}
                        onChange={this.handleChange}
                        InputLabelProps={{
                                shrink: true,
                            }}
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