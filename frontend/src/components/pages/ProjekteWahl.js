import React, { Component } from "react";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import SystemAPI from "../../api/SystemAPI";
import { Dialog } from "@mui/material";
import { NewProjekt } from "../Dienste/NewProjekt";
import Projektanzeige from "./Projektanzeige";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";


/**
 * @fileOverview Projekte können hier ausgewählt oder neue erstellt werden.
 * @author Sascha Srpak, Liam Wilke
 */


// Projektwahl Komponente
export class Projektwahl extends Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            projects: [],
            selectedProjects: null,
            projectChoice: null,
            open: false,
            deleteDialogOpen: false
        }
    }

    // Projekte aus der Datenbank laden
    getData() {
        SystemAPI.getAPI().getProjects().then(projects => {
            this.setState({
                projects: projects
            })
        })
        // Managerstatus aus der Datenbank laden
        SystemAPI.getAPI().getPersonByFirebaseID(this.props.user.uid).then((result) => {
            console.log(result)
            this.setState({
                managerstatus: result.manager_status
            })
        })
    }

    // componentDidMount zum Laden der Projekte beim Rendern der Seite
    componentDidMount() {
        this.getData()
    }

    // Projektauswahl wird angezeigt
    handleChange = event => {
        this.setState({
            selectedProjects: event.target.value
        })
    }

    // Beim betätigen von "Auswählen" wird das Projekt in projectChoice gespeichert (work in progress)
    handleChoseClick = () => {
        this.setState({
            projectChoice: this.state.selectedProjects,
        })
        // console.log(this.state.projectChoice)
    }

    // Öffnet den Dialog zum Erstellen eines neuen Projekts
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    }

    // Schließt den Dialog zum Erstellen eines neuen Projekts
    handleClose = () => {
        this.setState({
            open: false,
            deleteDialogOpen: false
        })
        this.getData()
    }

    // Funktion zum Löschen eines Projekts
    deleteProject = () => {
        if (this.state.managerstatus === "1") {
            console.log(this.state.selectedProjects)
            if (this.state.selectedProjects) {
                SystemAPI.getAPI().deleteProject(this.state.selectedProjects).then(() => {
                    this.setState({
                        selectedProjects: null
                    })
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    SystemAPI.getAPI().getProjects().then(projects => {
                        this.setState({
                            projects: projects,
                            deleteDialogOpen: false
                        })
                    })
                }
                )
                alert("Projekt wurde gelöscht")
            } else {
                alert("Kein Projekt ausgewählt")
                this.setState({
                    deleteDialogOpen: false
                })
            }
        } else {
            alert("Sie haben keine Berechtigung dazu ein Projekt zu löschen")
            this.setState({ deleteDialogOpen: false })
        }
    }


    // rendert die Projekte aus der Liste. Projekte können ausgewählt werden, beim bestätigen wird über
    // conditional Rendering zu der Projektanzeige weitergeleitet: https://reactjs.org/docs/conditional-rendering.html

    render() {

        const { projects, selectedProjects, open, projectChoice, deleteDialogOpen } = this.state;

        return (
            <div>
                {projectChoice
                    ? <Projektanzeige
                        open={this.props}
                        user={this.props.user}
                        handleClose={() => this.setState({ projectChoice: null })}
                        projectChoice={projectChoice}
                    />
                    :
                    <Paper sx={{
                        textAlign: 'center',
                        width: "50%",
                        height: "auto",
                        margin: "auto",
                    }}>
                        <Typography variant="h4" sx={{
                            textAlign: 'center',
                            margin: "5px",
                        }}>Projektwahl</Typography>
                        <Box>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Projekte</InputLabel>
                                <Select
                                    value={selectedProjects}
                                    onChange={this.handleChange}
                                    label="Projekte"
                                >
                                    {projects.map((project) => {
                                        return (
                                            <MenuItem key={project.id} value={project.id}>
                                                {project.name}
                                            </MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Box>

                        {/** Button zum Anzeigen der Projektdetails zum ausgewählten Projekt*/}
                        <Button
                            onClick={this.handleChoseClick}
                            id={this.state.selectedProjects}
                            variant="contained"
                            sx={{
                                margin: "20px",
                            }}>
                            <Typography sx={{
                                fontWeight: "bold",
                            }}
                            >Auswählen</Typography>
                        </Button>

                        {/**Button zum löschen des ausgewählten Projekts */}
                        <Button
                            onClick={() => this.setState({ deleteDialogOpen: true })}
                            id={this.state.selectedProjects}
                            variant="outlined"
                            color="error"
                            sx={{
                                margin: "20px",
                            }}>
                            <Typography sx={{
                                fontWeight: "bold",
                            }}
                            >Ausgewähltes Projekt löschen</Typography>
                        </Button>
                        <Divider sx={{
                            margin: "10px",
                        }} />
                        {/** Button zum Erstellen eines neuen Projekts */}
                        <Button variant="contained"
                            onClick={this.handleClickOpen}
                            value={this.state.open}
                            sx={{
                                margin: "20px",
                            }}>
                            <Typography sx={{
                                fontWeight: "bold",
                            }}
                            >Neues Projekt</Typography>
                        </Button>
                        <Dialog
                            open={open}
                            onClose={this.handleClose}
                        >
                            <NewProjekt user={this.props.user}
                                handleClose={this.handleClose}
                                open={open}
                            />
                        </Dialog>
                        <Dialog open={deleteDialogOpen} onClose={this.handleClose}>
                            <DialogTitle>
                                Soll das Projekt mit allen zugehörigen Daten gelöscht werden?
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={this.deleteProject}>Ja</Button>
                                <Button onClick={() => this.setState({ deleteDialogOpen: false })}>Nein</Button>
                            </DialogActions>
                        </Dialog>
                    </Paper>
                }
            </div>
        )
    }
}

export default Projektwahl;