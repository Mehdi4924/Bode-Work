import axios from 'axios';
import { baseURL, endPoints } from '../constants';

export const services = async () => {
    let response = null;
    await axios
        .get(`${baseURL + endPoints.showServices}`)
        .then(async responseJson => {
            console.log(responseJson);
            const tempResponseData = responseJson.data;
            console.log('DEBUG : Response getServices()', tempResponseData);
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
