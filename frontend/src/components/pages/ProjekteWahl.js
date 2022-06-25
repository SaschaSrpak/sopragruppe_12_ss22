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
            projectChoice: null,
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

// Projektauswahl wird angezeigt
    handleChange = event => {
        this.setState({
            selectedProjects: event.target.value
        })
        // console.log(this.state.selectedProjects)
    }

// Beim betätigen von "Auswählen" wird das Projekt in projectChoice gespeichert (work in progress)
    handleChoseClick = () => {
        this.setState({
            projectChoice: this.state.selectedProjects
        })
        // console.log(this.state.projectChoice)
    }


        ////// TO DO: Conditional Rendering -> Sobald ein Projekt mit "Auswählen" bestätigt wird,
        ////// wird das Projekt in projectChoice gespeichert und das Projekt wird angezeigt.


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
                <Divider sx={{
                    margin: "10px",
                }}/>
                


                
{/** TO DO: Button zum Erstellen eines neuen Projekts */}
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