import axios from 'axios';
import {URI} from "./constants";
import {ERROR, FIND_PRODUCTS, GET_ORGANIZATIONS} from "./types";

export const errorHandler = (err) => {
    return {
        type: ERROR,
        payload: err.response.data
    }
}

export const getOrganizations = (latitude, longitude, callback) => {
    return (dispatch) => {
        axios.get(URI + `company?latitude=${latitude}&longitude=${longitude}`).then(({data}) => {
            callback()
            dispatch({
                type: GET_ORGANIZATIONS,
                payload: data
            })
        }).catch((err) => {
            callback()
            dispatch(errorHandler(err))
        })
    };
};

export const getOrganization = (id, callback) => {
    return (dispatch) => {
        axios.get(URI + `find/by-company-id?companyId=${id}`).then(({data}) => {
            callback(data)
        }).catch((err) => {
            callback()
            dispatch(errorHandler(err))
        })
    };
};

export const findProducts = (params, callback) => {
    return (dispatch) => {
        axios.get(URI + `find/by-short-name?shortName=${params.shortName}&isOpenNow=${params.isOpenNow}&latitude=${params.latitude}&longitude=${params.longitude}&sortBy=${params.sortBy}`).then(({data}) => {
            callback()
            dispatch({
                type: FIND_PRODUCTS,
                payload: data
            })
        }).catch((err) => {
            callback()
            dispatch(errorHandler(err))
        })
    };
};