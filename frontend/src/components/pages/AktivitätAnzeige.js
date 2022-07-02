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
import {NewAktivität} from "../Dienste/NewAktivität";
import {AktivitätBearbeiten} from "../Dienste/AktivitätBearbeiten";

/** 
 *@fileOverview Nicht mehr ausgelagert diese nix gut, kann gelöscht werden
 *@author Sascha Srpak
*/


// rendert die Aktivitäten zu einem Projekt in Form einer Card Komponente
export class AktivitätCard extends Component {

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
            man_day_capacity : props.activity.man_day_capacity,
            activity_name : props.activity.activity_name
        };
    }
    componentDidMount() {
        console.log(this.state.personresponsible)

        var personsworktimeonac = []
        this.state.personresponsible.map((person) => {
            console.log(person.id, this.props.activity.id)
        SystemAPI.getAPI().getWorktimeOfAccountOnActivity(person.id, this.props.activity.id).then(worktime => {
            if (worktime){
                worktime = worktime * 60
                var Hours = Math.floor(worktime /60)
                var minutes = Math.round(worktime % 60)

                let worktimerounded =  Hours + "h " +minutes + "Min"
                console.log(worktimerounded)

            personsworktimeonac.push(worktimerounded)
                }else{
                personsworktimeonac.push("0h 0Min")
            }
            this.setState({
                personsworktimeonac: personsworktimeonac
                })
            })
            if (!this.personsworktimeonac){
                this.setState({
                personsworktimeonac: [0]
                })
            }

    })
        console.log(personsworktimeonac)
    }

    openEditActivity = () => {
        this.setState({
            openEditActivity: true,
        })
    }
    // getActivitiesOnProjeft(project_id) lädt die Aktivitäten zu einem Projekt
    // Problem: projectChoice wird als "undefined" übergeben.
    // help pls omg
    handleActivityIconClickOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleClose() {
        this.setState({ deleteDialogOpen: false })
    }
    handleDelete() {
        SystemAPI.getAPI().deleteActivity(this.props.activity.id).then(activity => {
            this.props.handleDelete(activity)
            this.handleClose()
        })
    }
    handleUpdateActivity= (response) => {
        this.setState({
            openEditActivity: false,
            activity_name : response.activity_name,
            man_day_capacity : response.man_day_capacity

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
            if (worktime){
                worktime = worktime * 60
                var Hours = Math.floor(worktime /60)
                var minutes = Math.round(worktime % 60)

                let worktimerounded =  Hours + " H " +minutes + " Min"
                console.log(worktimerounded)

            personsworktimeonac.push(worktimerounded)
                }else{
                personsworktimeonac.push("0h 0Min")
            }
            this.setState({
                personsworktimeonac: personsworktimeonac
                })
            })
            if (!this.personsworktimeonac){
                this.setState({
                personsworktimeonac: [0]
                })
            }

    })


        })



    }

   handleCloseClickEdit = () => {
        this.setState({
            openEditActivity: false,

        })
    }
    render() {
        // Rendert die Aktivitäten als Card Komponenten
        const { activity } = this.props;
        const {open} = this.state;
        const { openEditActivity } = this.state;
        const { persons } = this.props;
        return (

            <Card variant="outlined" sx={{ maxWidth: 800 }}>
                <CardContent>
                    <Typography variant="h5" margin-top="10px" marginBottom="0px">
                        <b>{this.state.activity_name?this.state.activity_name:null}</b>
                    </Typography>
                    <Typography marginBottom="10px">Kapazität: {this.state.man_day_capacity?this.state.man_day_capacity:null} Personentage</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{
                                backgroundColor: "#f5f5f5",
                            }}>
                                <TableRow>
                                    {/* <TableCell sx={{ fontWeight: "bold", }}>Personen</TableCell> */}
                                    <TableCell sx={{ fontWeight: "bold", }}>Name </TableCell>
                                    <TableCell sx={{ fontWeight: "bold", }}>Vorname</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", }}>UserID</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", }}>Arbeitszeit</TableCell>
                                </TableRow>
                            </TableHead>



                            {/** API abfrage einbauen help i wanna die
 *
*/}

                            <TableBody>
                                {this.state.personresponsible?this.state.personresponsible.map((person, index) => {
                                return <TableRow>

                            <TableCell> {person.name}  </TableCell>
                            <TableCell> {person.surname}  </TableCell>
                            <TableCell> {person.id} </TableCell>
                            <TableCell> {this.state.personsworktimeonac?this.state.personsworktimeonac[index]:null}</TableCell>



                                </TableRow>}):null}

                            </TableBody>



                            {/** Buttons Edit / Delete brauchen Funktionalität
 *
 */}

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
                        
                        <AktivitätBearbeiten  open={openEditActivity} handleClose={this.handleCloseClickEdit}
                                              responsibles={activity.persons_responsible}  activityname={activity.name}
                                              activitydescription={activity.description}  activityid = {activity.id}
                                              persons={persons} activitymanday ={activity.man_day_capacity}
                                                handleUpdate={this.handleUpdateActivity}/>
                    </Dialog>

                    <Dialog open={this.state.deleteDialogOpen} onClose={this.handleClose}>
                        <DialogTitle>
                            Soll die Aktivität gelöscht werden?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={() => this.handleDelete(activity.id)}>Ja</Button>
                            <Button onClick={this.handleClose}>Nein</Button>
                        </DialogActions>
                    </Dialog>


                </CardActions>

            </Card>




        )
    }
}
export default AktivitätCard;
