import {
    SET_USER_DETAIL,
    SET_CREDIT_CARDS,
    SET_REPORTS,
    SET_CURRENT_LOCATION,
    SET_STRIPE_ACCOUNT_DETAIL,
    SET_USER_AUTH,
    SET_USER_CORDINATES
} from '../actionTypes';

export const setUserDetail = data => {
    console.log('DEBUG : setUserDetail()', data);
    return {
        type: SET_USER_DETAIL,
        payload: data,
    };
};
export const setUserAuth = data => {
    console.log('DEBUG : setUserAuth()', data);
    return {
        type: SET_USER_AUTH,
        payload: data,
    };
};
export const setUserCordinates = data => {
    console.log('DEBUG : setUserCordinates()', data);
    return {
        type: SET_USER_CORDINATES,
        payload: data,
    };
};
export const setCreditCards = data => {
    return {
        type: SET_CREDIT_CARDS,
        payload: data,
    };
};
export const setReports = data => {
    return {
        type: SET_REPORTS,
        payload: data,
    };
};
export const setCurrentLocation = data => {
    return {
        type: SET_CURRENT_LOCATION,
        payload: data,
    };
};
export const setStripeAccountDetail = data => {
    return {
        type: SET_STRIPE_ACCOUNT_DETAIL,
        payload: data,
    };
};



