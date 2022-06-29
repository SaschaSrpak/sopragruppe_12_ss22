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

        })
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


    // Back-Button setzt den State projectChoice zurück, damit die Projektwahl wieder angezeigt wird
    handleBack = () => {
        this.setState({
            projectChoice: null,
        })
    }

// Projektedaten des ausgewählten Projekts werden gerendert
    render() {
    const [activities] = this.state.activities; 

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
                </Paper>
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



{/** API abfrage einbauen help i wanna die*/}

                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Peter Thies</TableCell>
                                                    <TableCell>2</TableCell>
                                                    <TableCell>5</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Christoph Kunz</TableCell>
                                                    <TableCell>3</TableCell>
                                                    <TableCell>5</TableCell>
                                                </TableRow>
                                            </TableBody>




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