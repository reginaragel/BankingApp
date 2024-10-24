import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import accountReducer from './slices/AccountSlice';



const store=configureStore({
    reducer:{
        user: userReducer,
        account:accountReducer,
    }
})
export default store;