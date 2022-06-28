import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableBody } from "@mui/material";
import SystemAPI from "../../api/SystemAPI";

/** 
 *@fileOverview Aktivitäten werden als Cards angezeigt.
 *@author Sascha Srpak
*/


// rendert die Aktivitäten zu einem Projekt in Form einer Card Komponente
export class AktivitätCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activity_name: null,
            persons_responsible: [],
            man_day_capacity: null,
            projectChoice: this.props.projectChoice,
            activities: [],
        };
    }


// getActivitiesOnProjeft(project_id) lädt die Aktivitäten zu einem Projekt
        // Problem: projectChoice wird als "undefined" übergeben.
        // help pls omg
    componentDidMount() {
        SystemAPI.getAPI().getActivitiesOnProject(this.state.projectChoice).then(activities => {
            this.setState({
                activities: activities,
            })
        })
    }

// Rendert die Aktivitäten als Card Komponenten
    render() {
        // const [activities] = this.state;

        return (
            <div>
                <Grid>
                    <Grid container justifyContent="space-around">
                        
{/** Prototyp einer Aktivitätskarte -> Soll mit .map für jede Aktivität erstellt werden */}
                    <Card variant="outlined" sx={{ maxWidth: 800 }}>
                            <CardContent>
                                <Typography variant="h5" margin-top="10px" marginBottom="0px">
                                    <b>Aktivitätsname: {this.state.activities?this.state.activities.activity_name:null}</b>
                                </Typography>
                                <Typography marginBottom="10px">Kapazität: 10 Personentage</Typography>
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
                        




                        {/* <Card variant="outlined" sx={{ maxWidth: 500 }}>
                            <CardContent>
                                <Typography align="right">Peter Thies</Typography>
                                <Typography variant="h5" margin-top="10px" marginBottom="10px">
                                    <b>Aktivitätsname</b>
                                </Typography>
                                <Typography>Kapazität: 10 Personentage</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card> */}

                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default AktivitätCard;
