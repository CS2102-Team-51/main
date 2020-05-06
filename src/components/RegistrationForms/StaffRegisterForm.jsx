import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as apiRoute from '../Api/route.js';
import Axios from 'axios';

export default class StaffRegisterForm extends Component {
  constructor () {
    super ();
    this.state = {
      setOpen: false,
      name: '',
      position: '',
      username: '',
      password: '',
    };

    this._handleClickOpen = this._handleClickOpen.bind (this);
    this._handleClose = this._handleClose.bind (this);
    this._handleRegister = this._handleRegister.bind (this);
  }

  _handleClickOpen = () => {
    this.setState ({setOpen: true});
  };

  _handleClose = () => {
    this.setState ({setOpen: false});
  };

  _handleRegister = () => {
    this.setState ({setOpen: false});
  };

  //Need to take in restaurant as props in order to work!
  _handleRegister = () => {
    let staff = {
      rsname: this.state.name,
      rsusername: this.state.username,
      rspassword: this.state.password,
      rsposition: this.state.position,
      rid: this.props.restaurantId,
    };
    Axios.post (apiRoute.STAFF_API, staff, {
      withCredentials: false,
    })
      .then (response => {
        console.log (response);
      })
      .catch (error => {
        console.log (error);
      });
    this.setState ({setOpen: false});
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

  updatePosition (event) {
    this.setState ({
      position: event.target.value,
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
          Register (Staff)
        </Button>
        <Dialog
          open={this.state.setOpen}
          onClose={this._handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Register as a tapao-er!
          </DialogTitle>
          <form
            action="/"
            method="POST"
            onSubmit={e => {
              e.preventDefault ();
              alert ('Registered Successfully!');
              this.setState ({setOpen: false});
            }}
          >
            <DialogContent>
              <DialogContentText>
                You're one step away from selling your food to thousands of people!
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
                value={this.state.position}
                onChange={e => this.updatePosition (e)}
                id="position"
                label="Position"
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
            </DialogContent>
            <DialogActions>
              <Button onClick={this._handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this._handleRegister} color="primary">
                Register
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}
