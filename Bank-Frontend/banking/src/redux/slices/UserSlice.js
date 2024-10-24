import { createSlice } from "@reduxjs/toolkit";

const UserSlice=createSlice({
    name:'user',
    initialState:{
        userDetail:null,
        error:null,
        loading:false,
        token:null,
        isAuth:false,
    },
    reducers:{
        loginStart:(state)=>{
            state.loading=true;
            state.error=null;
            state.token=null;
        },
        loginSuccess:(state,action)=>{
            state.loading=false;
            state.userDetail=action.payload;
            state.token=action.payload.token;
            state.isAuth=true;
        },
        loginFailed:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.token=null;
        },
        signupStart:(state)=>{
            state.loading=true;
            state.error=null;
            state.token=null;
        },
        signupSuccess:(state,action)=>{
            state.loading=false;
            state.userDetail=action.payload;
            state.token=action.payload.token;
            state.isAuth=true;
        },
        signupFailed:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            state.token=null;
        },
        logout:(state)=>{
            state.userDetail=null;
            state.error=null;
            state.token=null;
            state.isAuth=false;
        },
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    signupStart,
    signupSuccess,
    signupFailed,
    logout,
}=UserSlice.actions;
export default UserSlice.reducer;