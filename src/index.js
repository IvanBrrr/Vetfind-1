import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducer';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange, purple } from '@material-ui/core/colors';

const store = createStore(reducer, applyMiddleware(ReduxThunk))
const theme = createMuiTheme({
    palette: {
      primary: orange,
    },
  });

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
        <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
