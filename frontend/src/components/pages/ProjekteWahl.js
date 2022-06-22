import React, { Component } from "react";
import { MenuItem, Paper, TextField, Typography, Button, Divider, InputLabel, Select, Box, FormControl, Menu } from "@mui/material";

/**
 * @fileOverview Projekte können hier ausgewählt oder neue erstellt werden.
 * @author Sascha Srpak
 */


// Test Liste, um die Projektauswahl zu testen
const TestProjekte = [
    'Projekt 1',
    'Projekt 2',
    'Projekt 3',
    'Projekt 4',
    'Projekt 5',
    'Projekt 6',
    'Projekt 7',
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
                }}>Projektwahl</Typography>
{/** Projektauswahl -> Mapping aus TestArray */}
                <Box>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Projekte</InputLabel>
                        <Select
                            label="Projekte"
                        >
                            {
                                TestProjekte.map((projekt) => {
                                    return (
                                        <MenuItem key={projekt} value={projekt}>{projekt}</MenuItem>
                                    )
                                }
                            )}
                        
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