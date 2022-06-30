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



export class  KommenTable extends Component{
    constructor(props)
    {
        super(props);

        this.state = {
            openedit: false,
            opendelete: false
        }
    }
     handleClickOpenEdit = (event) => {
        let reihe = Number(event.target.parentNode.id)
         reihe += 1

        console.log(document.getElementById("kommenTable").rows[reihe].cells[0].innerHTML)
         console.log(document.getElementById("kommenTable").rows[reihe].cells[1].innerHTML)
         console.log(document.getElementById("kommenTable").rows[reihe].cells[2].innerHTML)
         console.log(document.getElementById("kommenTable").rows[reihe].cells[3].innerHTML)
        this.setState({
          openEdit: !this.state.open,
            id: document.getElementById("kommenTable").rows[reihe].cells[2].innerHTML,
            lastchange: document.getElementById("kommenTable").rows[reihe].cells[3].innerHTML,
            eventname: document.getElementById("kommenTable").rows[reihe].cells[0].innerHTML,
            timeofevent: document.getElementById("kommenTable").rows[reihe].cells[1].innerHTML
        })
      };

      handleClickOpenDelete = (event) => {
          let reihe = Number(event.target.parentNode.id)
         reihe += 1
         let id = document.getElementById("kommenTable").rows[reihe].cells[2].innerHTML
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

    DeleteKommen = (event) => {
        console.log(this.state.deleteId)
        SystemAPI.getAPI().deleteKommen('10013').then((result) => {})
    }

    render() {
        if (this.props.data.length > 0) {
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
                            Bearbeite deine Kommenbuchungen:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={"Event Name"}
                            defaultValue={this.state.eventname}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            editable = "false"
                            inputProps={{readOnly: true}}
                            margin="dense"
                            id="name"
                            label={"Event ID"}
                            value ={this.state.id}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Zeitpunkt des Events"
                            type="datetime-local"
                            defaultValue={this.state.timeofevent}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Letzte Änderung"
                            type="datetime-local"
                            inputProps={{readOnly: true}}
                            defaultValue={this.state.lastchange}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEdit}>Cancel</Button>
                            <Button onClick={this.handleCloseEdit}>Update</Button>
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





