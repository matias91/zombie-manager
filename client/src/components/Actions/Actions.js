// @Vendors
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// @Components
import AddZombieModal from '../Modals/AddZombieModal/AddZombieModal';
import MoveZombieModal from '../Modals/MoveZombieModal/MoveZombieModal';

// @Actions
import ZombieActions from '../../redux/ZombieRedux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

function Actions({ selectedList, zombieAdd, zombieUpdate, zombieRemove }) {
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [moveModalOpen, setMoveModalOpen] = React.useState(false);
  const classes = useStyles();

  const toggleAddModal = () => {
    setAddModalOpen(!addModalOpen);
  }

  const toggleMoveModal = () => {
    setMoveModalOpen(!moveModalOpen);
  }

  const removeZombie = () => {
    selectedList.forEach(item => zombieRemove(Number(item)));
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Actions
      </Typography>

      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={toggleAddModal}>Add Zombie</Button>
        <Button disabled={!selectedList.length} onClick={toggleMoveModal}>Move Zombie</Button>
        <Button disabled={!selectedList.length} onClick={removeZombie}>Remove Zombie</Button>
      </ButtonGroup>

      <AddZombieModal action={zombieAdd} open={addModalOpen} toggle={toggleAddModal} />
      <MoveZombieModal action={zombieUpdate} selectedList={selectedList} open={moveModalOpen} toggle={toggleMoveModal} />
    </div>
  );
}

const mapStateToProps = ({ zombie }) => {
  return {
    selectedList: zombie.selectedList
  };
};

const mapDispatchToProps = {
  zombieAdd: ZombieActions.zombieAddRequest,
  zombieUpdate: ZombieActions.zombieUpdateRequest,
  zombieRemove: ZombieActions.zombieRemoveRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
