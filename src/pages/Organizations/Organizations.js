import React, {useEffect} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
    Chip,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {getOrganizations as fetchOrganizations} from "../../actions"
import {withRouter} from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 30
    },
    formControl: {
        width: 300
    },
    paper: {
        padding: 50
    }
}));

const Organizations = ({
                           organizations = [],
                           fetchOrganizations,
                           history
                       }) => {
    const classes = useStyles();
    const [sortBy, setSortBy] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const sortParams = [
        {id: 2, name: "Удалённости", value: "distance"}
    ]

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setLatitude(coords.latitude)
            setLongitude(coords.longitude)
        })
        getOrganizations()
    }, [])

    const getOrganizations = (sort) => {
        setLoading(true)
        if (sort === 2) {
            fetchOrganizations(latitude, longitude, () => {
                setLoading(false)
            })
        } else {
            fetchOrganizations(null, null, () => {
                setLoading(false)
            })
        }
    }

    const getList = () => (
        <List className={classes.root}>
            {
                organizations.map((item) => (
                    <ListItem button alignItems='flex-start' style={{display: 'flex', flexDirection: 'column'}}
                              divider onClick={() => history.push(`/organization/${item.id}`)}>
                        <Typography variant="h6">
                            {item.name}
                        </Typography>
                    </ListItem>
                ))
            }
        </List>
    )

    const handleChangeSort = (event) => {
        setSortBy(event.target.value)
        getOrganizations(event.target.value)
    };

    const showLoading = () => (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <CircularProgress/>
        </>
    )

    return (
        <Container className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">Сортировка по</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={sortBy}
                        onChange={handleChangeSort}
                    >
                        <MenuItem value={1}>
                            <em>Умолчанию</em>
                        </MenuItem>
                        {
                            sortParams.map((item) => (
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                {
                    loading ? showLoading() : getList()
                }
            </Paper>
        </Container>
    )
};

const mapStateToProps = (state) => {
    return {
        organizations: state.organizations
    }
}

export default withRouter(connect(mapStateToProps, {fetchOrganizations})(Organizations));