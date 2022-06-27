import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

/** 
 *@fileOverview Aktivitäten werden als Cards angezeigt.
 *@author Sascha Srpak
*/


// rendert die Aktivitäten zu einem Projekt in Form einer Card Komponente
export class ActivitätCard extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Grid container justifyContent="space-around">
                        <Card variant="outlined" sx={{ maxWidth: 500 }}>
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
                        </Card>

                        <Card variant="outlined" sx={{ maxWidth: 500 }}>
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
                        </Card>

                        <Card variant="outlined" sx={{ maxWidth: 500 }}>
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
                        </Card>

                        <Card variant="outlined" sx={{ maxWidth: 500 }}>
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
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ActivitätCard;
