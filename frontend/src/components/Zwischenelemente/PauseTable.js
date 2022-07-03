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
import PauseBO from "../../api/Zeitintervall/PauseBO";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

/** 
 *@fileOverview Hier kann man eine Abwesenheitsbuchung bearbeiten und löschen
 *@author Liam Wilke
*/


export class  PauseTable extends Component{
    constructor(props)
    {
        super(props);
        //setzt alle Standartstates für die Variablen
        this.state = {
            openedit: false,
            opendelete: false,
            pause: PauseBO
        }
    }
     handleClickOpenEdit = (event) => {
        //Wenn der Dialog zum Löschen aufgerufen wird, wird diesem die entsprechenden Daten aus der Zeile ausgelesen
        let reihe = Number(event.target.parentNode.id)
         reihe += 1


        this.setState({
          openEdit: !this.state.open,
            transaktionsid: document.getElementById("pauseTable").rows[reihe].cells[0].innerHTML,
            intervalid: document.getElementById("pauseTable").rows[reihe].cells[1].innerHTML,
            pause: document.getElementById("pauseTable").rows[reihe].cells[2].innerHTML,
            start: document.getElementById("pauseTable").rows[reihe].cells[3].innerHTML,
            ende: document.getElementById("pauseTable").rows[reihe].cells[4].innerHTML
        })
      };

      handleClickOpenDelete = (event) => {
        //Wenn der Dialog zum Löschen aufgerufen wird, wird diesem die entsprechenden Daten aus der Zeile ausgelesen
          let reihe = Number(event.target.parentNode.id)
         reihe += 1
         let id = document.getElementById("pauseTable").rows[reihe].cells[0].innerHTML
    this.setState({
      openDelete: !this.state.open,
        deleteId: id
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

    DeletePause = (event) => {
        //Abwesenheitbuchung wird gelöscht
        console.log(this.state.deleteId)
        SystemAPI.getAPI().deletePauseTransaction(this.state.deleteId).then((result) => {this.setState({
          openDelete: false
      });
            this.props.handleUpdate()
        })
    }

    UpdatePause = () => {
        //Update Abwesenheitsbuchung


        const start = String(this.state.start)
        const ende = String(this.state.ende)
        SystemAPI.getAPI().updatePauseTransactionWithValues(this.state.transaktionsid, this.state.intervalid,  this.state.pause, start, ende).then(pause => {
            this.setState({
                openEdit: false
            });
            this.props.handleUpdate()
        })

        //////});
          //  window.location.reload(false);
       // })
    }

    handleChange = (event) => {
        //Updatet das geänderte Objekt
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    render() {
        //Rendert die Komponente
        if (this.props.data.length > 0) {
            //Prüft ob Daten vorhanden sind
            const headers = Object.keys(this.props.data[0]);
            const headers2 = ["Transaktions ID", "Interval ID", "Abwesenheitsbeschreibung", "Start Zeitpunkt", "End Zeitpunkt"];
            const { openEdit, openDelete } = this.state;

                return (
                    <Paper >
                        <Typography variant="h4" color="inherit">
                            {this.props.title}
                        </Typography>

                        <hr/>

                        <Table id={"pauseTable"}>
                            <TableHead>
                                <TableRow>
                                    {headers2.map(header2 => (
                                        <TableCell align="left">{header2.toUpperCase()}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.data.map((emp, index) => (
                                    <TableRow id={index} key={index}>
                                        {headers.map(header => (
                                            <TableCell align="left">{emp[header]}</TableCell>
                                        ))}
                                        <Button color='primary' onClick={this.handleClickOpenEdit} >Edit</Button>
                                        <Button color='warning' onClick={this.handleClickOpenDelete} >Delete</Button>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Dialog open={openEdit} onClose={this.handleCloseEdit}>
                    <DialogTitle>Aktualisiere deine Buchung</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bearbeite deine Abwesenheitsbuchungen:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="transaktionsID"
                            label="Transaktions ID"
                            inputProps={{readOnly: true}}
                            defaultValue={this.state.transaktionsid}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            editable = "false"
                            inputProps={{readOnly: true}}
                            margin="dense"
                            id="intervalID"
                            label="Interval ID"
                            value ={this.state.intervalid}
                            fullWidth
                            variant="standard"

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id = "pause"
                            label="Pausen beschreibung"
                            defaultValue={this.state.pause}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Start Zeitpunkt"
                            id="start"
                            type="datetime-local"
                            defaultValue={this.state.start}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="End Zeitpunkt"
                            id = "ende"
                            type="datetime-local"
                            defaultValue={this.state.ende}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEdit}>Cancel</Button>
                            <Button onClick={this.UpdatePause}>Update</Button>
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
                            <Button onClick={this.DeletePause}>Löschen</Button>
                        </DialogActions>
                </Dialog>
                    </Paper>
                );


                PauseTable.defaultProps = {
                    title: "No Title"
                };

        } else {

            return (

                <h1> No Pause Data</h1>
            )
        }
    }
}
export default PauseTable;
