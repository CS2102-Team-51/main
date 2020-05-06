import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {FormControlLabel} from '@material-ui/core';
// import ScheduleSelector from 'react-schedule-selector';

import * as apiRoute from '../Api/route.js';
import Axios from 'axios';

export default class RiderRegisterForm extends Component {
  constructor () {
    super ();
    this.state = {
      //schedule: [],
      setOpen: false,
      name: '',
      username: '',
      password: '',
      type: '',
    };

    //this._handleChange = this._handleChange.bind(this);
    this._handleClickOpen = this._handleClickOpen.bind (this);
    this._handleClose = this._handleClose.bind (this);
    this._handleRegister = this._handleRegister.bind (this);
    this._handleSubmit = this._handleSubmit.bind (this);
  }

  // _handleChange = newSchedule => {
  //     this.setState({ schedule: newSchedule })
  // }

  _handleClickOpen = () => {
    this.setState ({setOpen: true});
  };

  _handleClose = () => {
    this.setState ({setOpen: false});
  };

  _handleSubmit = () => {
    // Send POST req using FETCH API
  };

  _handleRegister = () => {
    let user = {
      rname: this.state.name,
      rusername: this.state.username,
      rpassword: this.state.password,
      type: this.state.type,
    };
    Axios.post (apiRoute.RIDER_API, user, {
      withCredentials: false,
    })
      .then (response => {
        console.log (response);
        this.setState ({
          setOpen: false,
          name: '',
          username: '',
          password: '',
          type: '',
        });
      })
      .catch (error => {
        console.log (error);
      });
  };

  updateName (event) {
    this.setState ({
      name: event.target.value,
    });
  }

  updateUsername (event) {
    this.setState ({
      username: event.target.value,
    });
  }

  updatePassword (event) {
    this.setState ({
      password: event.target.value,
    });
  }

  updateType (event) {
    console.log ('This is my type: ', event.target.value);
    this.setState ({
      type: event.target.value,
    });
  }

  render () {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this._handleClickOpen}
        >
          Register (Rider)
        </Button>
        <Dialog
          open={this.state.setOpen}
          onClose={this._handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="xl"
        >
          <DialogTitle id="form-dialog-title">
            Register as a rider for tapao!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You're one step away from bringing happiness (and food) to thousands of others!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              value={this.state.name}
              onChange={e => this.updateName (e)}
              id="fullname"
              label="Full Name"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              value={this.state.username}
              onChange={e => this.updateUsername (e)}
              id="username"
              label="Username"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              value={this.state.password}
              onChange={e => this.updatePassword (e)}
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              fullWidth
            />
            <RadioGroup
              row
              value={this.state.type}
              onChange={e => this.updateType (e)}
            >
              <FormControlLabel
                value="full_time"
                control={<Radio required />}
                label="Full Time"
              />
              <FormControlLabel
                value="part_time"
                control={<Radio />}
                label="Part Time"
              />
            </RadioGroup>

            {/*{ <ScheduleSelector
                    selection={this.state.schedule}
                    startDate={new Date('2020-03-22T00:00:00')} // Start on Sunday
                    dateFormat = {'ddd'}
                    numDays={7}
                    minTime={10}
                    maxTime={22}
                    selectionScheme={'linear'}
                    onChange={this._handleChange}
                    margin={2}
                /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              onClick={this._handleRegister}
            >
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
