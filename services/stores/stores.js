import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

// import { observable } from 'mobx';

// class orderStore {
//     @observable USER_TYPE = '';
// }

// const stores = new orderStore();

// export { stores};