import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import AktivitaetBO from ".../api/AktivitaetBO";

/** 
 *@fileOverview Infos zu Aktivitäten werden angezeigt --> Wird in Projektanzeige angezeigt
 *@author Sascha Srpak
*/


// user auslagern, darin werden User gemapt aus der Datenbank, die zu einer Aktivität gehören
function createData(name, dauer, kapazität) {
    return {
        name,
        dauer,
        kapazität,
        user: [
            {
                customerId: "User 1",
                soll: 100,
                ist: 70
        },
        {
            customerId: "User 2",
            soll: 100,
            ist: 80
        }
    ]
};
}

// Testdaten für Aktivitäten
const rows = [
    createData("Aktivität 1", 200, 150),
    createData("Aktivität 2", 200, 150),
    createData("Aktivität 3", 200, 150),
    createData("Aktivität 4", 200, 150),
    createData("Aktivität 5", 200, 150)
];

/**
 * User rausziehen, über .map soll Userliste aus Datenbank geladen werden
 */

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton 
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.dauer}</TableCell>
                <TableCell align="right">{row.kapazität}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Userliste zu {row.name}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell align="right">Soll-Zeit</TableCell>
                                        <TableCell align="right">Ist-Zeit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.user.map((userRow) => (
                                        <TableRow>
                                            <TableCell>{userRow.customerId}</TableCell>
                                            <TableCell align="right">{userRow.soll}</TableCell>
                                            <TableCell align="right">{userRow.ist}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// --> User evtl raus in eigene Komponente
Row.propTypes = {
    row: PropTypes.shape({
        dauer: PropTypes.number.isRequired,
        kapazität: PropTypes.number.isRequired,
        user: PropTypes.arrayOf(
            PropTypes.shape({
                userId: PropTypes.string.isRequired,
                soll: PropTypes.number.isRequired,
                ist: PropTypes.number.isRequired
            })
        ).isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};


// Aktivitätsanzeige
export class AktivitätAnzeige extends React.Component {

    // Constructor für die Aktivitätenanzeige
    constructor(props) {
        super(props);
        this.state = {
            activity_name: null,
            persons_responsible: [],
            man_day_capacity: null,
        };
    }


    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Aktivität</TableCell>
                            <TableCell align="right">Dauer</TableCell>
                            <TableCell align="right">Kapazität</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default AktivitätAnzeige;