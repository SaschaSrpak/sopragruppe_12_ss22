import React, {Component} from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import SystemAPI from "../../api/SystemAPI";
import {Button} from "@mui/material";
import UpdateDialog from "./UpdateDialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import KommenBO from "../../api/Ereignisse/KommenBO";

/** 
 *@fileOverview Hier kann man eine Kommenbuchung bearbeiten und löschen
 *@author Liam Wilke
*/


export class  KommenTable extends Component{
    constructor(props)
    {
        super(props);
        //setzt alle Standartstates für die Variablen
        this.state = {
            openedit: false,
            opendelete: false,
            data: props.data,
            kommen: KommenBO
        }
    }
     handleClickOpenEdit = (event) => {
        //Wenn der Dailog zum Editieren aufgerufen wird, werde mit dieser Funktion die Tabellendaten aus der entsprechenden Zeile ausgelesen und den Textfeldern als Default-Value übergeben
        this.setState({
          openEdit: !this.state.open,
            editElement: event,
            eventname: event.event_name,
            timeofevent : event.time_of_event
        })

      };

      handleClickOpenDelete = (event) => {
    this.setState({
      openDelete: !this.state.open,
        deleteElement: event
    })
  };
    handleCloseEdit = () => {
        //Setzt den Zustand zurück
        this.setState({
          openEdit: false
      });
    };

    handleCloseDelete= () => {
        //Setzt den Zustand zurück
        this.setState({
          openDelete: false
      });
    };

    DeleteKommen = (event) => {
        console.log(this.state.deleteElement)
         var newdata = this.state.data.filter(a => a.id !== this.state.deleteElement.id)
        console.log(newdata)
        SystemAPI.getAPI().deleteKommen(this.state.deleteElement.id).then((result) => {this.setState({
          openDelete: false,
            data: newdata


                }

        )
        })
    }
    getLocalTime = () => {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
    localISOTime = localISOTime.replace("T", " ")
    return localISOTime
  }

    UpdateKommen = () => {
        //Update Kommebuchung

        let updateKommen = Object.assign(new KommenBO(), this.state.kommen)
        updateKommen.setEventName(this.state.eventname);
        updateKommen.setTimeOfEvent(this.state.timeofevent);
        updateKommen.setId(Number(this.state.editElement.id));

        var time = this.getLocalTime()
        var timeofevent = this.state.timeofevent.replace("T", " ")

        updateKommen.setLastModifiedDate(time);

         var newdata = this.state.data.filter(a => a.id !== this.state.editElement.id)

        SystemAPI.getAPI().updateKommen(updateKommen).then(person => {
            updateKommen.setTimeOfEvent(timeofevent)
            newdata.push(updateKommen)
            this.setState({
                 data: newdata,
                openEdit: false
            })})

    }

    handleChange = (event) => {
        //Updatet das geänderte Objekt
        this.setState({
            [event.target.id]: event.target.value,

        })
    }
    render() {
        //Rendert die Komponente
        if (this.props.data.length > 0 && this.state.data.length >0 ) {
            const headers = Object.keys(this.props.data[0]);
            const headers2 = ["Event Name", "Zeitpunkt", "ID", "Letzte Änderung"];
            const { openEdit, openDelete } = this.state;

                return (
                    <Paper>
                        <Typography variant="h4" color="inherit">
                            {this.props.title}
                        </Typography>

                        <hr/>

                        <Table id={"kommenTable"}>
                            <TableHead>
                                <TableRow>
                                    {headers2.map(header2 => (
                                        <TableCell align="left">{header2.toUpperCase()}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map((emp) => (
                                    <TableRow>
                                        {headers.map(header => (
                                            <TableCell align="left">{emp[header]}</TableCell>
                                        ))}
                                        <Button color='primary' onClick={() =>this.handleClickOpenEdit(emp)} >Edit</Button>
                                        <Button color='warning' onClick={() =>this.handleClickOpenDelete(emp)} >Delete</Button>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Dialog open={openEdit} onClose={this.handleCloseEdit}>
                    <DialogTitle>Aktualisiere deine Buchung</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bearbeite deine Kommenbuchungen:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="eventname"
                            label={"Event Name"}
                            fullWidth
                            variant="standard"
                            defaultValue={this.state.editElement?this.state.editElement.event_name:null}
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            editable = "false"
                            inputProps={{readOnly: true}}
                            margin="dense"
                            id="id"
                            label={"Event ID"}
                            value={this.state.editElement?this.state.editElement.id:null}
                            fullWidth
                            variant="standard"

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id = "timeofevent"
                            label="Zeitpunkt des Events"
                            type="datetime-local"
                            fullWidth
                            variant="standard"
                            defaultValue={this.state.editElement?this.state.editElement.time_of_event:null}
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Letzte Änderung"
                            type="datetime-local"
                            inputProps={{readOnly: true}}
                            value={this.state.editElement?this.state.editElement.last_modified_date:null}
                            fullWidth
                            variant="standard"

                        />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEdit}>Cancel</Button>
                            <Button onClick={this.UpdateKommen}>Update</Button>
                        </DialogActions>
                </Dialog>
                  <Dialog open={openDelete} onClose={this.handleCloseDelete}>
                    <DialogTitle> Lösche deine Buchung</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Möchtest du die Buchung wirklich löschen?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseDelete}>Cancel</Button>
                            <Button onClick={this.DeleteKommen}>Löschen</Button>
                        </DialogActions>
                </Dialog>
                    </Paper>
                );


                KommenTable.defaultProps = {
                    title: "No Title"
                };

        } else {

            return (

                <h1> No Kommen Data</h1>
            )
        }
    }
}
export default KommenTable;





