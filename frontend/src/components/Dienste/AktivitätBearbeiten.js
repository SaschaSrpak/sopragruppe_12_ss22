import React, { Component } from 'react';
import Error from '../Zwischenelemente/Error';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import SystemAPI from '../../api/SystemAPI';
import AktivitätBO from '../../api/AktivitätBO';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import {calculateNewValue} from "@testing-library/user-event/dist/utils";


/** 
 *@fileOverview 
 *@author
*/



export class AktivitätBearbeiten extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity_name: "",
            man_day_capacity: "",
            persons_responsible: [],
            openEditActivity: false,
            values: [],
            names: ["kim", "liam", "jeff"],
            personresponsibleforactivity: [],
            inputVal: this.props.activitymanday
        }

    }


 componentDidMount() {
        console.log(this.props.persons)

    }

// Soll den Dialog schließen mit Abbrechen button why is this not working?
    handleCloseClick = () => {
        this.props.handleClose();
    }

// Erlaubt das befüllen der Textfelder
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.id]: event.target.value,
        })
    }



    handleToggle = (item) => {

              // only add if the item doesn't exist in the list
        console.log(item)
        let liste = this.state.personresponsibleforactivity
        console.log(liste)
      if(liste.includes(item)){
          console.log("If TRUE")

          let liste = this.state.personresponsibleforactivity
             let index = liste.findIndex(e => e === item)
            console.log(index)
          liste.splice(index, 1)
        this.setState(() => ({
          personresponsibleforactivity: liste
        }))

      }else{
                console.log("IF FALSE")
              this.setState({ personresponsibleforactivity: [...this.state.personresponsibleforactivity, item] })
          console.log(this.state.personresponsibleforactivity)
          }


    }
    onChangeManday = (e) => {
    this.setState({ manday: e.target.value });
  }
    onChangeName = (e) => {
    this.setState({ name: e.target.value });
  }

     updateActivity = () => {
         let newActivity = new AktivitätBO();
        newActivity.setPersons_Responsible(this.state.personresponsibleforactivity)
         newActivity.setId(this.props.activityid)
         newActivity.setActivity_name(this.state.name)
         newActivity.setMan_day_capacity(this.state.manday)
         newActivity.setLastModifiedDate(' ')
         console.log(newActivity)
         SystemAPI.getAPI().updateActivity(newActivity).then(response => {
             console.log(response)
             this.props.handleUpdate(response);
         })

     }

    render() {

        const {activity_name, man_day_capacity, persons_responsible} = this.state;
        const {values} = this.state;
        const {checked} = this.state;


            return (
                <div>
                    <DialogTitle>Aktivität bearbeiten</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Füllen Sie bitte das folgende Formular aus, um eine Aktivität zu bearbeiten.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id= "id"
                            label= "Aktivität Name"
                            type="text"
                            fullWidth
                            variant="standard"

                            onChange={this.onChangeName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="man_day_capacity"
                            label="Kapazität in Personentagen"

                            type="number"
                            fullWidth
                            variant="standard"

                            onChange={this.onChangeManday}
                        />

                        <DialogContentText sx={{top:10}}>
                            Wählen Sie Personen die für diese Aktivität zuständig sind aus
                         </DialogContentText>
                       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {this.props.persons?this.props.persons.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem
            key={value.id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">

              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined}   dense>
              <ListItemIcon>
                <Checkbox
                    onClick={() => this.handleToggle(value.id)}
                  edge="start"
                  //checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.id}  - ${value.surname} ${value.name}`} />
            </ListItemButton>
          </ListItem>
        );
      }):null}
    </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseClick}>Abbrechen</Button>
                        <Button onClick={this.updateActivity}>Speichern</Button>
                    </DialogActions>
                </div>
            )

    }
}
