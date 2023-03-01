import axios from 'axios';
import { baseURL, endPoints } from '../constants';

export const termsAndConditions = async () => {
    let response = null;
    await axios
        .get(`${baseURL + endPoints.termsAndCondition}`)
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
export const privacyPolicyData = async () => {
    let response = null;
    await axios
        .get(`${baseURL + endPoints.privacyPolicy}`)
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
export const faqsData = async () => {
    let response = null;
    await axios
        .get(`${baseURL + endPoints.getfaqs}`)
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
export const cancelationPolicyData = async () => {
    let response = null;
    await axios
        .get(`${baseURL + endPoints.cancelationPolicy}`)
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
export const legalNoticesData = async () => {
    let response = null;
    await axios
        .get(`${baseURL + endPoints.legalNotices}`)
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
