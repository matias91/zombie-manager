// @Vendors
import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// @Components
import Actions from './components/Actions/Actions'
import LocationsSummary from './components/LocationsSummary/LocationsSummary'
import ZombieTable from './components/ZombieTable/ZombieTable'

// @Styles
import './App.css';

// @Store
import createStore from './redux';
const store = createStore();

const useStyles = makeStyles(_ => ({
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Zombie Manager
            </Typography>
          </Toolbar>
        </AppBar>

        <main style={{ marginLeft: 30, marginRight: 30 }}>
          <div style={{ marginTop: 50 }}>
            <LocationsSummary />
          </div>

          <div style={{ marginTop: 50 }}>
            <Actions />
          </div>

          <div style={{ marginTop: 50 }}>
            <ZombieTable />
          </div>
        </main>
      </div>
    </Provider>
  );
}

export default App;
