import React, {Component} from "react";
import {Paper, Typography, Card, CardContent, Divider, Box, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AktivitätCard from "./AktivitätAnzeige";
import SystemAPI from "../../api/SystemAPI";
import IconButton from "@mui/material/IconButton";
import BackspaceIcon from '@mui/icons-material/Backspace';

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
            client: null,
            deadline: null,
            project_duration: null,
            description: null,
            activities: [],
            persons_responsible: [],
            projectChoice: this.props.projectChoice,
            projects: null,
        }
    }

    // Projektdaten



    // componentDidMount funktion zum Laden der Projektdaten
    componentDidMount() {
        SystemAPI.getAPI().getProject(this.state.projectChoice).then(projects => {
            this.setState({
                projects: projects
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
        // const [projectChoice] = this.state;

        return (
            <Box sx={{
                margin: "auto",
                }}>
                    <IconButton onClick={this.props.handleClose}
                    aria-label="backspace" >
                        <BackspaceIcon />
                    </IconButton>
                    <h1>testprojekt: {this.state.projects?this.state.projects.name:null}</h1>
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
                                    <TableCell align="center">{this.state.projects?this.state.projects.creator:null}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ maxWidth: 100 }} component="th" scope="row">Client</TableCell>
                                    <TableCell align="center">{this.state.projects?this.state.projects.client:null}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ maxWidth: 100 }} component="th" scope="row">Deadline</TableCell>
                                    <TableCell align="center">{this.state.projects?this.state.projects.deadline:null}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ maxWidth: 100 }} component="th" scope="row">Projektdauer</TableCell>
                                    <TableCell align="center">{this.state.projects?this.state.projects.project_duration:null}</TableCell>
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
{/* AktivitätAnzeige als Komponente ausgelagert */}
                <AktivitätCard projectChoice= {this.state.selectedProjects}/>
            </Box>
        );
    }
}

export default Projektanzeige;