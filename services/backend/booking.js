import axios from 'axios';
import { baseURL, endPoints } from '../constants';
var qs = require('qs');
export const scheduleBookings = async (data) => {
    let response = null;
    let config = {
        headers: {
          Authorization: '',
          'Accept': 'application/json', 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      };
    await axios
        .post(`${baseURL + endPoints.scheduleBookings}`, qs.stringify(data) ,config)
        .then(async responseJson => {
            console.log(responseJson);
            const tempResponseData = responseJson.data;
            response = tempResponseData;
        })
        .catch(error => {
            response = {
                success: false,
                message: error.response.data.message,
            }
        });

    return response;
};

export const completedBookings = async (data) => {
    let response = null;
    await axios
        .post(`${baseURL + endPoints.completedBookings}`, { ...data })
        .then(async responseJson => {
            console.log(responseJson);
            const tempResponseData = responseJson.data;
            response = tempResponseData;
        })
        .catch(error => {
            response = {
                success: false,
                message: error.response.data.message,
            }
        });

    return response;
};

export const postReview = async (data) => {
    let response = null;
    await axios
        .post(`${baseURL + endPoints.postReview}`, { ...data })
        .then(async responseJson => {
            console.log(responseJson);
            const tempResponseData = responseJson.data;
            response = tempResponseData;
        })
        .catch(error => {
            response = {
                success: false,
                message: error.response.data.message,
            }
        });

    return response;
};
export const userpostReview = async (data) => {
    let response = null;
    await axios
        .post(`${baseURL + endPoints.userpostreview}`, { ...data })
        .then(async responseJson => {
            console.log(responseJson);
            const tempResponseData = responseJson.data;
            response = tempResponseData;
        })
        .catch(error => {
            response = {
                success: false,
                message: error.response.data.message,
            }
        });

    return response;
};
