import axios from 'axios';
import {ToastMessage} from '../../themes';
import {baseURL, endPoints} from '../constants';
var qs = require('qs');
export const signUp = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.signUp}`, qs.stringify(userData),config)
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
export const forGetemail = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.passwordreset}`, qs.stringify(userData),config)
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
export const signIn = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.login}`, {...userData})
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
export const userProfileData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.userProfile}`, {...userData})
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
export const usergetmessageData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.showconversation}`, {...userData})
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
export const usergetmessage = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.showmessages}`, {...userData})
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
export const sendmessageData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.sendmessage}`, {...userData})
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
export const userHomeData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.stylisthome}`, {...userData})
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
export const userSearchData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.searchclients}`, {...userData})
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
export const showAllUser= async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.showclients}`, {...userData})
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
export const userstylesCurrentData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.showstylistschedulbooking}`, qs.stringify(userData),config)
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
export const stylesMonthlyData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.monthlybookings}`, qs.stringify(userData),config)
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
export const stylesDateData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.getbydatebookings}`, qs.stringify(userData),config)
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
export const userstylesPastData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.showstylistpastbooking}`, {...userData})
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
// =================>>>>>>>>>>>>>>>>provider skill adnd editskills
export const showSkillData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.showskills}`, {...userData})
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
export const deleteServiceData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.deleteservice}`, {...userData})
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
export const showportfolioData = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.showportfolio}`, {...userData})
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
export const logOutUser = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.userlogout}`, {...userData})
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

export const addportfolioData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.addportfolio}`, userData, config)
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
export const showServiceData = async () => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.showservices}`,)
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
export const showSingleServiceData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.stylistservices}`, qs.stringify(userData),config)
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
export const showTimeSlot = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.createtimeslot}`, qs.stringify(userData),config)
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
export const showsinglestylistData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.stylistservices}`, userData, config)
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
export const showstylistscheduleData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.showstylistschedulbooking}`, userData, config)
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
export const showstylistBokingRequest = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.getbookingrequests}`, userData, config)
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
export const cancelbookingData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.cancelbooking}`, userData, config)
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
export const jobStartData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.startjob}`, userData, config)
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
export const endJobData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.completejob}`, userData, config)
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
export const acceptbookingData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.acceptbookingrequest}`, userData, config)
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

export const businessMonthlyData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.monthlyreports}`, userData, config)
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
export const businessWeeklyData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.weeklyreports}`, userData, config)
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
export const showStylistReviewData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.showstylistreviews}`, userData, config)
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
export const postStylistReviewData = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.stylistpostreview}`, userData, config)
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
export const updateProfile = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.updateProfile}`, userData, config)
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
export const makeReservation = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.makereservation}`,qs.stringify(userData), config)
    .then(async responseJson => {
      // console.log(JSON.stringify(responseJson, null, 2));
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
export const editService = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
       'Accept': 'application/json', 
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.stylisteditservice}`, userData, config)
    .then(async responseJson => {
      // console.log(JSON.stringify(responseJson, null, 2));
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
export const addService = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.stylistaddservice}`, userData, config)
    .then(async responseJson => {
      // console.log(JSON.stringify(responseJson, null, 2));
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
export const stylistServiceAdd = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.stylistaddservice}`, userData, config)
    .then(async responseJson => {
      // console.log(JSON.stringify(responseJson, null, 2));
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
export const updatePassword = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.changePassword}`, qs.stringify(userData), config)
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
export const pauseAccount = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.pauseAccount}`, {...userData})
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
export const changePassword = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.changePassword}`, {...userData})
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
export const showAbout = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.showAbout}`, {...userData})
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
export const addAbout = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.addAbout}`, {...userData})
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
export const updateAbout = async userData => {
  let response = null;
  await axios
    .post(`${baseURL + endPoints.updateAbout}`, {...userData})
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
export const DDeposit = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.addbankdetails}`, qs.stringify(userData),config)
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
export const CMessage = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.addclosingmessage}`, qs.stringify(userData),config)
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
export const UploadIdentity = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'content-type': 'multipart/form-data',
      
    },
  };
//   axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  await axios
    .post(`${baseURL + endPoints.uploadidentity}`, userData, config)
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
export const addAvailability = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.addavailability}`, qs.stringify(userData),config)
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
export const addComingHours = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.adjustcominghours}`, qs.stringify(userData),config)
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
export const showallAvailability = async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.showallavailabilities}`, qs.stringify(userData),config)
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
export const addVacationTime= async userData => {
  let response = null;
  let config = {
    headers: {
      Authorization: '',
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };
  await axios
    .post(`${baseURL + endPoints.addvacation}`, qs.stringify(userData),config)
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
// export const checkUserEmailExists = async (userData) => {
//     let response = null;
//     await axios
//         .post(`${baseURL + endPoints.user.checkUserEmailExists}`, { ...userData })
//         .then(async responseJson => {
//             response = responseJson.data;
//         })
//         .catch(error => {
//             Toasts.Error(error.response.data.message)
//             console.error(error.response);
//         });

//     return response;
// };

// export const updateProfile = async (userData) => {
//     let userId = store.getState().user.userAuth._id;
//     let userDetail = store.getState()?.user?.userDetail;
//     let { __v, ...rest } = userDetail;

//     let payload = userDetail ? { userId, ...rest, ...userData } : { userId, ...userData };

//     console.log('NEW PAYLOAD', payload);
//     let response = null;
//     await axios
//         .post(`${baseURL + endPoints.user.updateprofile}`, { ...payload })
//         .then(async responseJson => {
//             response = responseJson.data;
//         })
//         .catch(error => {
//             Toasts.Error(error.response.data.message)
//             console.error(error.response);
//         });

//     return response;
// };
// export const updatePaymentMethod = async (userData) => {
//     let userId = store.getState().user.userAuth._id;
//     let payload = { userId, ...userData }
//     let response = null;
//     console.log('payment data', payload);
//     await axios
//         .post(`${baseURL + endPoints.user.updatePaymentMethod}`, { ...payload })
//         .then(async responseJson => {
//             response = responseJson.data;
//         })
//         .catch(error => {
//             Toasts.Error(error.response.data.message)
//             console.error(error.response);
//         });

//     return response;
// };
// export const getUserById = async () => {
//     let userId = store.getState().user.userAuth._id;

//     let response = null;
//     await axios
//         .get(`${baseURL}users/${userId}`)
//         .then(async responseJson => {
//             response = responseJson.data;
//         })
//         .catch(error => {
//             Toasts.Error(error.response.data.message)
//             console.error(error.response);
//         });

//     return response;
// };
