import React, {Component} from "react";
import {Paper, Typography, Card, CardContent, Divider, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AktivitätAnzeige from "./AktivitätAnzeige";

/** 
 *@fileOverview Alle Daten des Projekts sind Sichtbar, wenn der User eingeloggt ist. Aktivities der Projekte werden angezeigt.
 *@author Sascha Srpak
*/

/**
 * Projektdaten anzeige, drunter 
 */


// export class Projektanzeige extends Component {
//     render() {
//         return (
//             <div>
//                 <h1>Projektanzeige Testpage</h1>
//                 <p>Platzhalter für Projektdaten</p>
//                 <Divider sx={{
//                     margin: "10px",
//                 }}/>
//                 <AktivitätAnzeige/>
//             </div>
//         );
//     }
// }

// export default Projektanzeige;


function createData(detailName, detailValue) {
    return { detailName, detailValue };
}

// Projektdaten
const rows = [
    createData("Name", "SoPra"),
    createData("Creator", "God"),
    createData("Client", "Peter Thies"),
    createData("deadline", "31.07.2022"),
    createData("Dauer in h", 1000)
];

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
        }
    }


    render() {
        return (
            <Box sx={{
                margin: "auto",
                maxWidth: 1000
                }}>
                <Paper>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{}}>
                                    <TableCell sx={{ maxWidth: 100 }}>Detail Name</TableCell>
                                    <TableCell align="center">Detail Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.detailName}>
                                        <TableCell sx={{ maxWidth: 100 }} component="th" scope="row">
                                            {row.detailName}
                                        </TableCell>
                                        <TableCell align="center">{row.detailValue}</TableCell>
                                    </TableRow>
                                ))}
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
                                dies ist eine beschriebung dies das lalala wer das liest ist super
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
                <Divider variant="fullWidth" sx={{
                    margin: "20px"
                }}/>
{/* AktivitätAnzeige als Komponente ausgelagert */}
                <AktivitätAnzeige/>
            </Box>
        );
    }
}

export default Projektanzeige;