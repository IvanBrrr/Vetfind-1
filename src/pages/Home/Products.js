import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {connect} from "react-redux";
import {Chip, Divider, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 30
    },
    price: {
        color: 'gray'
    },
    opened: {
        marginTop: 10
    }
}));

const Products = ({products = []}) => {
    const classes = useStyles();
    // Name, price, distance to the organization, opened
    return <List className={classes.root}>
            {
                products.map((item) => (
                    <ListItem button alignItems='flex-start' style={{display: 'flex', flexDirection: 'column'}}
                              divider>
                        <Typography variant="h6">
                            {item.company.name}
                        </Typography>
                        <Typography variant="h6" className={classes.price}>
                            {item.company.address}
                        </Typography>
                        <Typography variant="h6">
                            {item.price} руб.
                        </Typography>
                        <Typography variant="h6">
                            {item.distance}
                        </Typography>
                    </ListItem>
                ))
            }
        </List>;
};

export default Products;