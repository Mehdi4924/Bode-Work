import axios from 'axios';
import {baseURL, endPoints} from '../constants';
var qs = require('qs');

export const servicesclientHome = async () => {
  let response = null;
  await axios
    .get(`${baseURL + endPoints.showfeatureservices}`)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error.response.data.message,
      };
    });

  return response;
};
export const servicesclientHomefeature = async () => {
  let response = null;
  await axios
    .get(`${baseURL + endPoints.showstylistservices}`)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error.response.data.message,
      };
    });

  return response;
};
export const showallStylistData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
  //   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.showstylists}`, userData, config)
    .then(async responseJson => {
      console.log(JSON.stringify(responseJson, null, 2));
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error,
      };
    });

  return response;
};
export const addFavoriteData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
  //   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.addfavoritestylist}`, userData, config)
    .then(async responseJson => {
      console.log(JSON.stringify(responseJson, null, 2));
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error,
      };
    });

  return response;
};
export const removeFavoriteData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
  //   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.removefavoritestylist}`, userData, config)
    .then(async responseJson => {
      console.log(JSON.stringify(responseJson, null, 2));
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error,
      };
    });

  return response;
};
export const getAvailableData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
  //   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.createimeslot}`, userData, config)
    .then(async responseJson => {
      console.log(JSON.stringify(responseJson, null, 2));
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error,
      };
    });

  return response;
};
export const StylistProfileData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.showstylistprofile}`, {...userData})
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error.response.data.message,
      };
    });

  return response;
};
export const updateBooking = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  //   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.makebooking}`, qs.stringify(userData), config)
    .then(async responseJson => {
      console.log(JSON.stringify(responseJson, null, 2));
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error,
      };
    });

  return response;
};
export const SearchData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
  //   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.searchservices}`, userData, config)
    .then(async responseJson => {
      console.log(JSON.stringify(responseJson, null, 2));
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error,
      };
    });

  return response;
};
export const CustomeremailSuports = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
  //   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.sendcustomersupport}`, userData, config)
    .then(async responseJson => {
      console.log(JSON.stringify(responseJson, null, 2));
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error,
      };
    });

  return response;
};

export const CardAdd = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  await axios
    .post(`${baseURL + endPoints.addcard}`, qs.stringify(userData), config)
    .then(async responseJson => {
      const tempResponseData = responseJson.data;
      response = tempResponseData;
    })
    .catch(error => {
      response = {
        success: false,
        message: error.response.data.message,
      };
    });

  return response;
};
