/* import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import { Toolbar, Dropdown, Typography, Box, Drawer, List } from '@mui/material';
import ProfileDropDown from '../Dienste/Profildropdown';
import DrawerComponent from '../layout/DrawerComponent';
import Container from '@mui/material/Container';
import CustomPopup from "./components/CustomPopup";
import { useState } from "react";

/*
 *@fileOverview 
 *@author Luca Trautmann
*

class Profil extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            setVisibility: false,
        }
    }

    render() {

        const { user, visibility, setVisibility, } = this.props;

        popupCloseHandler = () => {
            this.setState({
                setVisibility: false,
            })
        };



        DropdownExampleSelection = () => {
            <Dropdown
                placeholder='Personenstatus wählen'
                fluid
                selection
                options={PersonenstatusOptions}
            />
        }

        PersonenstatusOptions = [
            {
                key: 'Projektmanager',
                text: 'Projektmanager',
                value: '1',
            },
            {
                key: 'Projektmitarbeiter',
                text: 'Projektmitarbeiter',
                value: '0',
            }]

        return (
            <div>
                <Toolbar />
                <CustomPopup
                    onClose={popupCloseHandler}
                    show={visibility}
                    title="Profildaten">

                    <label>Name
                        <input type="text" name="name" />
                    </label>

                    <label>Nachname
                        <input type="text" name="Nachname" />
                    </label>

                    <label>Username
                        <input type="text" name="Username" />
                    </label>

                    <label>E-Mail
                        <input type="text" name="E-Mail" />
                    </label>
                    <label> Personenstatus
                    </label>

                    <button>Speicher</button>

                </CustomPopup>
            </div>
        )
    }
}

export default Profil;

 */