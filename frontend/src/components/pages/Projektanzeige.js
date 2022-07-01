import React, {Component} from "react";
import {Paper, Typography, Card, Divider, Box, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import AktivitätCard from "./AktivitätAnzeige";
import SystemAPI from "../../api/SystemAPI";
import IconButton from "@mui/material/IconButton";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { NewAktivität } from "../Dienste/NewAktivität";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import UpdateProject from "../Dienste/UpdateProject";

/** 
 *@fileOverview Alle Daten des Projekts sind Sichtbar, wenn der User eingeloggt ist. Aktivities der Projekte werden angezeigt.
 *@author Sascha Srpak
*/



// Projektanzeige + Projektbeschreibung + AktivitätAnzeige
export class Projektanzeige extends Component {

    //constructor für die Projektdaten
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            creator: null,
            creator_new: null,
            client: null,
            deadline: null,
            deadline_new: [],
            project_duration: null,
            project_duration_new: null,
            description: null,
            activity_name: null,
            persons_responsible: [],
            man_day_capacity: null,
            activities: [],
            projectChoice: this.props.projectChoice,
            projects: null,
            persons: [],
            openNewActivity: false,
            openNewPersonResponsible: false,
            openChangeProject: false,
            responsiblepersons: []
        }
    }

    // Projektdaten



    // componentDidMount funktion zum Laden der Projektdaten
    componentDidMount() {
// Projekte aus der Datenbank laden
        SystemAPI.getAPI().getProject(this.state.projectChoice).then(projects => {
            this.setState({
                projects: projects
            })
// Aktivitäten aus der Datenbank laden
            SystemAPI.getAPI().getActivitiesOnProject(this.state.projectChoice).then(activities => {
                this.setState({
                    activities: activities,
                })
            })
// Deadline aus der Datenbank laden -> von ID in Datum
            SystemAPI.getAPI().getProjectDeadline(this.state.projectChoice).then(newDeadline => {
                this.setState({
                        deadline_new: newDeadline,
                })
            })
// Projektdauer aus der Datenbank laden
            SystemAPI.getAPI().getProjectDuration(this.state.projectChoice).then(newDuration => {
                this.setState({
                        project_duration_new: newDuration.duration,
                })
            })
// Projektersteller aus der Datenbank laden
            SystemAPI.getAPI().getPerson(this.state.projects.creator).then(newCreator => {
                this.setState({
                        creator_new: newCreator.name,
                })
            })

// Projektzuständige aus der Datenbank laden
            SystemAPI.getAPI().getPersonsOnProject(this.state.projectChoice).then(responsiblepersons => {
                this.setState({
                        responsiblepersons: responsiblepersons
                })
                        SystemAPI.getAPI().getPersons().then(persons => {
                            this.setState({
                                allpersons: persons})
                                    const newArray = []
                                        persons.map((all) => {

                                                if (responsiblepersons.some(item => all.name === item.name)){
                                                    }else{
                                                    newArray.push(all)}
                                        })
                            this.setState({
                                allpersons: newArray
                            })
                            console.log(newArray)
                                            })
                        })
            })
// Alle Personen aus der Datenbank laden
    }


    // Function to get all the persons responsible for the Activity ID
                // not working yet idk why
    getPersonsOnActivity = () => {
        SystemAPI.getAPI().getPersonsResponsibleOnActivity(this.state.activity.id).then(persons => {
            this.setState({
                persons: persons
            })
        })
    }

    handleDeletePersonResponsible = (personid) => {
        SystemAPI.getAPI().deletePersonResponsibleToProject(this.state.projectChoice, personid).then(persons => {
            this.setState({
                persons: persons
            })
        })
    }

    handlePersonAddResponsible = () => {
        SystemAPI.getAPI().addPersonResponsibleToProject(this.state.projectChoice, this.state.persontoadd).then(persons => {
            this.setState({
                openNewPersonResponsible: false
            })
            alert("Person wurde hinzugefügt")
        })

    }
    // Back-Button setzt den State projectChoice zurück, damit die Projektwahl wieder angezeigt wird
    handleBack = () => {
        this.setState({
            projectChoice: null,
        })
    }

    handleProjectChange = () => {
             this.setState({
            openChangeProject: true
        })

        }

    handleClickOpen = () => {
        this.setState({
            openNewActivity: true
        })
    }

    handleClickOpenPersonResponsible = () => {
        this.setState({
            openNewPersonResponsible: true
        })
    }

    handleCloseClick = () => {
        this.setState({
            openNewActivity: false,
            openNewPersonResponsible: false,
            openChangeProject: false
        })
    }

    PersonSelected = (data) => {
        this.setState({
            persontoadd: data.target.value
        })
    }

// Projektedaten des ausgewählten Projekts werden gerendert
    render() {
    const {openNewActivity, projectChoice} = this.state;

        return (
            <Box sx={{
                margin: "auto",
                }}>
                    <IconButton onClick={this.props.handleClose}
                    aria-label="backspace" >
                        <BackspaceIcon />
                    </IconButton>
                    <h1>Projekt: {this.state.projects?this.state.projects.name:null}</h1>
                <Paper>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            {/* <TableHead>
                                <TableRow sx={{}}>
                                    <TableCell sx={{ maxWidth: 100 }}>Detail Name</TableCell>
                                    <TableCell align="center">Detail Value</TableCell>
                                </TableRow>
                            </TableHead> */}
                            <TableBody>

                                <TableRow>
                                    <TableCell sx={{ maxWidth: 100 }} component="th" scope="row">Projektname</TableCell>
                                    <TableCell align="center">{this.state.projects?this.state.projects.name:null}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ maxWidth: 100 }} component="th" scope="row">Projektersteller</TableCell>
                                    <TableCell align="center">{this.state.projects?this.state.creator_new:null}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ maxWidth: 100 }} component="th" scope="row">Client</TableCell>
                                    <TableCell align="center">{this.state.projects?this.state.projects.client:null}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ maxWidth: 100 }} component="th" scope="row">Deadline</TableCell>
                                    <TableCell align="center">{this.state.projects?this.state.deadline_new.time_of_event:null}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ maxWidth: 100 }} component="th" scope="row">Projektdauer</TableCell>
                                    <TableCell align="center">{this.state.projects?this.state.project_duration_new:null}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
{/* Projektbeschreibung */}
                    <Card> 
                        <Typography sx={{
                            margin: "15px",
                        }}>
                            <h4>Projektbeschreibung:</h4>
                        </Typography>
                        <CardContent>
                            <Typography>
                                {this.state.projects?this.state.projects.description:null}
                            </Typography>
                        </CardContent>
                    </Card>
{/* Projektzuständige */}
                    <Card>
                        <Typography sx={{
                            margin: "15px",
                        }}>
                            <h4>Projektzuständige:</h4>
                        </Typography>
                        <CardContent>
                            <Typography>
                                <TableContainer component={Paper}>
                                <table>
                                    <TableBody>
                                {this.state.responsiblepersons.map((data, index) => (
                                    <TableRow id={index} key={data.surname}>
                                        <TableCell> {data.id} </TableCell>
                                        <TableCell> {data.surname} </TableCell>
                                        <TableCell> {data.name} </TableCell>
                                        <TableCell> <Button  color='warning'  onClick={() => this.handleDeletePersonResponsible(data.id)} >Delete</Button> </TableCell>
                                    </TableRow>

                                ))}
                                {this.state.projects?this.state.projects.responsiblepersons:null}
                                <Button color='info' onClick={this.handleClickOpenPersonResponsible}> Person Hinzufügen </Button>
                                        </TableBody>
                                    </table>
                                    </TableContainer>
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
                <Divider variant="fullWidth" sx={{
                    margin: "20px"
                }}/>

{/* Neue Person hinzufügen */}

               <Dialog open={this.state.openNewPersonResponsible} onClose={this.handleCloseClick}>
                    <DialogTitle>Person zu Projekt: "{this.state.projects?this.state.projects.name:null}" Hinzufügen</DialogTitle>

                    <DialogContent>


                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Person auswählen</InputLabel>
                            <Select

                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                

                                onChange={(e) => this.PersonSelected(e)}
                            >
                                {this.state.allpersons?this.state.allpersons.map((data, index) => (
                                <MenuItem name={data.id} value={data.id}>ID: {data.id} {data.name} {data.surname} </MenuItem>)):null}


                            </Select>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePersonAddResponsible}>Save</Button>
                        <Button onClick={this.handleCloseClick}>Cancel</Button>


                    </DialogActions>
            </Dialog >
{/** TO DO: Button zum Erstellen einer neuen Aktivität */}
                    <Button variant="contained" 
                        onClick={this.handleClickOpen}
                        value={this.state.openNewActivity}
                        sx={{
                        margin: "20px",
                        }}>
                        <Typography sx={{
                            fontWeight: "bold",
                        }}
                        >Neue Aktivität</Typography>
                    </Button>
{/** Button zum Bearbeiten eines Projektes */}
                     <Button variant="contained"
                        onClick={this.handleProjectChange}

                        sx={{
                        margin: "20px",
                        }}>
                        <Typography sx={{
                            fontWeight: "bold",
                        }}
                        >Projekt bearbeiten</Typography>
                    </Button>

                    <Dialog open={this.state.openChangeProject} onClose={this.handleCloseClick}
                    >
                        <UpdateProject user={this.props.user} open={this.props} />
                    </Dialog>

            {/** why is this not workiiiing */}

                    <Dialog open={openNewActivity} onClose={this.handleCloseClick}
                    >
                        <NewAktivität openNewActivity={this.state.openNewActivity} handleClose={() => this.setState({openNewActivity:false})}  projectChoice={projectChoice} />
                    </Dialog> 


                <Divider variant="fullWidth" sx={{
                    margin: "20px"
                }}/>
{/* AktivitätAnzeige als Komponente ausgelagert. Ok probably not nvm */}


                <Grid>
                    <Grid container justifyContent="space-around">
                        
                        {this.state.activities.map((activity, index) => {
                            return (
                                
                                <Card variant="outlined" sx={{ maxWidth: 800 }}>
                                <CardContent>
                                    <Typography variant="h5" margin-top="10px" marginBottom="0px">
                                        <b>{activity.activity_name}</b>
                                    </Typography>
                                    <Typography marginBottom="10px">Kapazität: {activity.man_day_capacity} Personentage</Typography>
                                    <TableContainer>
                                        <Table>
                                            <TableHead sx={{
                                                backgroundColor: "#f5f5f5",
                                            }}>
                                                <TableRow>
                                                    <TableCell sx={{fontWeight: "bold",}}>Personen</TableCell>
                                                    <TableCell sx={{fontWeight: "bold",}}>Ist</TableCell>
                                                    <TableCell sx={{fontWeight: "bold",}}>Soll</TableCell>
                                                </TableRow>
                                            </TableHead>



{/** API abfrage einbauen help i wanna die
 * 
*/}

                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{this.getPersonsOnActivity}</TableCell>
                                                    <TableCell>2</TableCell>
                                                    <TableCell>5</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Christoph Kunz</TableCell>
                                                    <TableCell>3</TableCell>
                                                    <TableCell>5</TableCell>
                                                </TableRow>
                                            </TableBody>



{/** Buttons Edit / Delete brauchen Funktionalität
 * 
 */}

                                        </Table>
                                    </TableContainer>
                                </CardContent>
                                <CardActions>
                                    <IconButton aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>




                            )
                        })}




                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default Projektanzeige;