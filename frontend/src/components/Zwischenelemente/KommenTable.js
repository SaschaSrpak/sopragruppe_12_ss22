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
            open: false
        }
    }
     handleClickOpen = (event) => {
        let reihe = Number(event.target.parentNode.id)
         reihe += 1

        console.log(document.getElementById("kommenTable").rows[reihe].cells[2].innerHTML)
        this.setState({
          open: !this.state.open,
            id: document.getElementById("kommenTable").rows[reihe].cells[2].innerHTML
        })
      };

    handleClose = () => {
        this.setState({
          open: false
      });
    };

    render() {
        if (this.props.data.length > 0) {
            const headers = Object.keys(this.props.data[0]);
            const headers2 = ["Event Name", "Zeitpunkt", "ID", "Letzt Änderung"];
            const { open } = this.state;

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
                                        <Button color='primary' onClick={this.handleClickOpen} >Edit</Button>
                                        <Button color='warning'>Delete</Button>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle>Aktualisiere deine Buchung</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bearbeite deine Buchungen:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="User"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={this.state.id}
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Startzeitpunkt"
                            type="datetime-local"
                            defaultValue="2022-07-04T12:00"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Endzeitpunkt"
                            type="datetime-local"
                            defaultValue="2022-07-04T12:00"
                            fullWidth
                            variant="standard"
                            onChange={this.handleChange}
                        />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button onClick={this.handleClose}>Update</Button>
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





