import axios from 'axios';
import { baseURL, endPoints } from '../constants';

export const allNotifications = async (data) => {
    let response = null;
    await axios
        .post(`${baseURL + endPoints.notifications}`, { ...data })
        .then(async responseJson => {
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
