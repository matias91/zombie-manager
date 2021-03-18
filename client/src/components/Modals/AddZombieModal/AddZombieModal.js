// @Vendors
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// @Commons
import CustomModal from '../../Commons/CustomModal/CustomModal';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function AddZombieModal({ action, open, toggle }) {
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const classes = useStyles();

  const toggleAddModal = () => {
    setName('');
    setLocation('');
    toggle();
  }

  const addNewZombie = () => {
    action(name, location);
  }

  return (
    <CustomModal
      open={open}
      onClose={toggleAddModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <h2 id="simple-modal-title">Add new zombie</h2>
      <p id="simple-modal-description">
        Set data
      </p>
      <div className={classes.form}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField id="zombie-name" label="Name" variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="zombie-location-label">Location</InputLabel>
          <Select
            labelId="zombie-location-label"
            id="zombie-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            label="Location"
          >
            <MenuItem value={'hospital'}>Hospital</MenuItem>
            <MenuItem value={'school'}>School</MenuItem>
            <MenuItem value={'warehouse'}>Warehouse</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button disabled={!name || !location} onClick={addNewZombie} variant="contained" color="secondary">Add Zombie</Button>
        </FormControl>
      </div>
    </CustomModal>
  );
}
