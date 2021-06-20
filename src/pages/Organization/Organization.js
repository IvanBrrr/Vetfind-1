import React, {useEffect} from 'react';
import {getOrganization} from "../../actions";
import {connect} from "react-redux";
import {CircularProgress, Container, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {Phone} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 30,
        marginBottom: 30
    },
    paper: {
        padding: 50
    }
}));

const Organization = ({ id, getOrganization }) => {
    const classes = useStyles();
    const [organization, setOrganization] = React.useState(null)

    useEffect(() => {
        getOrganization(id, (organization) => {
            setOrganization(organization)
        })
    }, [id])

    const showLoading = () => (
        <>
            <CircularProgress/>
        </>
    )

    const showMap = () => {
        const latitude = organization[0].company.geo.split(",")[0]
        const longitude = organization[0].company.geo.split(",")[1]

        return (
            <YMaps>
                    <Map defaultState={{ center: [latitude, longitude], zoom: 17 }} width="100%" height={400}>
                        <Placemark defaultGeometry={[latitude, longitude]} />
                    </Map>
            </YMaps>
        )
    }

    const showProducts = (products) => (
        <List>
            {
                products.map((item) => (
                    <ListItem button alignItems='flex-start' style={{display: 'flex', flexDirection: 'column'}}
                              divider>
                        <Typography variant="h6">
                            {item.product.name}
                        </Typography>
                        <Typography variant="subtitle1" style={{ color: "gray" }}>
                            {item.price} руб.
                        </Typography>
                        <Typography variant="subtitle1">
                            Брэнд: {item.product.brand.name}
                        </Typography>
                        <Typography variant="subtitle1">
                            Количество: {item.count}
                        </Typography>
                        <Typography variant="subtitle1">
                            Масса: {item.product.bulk}
                        </Typography>
                        <Typography variant="subtitle1">
                            Расстояние: {item.distance}
                        </Typography>
                    </ListItem>
                ))
            }
        </List>
    )

    return (
        <Container className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                {
                    organization !== null ? (
                        <>
                            <Typography variant={"h5"}>{organization[0].company.name}</Typography>
                            <Typography variant={"h6"} style={{color: "gray"}}>{organization[0].company.address}</Typography>
                            <Typography variant={"h6"}>{organization[0].company.phone}</Typography>
                            <br />
                            <Divider />
                            <br />
                            {showMap()}
                            <br />
                            <Divider />
                            <br />
                            <Typography variant={"h6"}>Продукты</Typography>
                            {showProducts(organization)}
                        </>
                    ) : showLoading()
                }
            </Paper>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, {getOrganization})(Organization);