import axios from 'axios';
import { baseURL, endPoints } from '../constants';

export const favouriteStylers = async (data) => {
    let response = null;
    await axios
        .post(`${baseURL + endPoints.favouriteStylers}`, { ...data })
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

export const pastStylers = async (data) => {
    let response = null;
    await axios
        .post(`${baseURL + endPoints.pastStylers}`, { ...data })
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
