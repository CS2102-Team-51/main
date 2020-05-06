import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as apiRoute from '../Api/route.js';
import Axios from 'axios';
import {DialogContentText} from '@material-ui/core';

import './LoginModal.css';

class LoginModal extends Component {
  constructor (props) {
    super (props);
    this.state = {
      setOpen: false,
      showInvalidCredentialsWarning: false,
    };

    //this._handleChange = this._handleChange.bind(this);
    this._handleClickOpen = this._handleClickOpen.bind (this);
    this._handleClose = this._handleClose.bind (this);
    this._handleSubmit = this._handleSubmit.bind (this);
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

  _handleClickOpen = () => {
    this.setState ({
      setOpen: true,
      showInvalidCredentialsWarning: false,
    });
  };

  _handleClose = () => {
    this.setState ({
      setOpen: false,
      showInvalidCredentialsWarning: false,
    });
  };

  handleLogin (route, user) {
    Axios.post (route, user, {
      withCredentials: false,
    })
      .then (response => {
        console.log (response.data);
        console.log (response.data.mid);
        let id;
        let route;
        if (this.state.title === 'Customer') {
          console.log ('Did I even get in here?');
          id = response.data.cid;
          route = 'user';
        } else if (this.state.title === 'Manager') {
          console.log ('Did I even get in here?');
          id = response.data.mid;
          route = 'manager';
        } else if (this.state.title === 'Staff') {
          id = response.data.rsid;
          route = 'staff';
        } else if (this.state.title === 'Rider') {
          id = response.data.rid;
          route = 'rider';
        }
        // 1. Set states for id, auth and close dialog
        // 2. Push history (set states first before pushing history:
        // https://stackoverflow.com/a/57572888)
        if ((id || id === 0) && route) {
          this.props.authenticate ();
          this.setState ({setOpen: false});
          this.handleLink (route, id);
        } else {
          console.log (this.state.title + ' credentials not recognized!');
          this.showInvalidCredentials ();
        }
      })
      .catch (error => {
        console.log (error);
      });
  }

  _handleSubmit = () => {
    let user = {
      username: this.state.username,
      password: this.state.password,
    };

    // Debugging : print user login details

    if (this.state.title === 'Customer') {
      this.handleLogin (apiRoute.LOGIN_API, user);
    } else if (this.state.title === 'Rider') {
      this.handleLogin (apiRoute.LOGIN_API + '/rider', user);
    } else if (this.state.title === 'Staff') {
      this.handleLogin (apiRoute.LOGIN_API + '/staff', user);
    } else if (this.state.title === 'Manager') {
      this.handleLogin (apiRoute.LOGIN_API + '/manager', user);
    }
  };

  showInvalidCredentials () {
    this.setState ({showInvalidCredentialsWarning: true});
  }

  handleLink (reroute, id) {
    this.props.history.push ({
      pathname: `/${reroute}/` + id,
    });
  }

  render () {
    return (
      <div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState ({setOpen: true, title: 'Customer'})}
          >
            Customer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState ({setOpen: true, title: 'Rider'})}
          >
            Delivery Rider
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState ({setOpen: true, title: 'Staff'})}
          >
            Restaurant Staff
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState ({setOpen: true, title: 'Manager'})}
          >
            FDS Manager
          </Button>
        </div>

        <Dialog
          open={this.state.setOpen}
          onClose={this._handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <p>{this.state.title} Login</p>
          </DialogTitle>
          {this.state.showInvalidCredentialsWarning &&
            <DialogContentText className="invalidWarning">
              Wrong username/password!
            </DialogContentText>}
          <DialogContent>
            <TextField
              margin="dense"
              value={this.state.username || ''}
              onChange={e => this.updateUsername (e)}
              id="username"
              label="Username"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              value={this.state.password || ''}
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
            <Button onClick={this._handleSubmit} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter (LoginModal);
