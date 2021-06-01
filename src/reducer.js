import {ERROR, FIND_PRODUCTS, GET_ORGANIZATION, GET_ORGANIZATIONS} from "./types";

let initial = {
    products: [],
    organizations: [],
    error: {}
};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case FIND_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };

        case GET_ORGANIZATIONS:
            return {
                ...state,
                organizations: action.payload
            };
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export default reducer;