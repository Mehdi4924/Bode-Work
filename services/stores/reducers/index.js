import { combineReducers } from 'redux';

import userReducer from './user';

export default combineReducers({
    user: userReducer,
});

//export * from './user'
