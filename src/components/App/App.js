import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "../../pages/Home/Home";
import Navbar from "../Navbar/Navbar";
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container} from "@material-ui/core";
import Organizations from "../../pages/Organizations/Organizations";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import Organization from "../../pages/Organization/Organization";

const App = () => {
    return (
        <>
            <CssBaseline/>
            <Router>
                <Navbar/>
                <ErrorNotification />
                <Switch>
                    <Route path="/"
                           render={() => {
                               return <Home/>
                           }}
                           exact/>
                    <Route path='/organizations' component={Organizations} />
                    <Route path='/organization/:id'
                           render={({ match }) => {
                               const { id } = match.params;
                               return <Organization id={id} />
                           }}/>
                    <Route render={() => <h2>Page not found</h2>}/>
                </Switch>
            </Router>
        </>
    )
};

export default App;