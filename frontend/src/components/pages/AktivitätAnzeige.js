import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableBody } from "@mui/material";
import SystemAPI from "../../api/SystemAPI";
// import AktivitätCard from "./AktivitätAnzeige";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import { NewAktivität } from "../Dienste/NewAktivität";
import { AktivitätBearbeiten } from "../Dienste/AktivitätBearbeiten";

/** 
 *@fileOverview Aktivitäten werden als Card-Komponenten angezeigt.
 *@author Sascha Srpak, Liam Wilke
*/


// rendert die Aktivitäten zu einem Projekt in Form einer Card Komponente
export class AktivitätCard extends Component {
    // Constructor, der anfangswerte setzt
    constructor(props) {
        super(props);
        console.log(props.activity)
        console.log(props.persons)
        this.state = {
            deleteDialogOpen: false,
            open: false,
            openAktivitätBearbeiten: false,
            personresponsible: props.activity.persons_responsible,
            personslist: props.persons,
            man_day_capacity: props.activity.man_day_capacity,
            activity_name: props.activity.activity_name
        };
    }

    // Component did Mount, um beim Rendern die Daten zu laden
    componentDidMount() {
        console.log(this.state.personresponsible)
        SystemAPI.getAPI().getPersonsResponsibleOnActivity(this.props.activity.id).then(persons => {
            var personsworktimeonac = []
            persons.map((person) => {
                console.log(person.id, this.props.activity.id)
                SystemAPI.getAPI().getWorktimeOfAccountOnActivity(person.id, this.props.activity.id).then(worktime => {
                    if (worktime) {
                        worktime = worktime * 60
                        var Hours = Math.floor(worktime / 60)
                        var minutes = Math.round(worktime % 60)
                        let worktimerounded = Hours + "h " + minutes + "Min"
                        console.log(worktimerounded)
                        person.username = worktimerounded
                        personsworktimeonac.push(person)
                    } else {
                        person.username = ("0h 0Min")
                        personsworktimeonac.push(person)
                    }
                    this.setState({
                        personresponsible: personsworktimeonac
                    })
                })
            })
            console.log(personsworktimeonac)
        })
    }

    // öffnet den Dialog zum Bearbeiten einer Aktivität
    openEditActivity = () => {
        this.setState({
            openEditActivity: true,
        })
    }

    // öffnet den Dialog zum Bearbeiten einer Aktivität
    handleActivityIconClickOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }

    // schließt den Dialog zum löschen einer Aktivität
    handleCloseDelete() {
        this.setState({ deleteDialogOpen: false })
    }

    // schließt den Dialog zum Bearbeiten einer Aktivität
    handleClose() {
        console.log("Funkt")
        this.setState({ deleteDialogOpen: false })
    }

    // löscht eine Aktivität
    handleDelete() {
        SystemAPI.getAPI().deleteActivity(this.props.activity.id).then(activity => {
            this.props.handleDelete(activity)
            this.handleClose()
        })
    }

    // Funktion Bearbeiten einer Aktivität
    handleUpdateActivity = (response) => {
        this.setState({
            openEditActivity: false,
            activity_name: response.activity_name,
            man_day_capacity: response.man_day_capacity
        })
        SystemAPI.getAPI().getPersonsResponsibleOnActivity(response.id).then(persons => {
            this.setState({
                personresponsible: persons
            })
            console.log(this.state.personresponsible)
            var personsworktimeonac = []
            this.state.personresponsible.map((person) => {
                console.log(person.id, this.props.activity.id)
                SystemAPI.getAPI().getWorktimeOfAccountOnActivity(person.id, this.props.activity.id).then(worktime => {
                    if (worktime) {
                        worktime = worktime * 60
                        var Hours = Math.floor(worktime / 60)
                        var minutes = Math.round(worktime % 60)
                        let worktimerounded = Hours + "h " + minutes + "Min"
                        console.log(worktimerounded)
                        person.username = worktimerounded
                        personsworktimeonac.push(person)
                    } else {
                        person.username = ("0h 0Min")
                        personsworktimeonac.push(person)
                    }
                    this.setState({
                        personresponsible: personsworktimeonac
                    })
                })
                //if (!this.personsworktimeonac){
                //    this.setState({
                //   personsworktimeonac: [0]
                //   })
                // }
            })
        })
    }

    // schließt den Dialog zum Bearbeiten einer Aktivität
    handleCloseClickEdit = () => {
        this.setState({
            openEditActivity: false,
        })
    }

    // Rendert die Aktivitäten als Card Komponenten
    render() {
        const { activity } = this.props;
        const { open } = this.state;
        const { openEditActivity } = this.state;
        const { persons } = this.props;
        const { deleteDialogOpen } = this.state;


        return (
            <Card variant="outlined" sx={{ maxWidth: 800 }}>
                <CardContent>
                    <Typography variant="h5" margin-top="10px" marginBottom="0px">
                        <b>{this.state.activity_name ? this.state.activity_name : null}</b>
                    </Typography>
                    <Typography marginBottom="10px">Kapazität: {this.state.man_day_capacity ? this.state.man_day_capacity : null} Personentage</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{
                                backgroundColor: "#f5f5f5",
                            }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold", }}>Name </TableCell>
                                    <TableCell sx={{ fontWeight: "bold", }}>Vorname</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", }}>UserID</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", }}>Arbeitszeit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.personresponsible ? this.state.personresponsible.map((person, index) => {
                                    return <TableRow>
                                        <TableCell> {person.name}  </TableCell>
                                        <TableCell> {person.surname}  </TableCell>
                                        <TableCell> {person.id} </TableCell>
                                        <TableCell> {person.username}</TableCell>
                                    </TableRow>
                                }) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="edit">
                        <EditIcon onClick={this.openEditActivity} />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => this.setState({ deleteDialogOpen: true })} />
                    </IconButton>
                    <Dialog open={openEditActivity} onClose={this.handleCloseClickEdit}
                    >
                        <AktivitätBearbeiten open={openEditActivity} handleClose={this.handleCloseClickEdit}
                            responsibles={activity.persons_responsible} activityname={activity.name}
                            activitydescription={activity.description} activityid={activity.id}
                            persons={persons} activitymanday={activity.man_day_capacity}
                            handleUpdate={this.handleUpdateActivity} />
                    </Dialog>
                    <Dialog open={deleteDialogOpen} onClose={this.handleClose}>
                        <DialogTitle>
                            Soll die Aktivität gelöscht werden?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={() => this.handleDelete(activity.id)}>Ja</Button>
                            <Button onClick={() => this.setState({ deleteDialogOpen: false })}>Nein</Button>
                        </DialogActions>
                    </Dialog>
                </CardActions>
            </Card>
        )
    }
}
export default AktivitätCard;