import React, { Component } from "react";
import { MenuItem, Paper, TextField, Typography, Button } from "@mui/material";

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


export class ProjekteAnzeigen extends Component {


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
            </Paper>
        )
    }
}

export default ProjekteAnzeigen;