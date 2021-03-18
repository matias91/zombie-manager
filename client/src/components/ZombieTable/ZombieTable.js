// @Vendors
import React from 'react';
import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';

// @Actions
import ZombieActions from '../../redux/ZombieRedux';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Name',
    sortable: false,
    width: 160
  },
  { field: 'location', headerName: 'Location', width: 130 },
];

function ZombieTable({ zombieData, zombieGetAll, zombieSetSelected }) {
  React.useEffect(() => {
    zombieGetAll();
  }, [zombieGetAll]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Zombie List
      </Typography>

      <DataGrid
        rows={zombieData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          zombieSetSelected(newSelection.selectionModel);
        }}
      />
    </div>
  );
}

const mapStateToProps = ({ zombie }) => {
  return {
    zombieData: zombie.data
  };
};

const mapDispatchToProps = {
  zombieGetAll: ZombieActions.zombieGetAllRequest,
  zombieSetSelected: ZombieActions.zombieSetSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(ZombieTable);
