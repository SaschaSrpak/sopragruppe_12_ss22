import React, { Component } from "react";
import { Toolbar } from '@mui/material';

/** 
 *@fileOverview Alle Daten des Projekts sind Sichtbar, wenn der User eingeloggt ist. Aktivities der Projekte werden angezeigt.
 *@author 
*/

/**
 * Popup einer Aktivität über Dialog Komponente aus Material-UI: https://mui.com/material-ui/react-dialog/
 */


export class Buchung extends Component {
    render() {
        return (
            
            <div>
                <Toolbar/>
                <h1>Buchungen</h1>
            </div>
        );
    }
}

export default Buchung;