import React, { Component } from "react";
import { MenuItem, Paper, TextField, Typography, Button, Divider, InputLabel, Select, Box, FormControl } from "@mui/material";
import SystemAPI from "../../api/SystemAPI";


/**
 * @fileOverview Projekte können hier ausgewählt oder neue erstellt werden.
 * @author Sascha Srpak
 */



// Test Liste, um die Projektauswahl zu testen
// const TestProjekte = [
//     'Projekt 1',
//     'Projekt 2',
//     'Projekt 3',
//     'Projekt 4',
//     'Projekt 5',
//     'Projekt 6',
//     'Projekt 7',
// ];


// Work in Progress
// Mapping der Testliste funktioniert nicht


export class Projektwahl extends Component {

// Constructor für die Projekte, die ausgelesen werden
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            projects: [],
            selectedProjects: null,
        }
    }

    // componentDidMount funktion zum Laden der Projekte
    componentDidMount() {
        SystemAPI.getAPI().getProjects().then(projects => {
            this.setState({
                projects: projects
            })
        })
    }

    handleChange = event => {
        this.setState({
            selectedProjects: event.target.value
        })
    }

// rendert die Projekte aus der Liste
    render () {
        const {projects, selectedProjects} = this.state;



        return (
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
{/** Projektauswahl -> Mapping aus TestArray */}
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
                
                <Button variant="contained" sx={{
                    margin: "20px",
                }}>
                    <Typography sx={{
                        fontWeight: "bold",
                    }}
                    >Auswählen</Typography>
                </Button>



{/** Trennlinie aus Material-UI, ähnlich <hr> */}
                <Divider sx={{
                    margin: "10px",
                }}/>
                
{/** Button zum Erstellen eines neuen Projekts */}
                <Button variant="contained" sx={{
                    margin: "20px",
                }}>
                    <Typography sx={{
                        fontWeight: "bold",
                    }}
                    >Neues Projekt</Typography>
                </Button>
            </Paper>
        )
    }
}

export default Projektwahl;