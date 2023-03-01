import {
    SET_USER_TYPE,
    SET_USER_DETAIL,
    SET_CREDIT_CARDS,
    SET_REPORTS,
    SET_CURRENT_LOCATION,
    SET_STRIPE_ACCOUNT_DETAIL,
    SET_USER_AUTH,
    SET_USER_CORDINATES,
} from '../actionTypes'

const INITIAL_STATE = {
    userType: null,
    userDetail: {},
    userAuth: null,
    latitude: null,
    longitude: null,
    address: null,
};

const userReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER_TYPE:
            return {
                ...state,
                userType: action.payload,
            };
        case SET_USER_DETAIL:
            return {
                ...state,
                userDetail: action.payload,
            };
        case SET_USER_AUTH:
            return {
                ...state,
                userAuth: action.payload,
            };
        case SET_USER_CORDINATES:
            console.log("action.data =====> ", action);
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                address: action.payload.address,
            };
        case SET_CREDIT_CARDS:
            return {
                ...state,
                creditCards: action.payload,
            };
        case SET_REPORTS:
            return {
                ...state,
                reports: action.payload,
            };
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload,
            };
        case SET_STRIPE_ACCOUNT_DETAIL:
            return {
                ...state,
                stripeAccountDetail: action.payload,
            };
        default:
            return state;
    }
};

export default userReducers