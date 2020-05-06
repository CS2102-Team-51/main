import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadContainer from './upload/UploadContainer';
import ImageUploader from 'react-images-upload';

import * as apiRoute from '../Api/route.js';
import Axios from 'axios';

export default class AddRestaurant extends Component {
  constructor () {
    super ();
    this.state = {
      setOpen: false,
      name: '',
      address: '',
      minCost: '',
      image: '',
    };

    this.onDrop = this.onDrop.bind (this);
    this._handleClickOpen = this._handleClickOpen.bind (this);
    this._handleClose = this._handleClose.bind (this);
    this._handleSubmit = this._handleSubmit.bind (this);
  }

  _handleClickOpen = () => {
    this.setState ({setOpen: true});
  };

  _handleClose = () => {
    this.setState ({setOpen: false});
  };

  _handleSubmit = () => {
    let restaurant = {
      rname: this.state.name,
      raddress: this.state.address,
      rminCost: this.state.minCost,
      rimage: this.state.image,
    };
    Axios.post (apiRoute.GET_RESTAURANT_API, restaurant, {
      withCredentials: false,
    })
      .then (response => {
        console.log (response);
        this.setState ({
          setOpen: false,
          name: '',
          address: '',
          minCost: '',
          image: '',
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

  updateAddress (event) {
    this.setState ({
      address: event.target.value,
    });
  }

  updateMinCost (event) {
    this.setState ({
      minCost: event.target.value,
    });
  }

  updateImage (event) {
    this.setState ({
      image: event.target.value,
    });
  }

  onDrop (picture) {
    console.log (picture);
    const formData = new FormData ();
    formData.append ('image', picture);
    console.log ('This is my picture: ', formData);
    Axios.post ('http://localhost:5000/api/restaurantPhoto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    })
      .then (response => {
        console.log (response);
      })
      .catch (error => {
        console.log (error);
      });
    // this.setState ({
    //   pictures: this.state.pictures.concat (picture),
    // });
  }

  render () {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this._handleClickOpen}
        >
          Register (Customer)
        </Button>
        <Dialog
          open={this.state.setOpen}
          onClose={this._handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Register as a tapao-er!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You're one step away from enjoying the convenience of food right at your doorstep!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              value={this.state.name}
              onChange={e => this.updateName (e)}
              id="fullname"
              label="Restaurant Name"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              value={this.state.address}
              onChange={e => this.updateAddress (e)}
              id="username"
              label="Address"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              margin="dense"
              value={this.state.minCost}
              onChange={e => this.updateMinCost (e)}
              id="password"
              label="Password"
              type="number"
              min="0"
              variant="outlined"
              required
              fullWidth
            />
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              singleImage={true}
            />
            <UploadContainer />
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this._handleSubmit} color="primary">
              Add Restaurant
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
