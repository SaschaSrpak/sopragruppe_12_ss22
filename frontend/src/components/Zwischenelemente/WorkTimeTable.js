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




function WorkTimeTable({ title, data}) {
    if (data.length > 0) {
        console.log(data)
        const headers = Object.keys(data[0]);
        const headers2 = ["Interval ID",  "Transaktions ID", "Interval Name", "Projekt", "Aktivitäten", "Start", "Ende"]


        return (
            <Paper>
                <Typography variant="h4" color="inherit">
                    {title}
                </Typography>

                <hr/>

                <Table>
                    <TableHead>
                        <TableRow>
                            {headers2.map(header2 => (
                                <TableCell align="left">{header2.toUpperCase()}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((emp, index) => (
                            <TableRow key={index}>
                                {headers.map(header => (
                                    <TableCell align="left">{emp[header]}</TableCell>
                                ))}
                                <Button color='primary'>Edit</Button>
                                <Button color='warning'>Delete</Button>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
export default WorkTimeTable;