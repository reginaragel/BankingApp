import { createSlice } from "@reduxjs/toolkit";

const AccountSlice=createSlice({
    name:'account',
    initialState:{
        error:null,
        loading:false,
    },
    reducers:{
        createAccountStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        createAccountSuccess:(state)=>{
            state.loading=false;
        },
        createAccountFailed:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    },
})
export const{createAccountStart,createAccountSuccess,createAccountFailed}=AccountSlice.actions;
export default AccountSlice.reducer;