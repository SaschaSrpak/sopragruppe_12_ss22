import React, { Component } from "react";
import { MenuItem, Paper, TextField, Typography, Button, Divider } from "@mui/material";

/**
 * @fileOverview 
 * @author Sascha Srpak
 */


// Test Liste, um die Projektauswahl zu testen
const TestProjekte = [
    'Projekt 1',
    'Projekt 2',
    'Projekt 3',
    'Projekt 4',
];


// Work in Progress
// Mapping der Testliste funktioniert nicht


export class Projektwahl extends Component {


    render () {
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
                }}>"Projektwahl"</Typography>
{/** Projektauswahl -> Mapping aus Datenbank  */}
                <form>
                    <TextField label="Projektwahl">
                        {TestProjekte.map((projekt) => (
                            <MenuItem
                                key={projekt}>
                            </MenuItem>  
                        ))}
                    </TextField>
                </form>
                <Button variant="contained" sx={{
                    margin: "20px",
                }}>
                    <Typography sx={{
                        fontWeight: "bold",
                    }}
                    >Auswählen</Typography>
                </Button>
{/** Trennlinie aus Material-UI, ähnlich <hr> */}
                <Divider/>
                
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