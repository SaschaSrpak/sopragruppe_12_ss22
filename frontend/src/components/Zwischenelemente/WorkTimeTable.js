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
import KommenBO from "../../api/Ereignisse/KommenBO";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";



export class  WorkTimeTable extends Component{
    constructor(props)
    {
        super(props);

        this.state = {
            openedit: false,
            opendelete: false,
            arbeitszeit: KommenBO
        }
    }
     handleClickOpenEdit = (event) => {
        let reihe = Number(event.target.parentNode.id)
         reihe += 1

        this.setState({
          openEdit: !this.state.open,
            intervalid: document.getElementById("WorkTimeTable").rows[reihe].cells[0].innerHTML,
            transaktionsid: document.getElementById("WorkTimeTable").rows[reihe].cells[1].innerHTML,
            intervalname: document.getElementById("WorkTimeTable").rows[reihe].cells[2].innerHTML,
            project: document.getElementById("WorkTimeTable").rows[reihe].cells[3].innerHTML,
            activity: document.getElementById("WorkTimeTable").rows[reihe].cells[4].innerHTML,
            start: document.getElementById("WorkTimeTable").rows[reihe].cells[5].innerHTML,
            ende: document.getElementById("WorkTimeTable").rows[reihe].cells[6].innerHTML
        })
      };

      handleClickOpenDelete = (event) => {
          let reihe = Number(event.target.parentNode.id)
         reihe += 1
         let id = document.getElementById("WorkTimeTable").rows[reihe].cells[1].innerHTML
    this.setState({
      openDelete: !this.state.open,
        deleteId: id
    })
  };
    handleCloseEdit = () => {
        this.setState({
          openEdit: false
      });
    };

    handleCloseDelete= () => {
        this.setState({
          openDelete: false
      });
    };

    DeleteWorktime = (event) => {
        console.log(this.state.deleteId)
        SystemAPI.getAPI().deleteProjectWorktimeTransaction(this.state.deleteId).then((result) => {this.setState({
          openDelete: false
      });
            window.location.reload(false);
        })
    }

    UpdateWorktime = () => {

        console.log(this.state.transaktionsid,this.state.intervalid,this.state.intervalname,this.state.start,this.state.ende)
        SystemAPI.getAPI().updateProjectWorktimeTransactionWithValues(this.state.transaktionsid,this.state.intervalid,this.state.intervalname,this.state.start,this.state.ende).then(person => {
            this.setState({
            })})
        //////});
            window.location.reload(false)
       // })transaction_id, interval_id, interval_name, start_time, end_time
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        })
    }
    render() {
        if (this.props.data.length > 0) {
            const headers = Object.keys(this.props.data[0]);
            const headers2 = ["I-ID",  "T-ID", "Interval Name", "Projekt", "Aktivität", "Start", "Ende", "Stunden"];
            const { openEdit, openDelete } = this.state;

                return (
                    <Paper>
                        <Typography variant="h4" color="inherit">
                            {this.props.title}
                        </Typography>

                        <hr/>

                        <Table id={"WorkTimeTable"}>
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
                            Bearbeite deine Arbeitszeitbuchungen:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="intervalID"
                            inputProps={{readOnly: true}}
                            label={"Interval ID"}
                            defaultValue={this.state.intervalid}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            editable = "false"
                            inputProps={{readOnly: true}}
                            margin="dense"
                            id="transaktionsID"
                            label={"Transaktions ID"}
                            value ={this.state.transaktionsid}
                            fullWidth
                            variant="standard"

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id = "intervalname"
                            label="Interval Name"
                            defaultValue={this.state.intervalname}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Projekt"
                            inputProps={{readOnly: true}}
                            defaultValue={this.state.project}
                            fullWidth
                            variant="standard"

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Aktivität"
                            inputProps={{readOnly: true}}
                            defaultValue={this.state.activity}
                            fullWidth
                            variant="standard"

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Start"
                            id = "start"
                            type="datetime-local"
                            defaultValue={this.state.start}
                            onChange={this.handleChange}
                            fullWidth
                            variant="standard"

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id = "ende"
                            label="Ende"
                            type="datetime-local"
                            defaultValue={this.state.ende}
                            onChange={this.handleChange}
                            fullWidth
                            variant="standard"

                        />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEdit}>Cancel</Button>
                            <Button onClick={this.UpdateWorktime}>Update</Button>
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
                            <Button onClick={this.DeleteWorktime}>Löschen</Button>
                        </DialogActions>
                </Dialog>
                    </Paper>
                );


                WorkTimeTable.defaultProps = {
                    title: "No Title"
                };

        } else {

            return (

                <h1> No Worktime Data</h1>
            )
        }
    }
}
export default WorkTimeTable;