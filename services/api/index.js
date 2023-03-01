import * as  Util from '../index'
import axios from 'axios';

class Api {

    static postAxios(route, formData, token) {
        return this.axiosPost(route, formData, token)
    }

    static getAxios(route, token) {
        return this.axiosGet(route, token)
    }

    static getAxiosParam(route, formData, token) {
        return this.axiosGetParams(route, formData, token)
    }

    static putAxios(route, params, config) {
        return this.axiosPut(route, params, config)
    }

    //POST Axios Call
    static axiosPost = async (endpoint, formData, token) => {

        const url = `${Util.stagingServer}${endpoint}`
        if (token) {
            let options = {
                headers: {
                    'Authorization': token,
                },
            }
            var configration = Object.assign(options)
        } else {
            var configration = {}
        }
        // let configration = Object.assign(config, options)

        return axios.post(url,
            formData,
            configration,
        )   
            .then((response) => {
                console.log('SUCCESS!!', response);
                return response.data
            })
            .catch((error) => {
                console.log('FAILURE!!', error);
                return error
            });
    }

    //GET Axios without params Call
    static axiosGet = async (endpoint, token) => {
        const url = `${Util.stagingServer}${endpoint}`
        let options = {
            headers: {
                'Authorization': token,
            },
        }
        let configration = Object.assign(options)
        // let configration = Object.assign(config)
        
        return axios.get(url,
            configration,
        )   
            .then((response) => {
                console.log('SUCCESS!!', response);
                return response.data
            })
            .catch((error) => {
                console.log('FAILURE!!', error);
                return error
            });
    }

    //GET Axios with params Call
    static axiosGetParams = async (endpoint, formData, token) => {
        const url = `${Util.stagingServer}${endpoint}`
        let options = {
            headers: {
                'Authorization': token,
            },
        }
        let configration = Object.assign(options)
        // let configration = Object.assign(config)
        
        return axios.get(url,
            formData,
            configration,
        )   
            .then((response) => {
                console.log('SUCCESS!!', response);
                return response.data
            })
            .catch((error) => {
                console.log('FAILURE!!', error);
                return error
            });
    }
    
    //PUT Fetch Call
    static axiosPut = async (endpoint, formData, config) => {  
        return fetch(`${Util.stagingServer}${endpoint}`, {  
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJOSN) => {
            console.log('SUCCESS!!', responseJOSN);
            return responseJOSN
        })
        .catch((error) => {
            console.log('FAILURE!!', error);
            return error
        });   
    }

}

export default Api;
