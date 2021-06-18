import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import {
    Button,
    Checkbox, CircularProgress,
    Container, Divider,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    InputLabel,
    MenuItem,
    Select, Typography
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Products from "./Products";
import {connect} from "react-redux";
import {findProducts} from "../../actions";
import NoData from "../../assets/undraw_No_data_re_kwbl.svg"
import CssBaseline from "@material-ui/core/CssBaseline";
import {BrowserRouter as Router} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 30
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height: 40
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    button: {
        marginTop: 20
    },
    formControl: {
        width: 300,
        marginTop: 20
    },
    searchIcon: {
        marginLeft: 10,
        marginRight: 5
    },
    noData: {
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    noDataTitle: {
        marginTop: 20
    },
    paper: {
        padding: 50
    }
}));

const Home = ({products, findProducts}) => {
    const classes = useStyles();

    const [sortBy, setSortBy] = React.useState("price");
    const [search, setSearch] = React.useState("");
    const [latitude, setLatitude] = React.useState(0);
    const [longitude, setLongitude] = React.useState(0);
    const [isOpenNow, setIsOpenNow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const sortParams = [
        {id: 1, name: "Цене", value: "price"},
        {id: 2, name: "Удалённости", value: "distance"},
    ]

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            setLatitude(coords.latitude)
            setLongitude(coords.longitude)
        })
    }, [])

    const handleChangeSearch = (event) => {
        setSearch(event.target.value)
    };

    const find = () => {
        setLoading(true)
        let params = {
            latitude,
            longitude,
            shortName: search,
            sortBy: sortBy,
            isOpenNow
        }
        findProducts(params, () => {
            setLoading(false)
        })
    }

    const handleChangeIsOpenNow = (event) => {
        setIsOpenNow(event.target.checked);
    };

    const showProducts = (products = []) => {
        if (products.length === 0) {
            return <div className={classes.noData}>
                <img src={NoData} width={200} height={200}/>
                <Typography variant="h6" className={classes.noDataTitle}>Нет данных</Typography>
            </div>
        } else {
            return <Products products={products}/>
        }
    }

    const showLoading = () => (
        <>
            <br/>
            <br/>
            <br/>
            <br/>
            <CircularProgress/>
        </>
    )

    const handleChangeSort = (event) => {
        setSortBy(event.target.value);
      };

    return (
        <Container className={classes.root}>
            <Paper variant="outlined" className={classes.paper} >
                <Paper className={classes.search} elevation={3}>
                    <SearchIcon className={classes.searchIcon}/>
                    <InputBase
                        className={classes.input}
                        placeholder="Поиск"
                        inputProps={{'aria-label': 'search google maps'}}
                        onChange={handleChangeSearch}
                    />
                </Paper>
                <br/>
                <br/>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Сортировка по</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={sortBy} onChange={handleChangeSort}>
                        <FormControlLabel value={"price"} control={<Radio />} label="Цене" />
                        <FormControlLabel value={"distance"} control={<Radio />} label="Удалённости" />
                    </RadioGroup>
                </FormControl>

                <br/>
                <br/>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isOpenNow}
                            onChange={handleChangeIsOpenNow}
                            color="primary"
                        />
                    }
                    label="Работающие в данный момент"
                />

                <br/>
                <br/>

                <Button variant="contained" color="primary" onClick={() => find()}>
                    Применить
                </Button>
                <br/>
                <br/>
                <Divider/>
                {
                    loading ? showLoading() : showProducts(products)
                }


            </Paper>
        </Container>
    )
};


const mapStateToProps = (state) => {
    return {
        products: state.products
    };
};

export default connect(mapStateToProps, {
    findProducts
})(Home);