import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container} from "@material-ui/core";
import {withRouter} from "react-router";
import Logo from "../../assets/logo.jpg"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1
    },
    button: {
        marginRight: theme.spacing(4),
    }
}));

const Navbar = ({ history }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <AppBar position="relative">
                <Container>
                    <Toolbar>
                        <img src={Logo} width={30} height={30} style={{ marginRight: 15 }}></img>
                        <Typography variant="h6" className={classes.title}>
                            Vetfind
                        </Typography>
                        <Button color="inherit" className={classes.button} onClick={() => history.push("/")}>Главная</Button>
                        <Button color="inherit" onClick={() => history.push("/organizations")}>Организации</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
};

export default withRouter(Navbar);