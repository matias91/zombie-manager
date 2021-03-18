// @Vendors
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// @Actions
import ZombieActions from '../../redux/ZombieRedux';

// @Images
import Hospital from '../../assets/images/hospital.jpeg';
import School from '../../assets/images/school.jpeg';
import Warehouse from '../../assets/images/warehouse.jpeg';


const useStyles = makeStyles({
  root: {
    width: 345,
    marginLeft: 10,
    marginRight: 10
  },
  media: {
    height: 140,
  },
});

function LocationsSummary({ zombieGetSummary, hospitalAmount, warehouseAmount, schoolAmount }) {
  const classes = useStyles();

  React.useEffect(() => {
    zombieGetSummary();
  }, [zombieGetSummary]);

  return (
    <section>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Locations Summary
      </Typography>

      <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={Hospital}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Hospital
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Count: {hospitalAmount}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={School}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              School
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Count: {schoolAmount}
            </Typography>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={Warehouse}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Warehouse
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Count: {warehouseAmount}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

const mapStateToProps = ({ zombie }) => {
  return {
    hospitalAmount: zombie.hospitalAmount,
    warehouseAmount: zombie.warehouseAmount,
    schoolAmount: zombie.schoolAmount
  };
};

const mapDispatchToProps = {
  zombieGetSummary: ZombieActions.zombieGetSummaryRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsSummary);
