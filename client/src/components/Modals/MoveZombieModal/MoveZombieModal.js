// @Vendors
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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

export default function MoveZombieModal({ action, selectedList, open, toggle }) {
  const [location, setLocation] = React.useState('');
  const classes = useStyles();

  const toggleMoveModal = () => {
    setLocation('');
    toggle();
  }

  const moveZombie = () => {
    selectedList.forEach(item => action(Number(item), { location }));
  }

  return (
    <CustomModal
      open={open}
      onClose={toggleMoveModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <h2 id="simple-modal-title">Move zombie</h2>
      <p id="simple-modal-description">
        Pick a new location
      </p>
      <div className={classes.form}>
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
          <Button disabled={!location} onClick={moveZombie} variant="contained" color="secondary">Save</Button>
        </FormControl>
      </div>
    </CustomModal>
  );
}
