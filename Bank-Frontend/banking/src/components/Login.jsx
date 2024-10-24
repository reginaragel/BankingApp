import React, { useState } from "react";
import Header from "./Header";
import './Login.css';
import { useDispatch,useSelector } from "react-redux";
import { loginStart,loginSuccess,loginFailed } from "../redux/slices/UserSlice";
import { Navigate } from "react-router-dom";

const Login=()=>{
    const dispatch=useDispatch();
    const {loading,error}=useSelector((state)=>state.user);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);


    const handleLogin=async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const response=await fetch(`http://localhost:5000/api/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password}),
            });
            if(!response.ok){
                throw new Error('Failed to login');
            }
            const data=await response.json();
            dispatch(loginSuccess(data));
            alert('Login Successfull');
            setRedirect(true);
        }catch(err){
            dispatch(loginFailed(err.message));
            alert('Login Failed')
        }
    }
    if(redirect){
        return <Navigate to={'/profile'}/>
    }
    return(
        <div>
            <Header/>
            <section className="login-dialog">
                <div className="container">
                    <div className="Login">
                        <h2>Login</h2>
                    </div>
                    <div className="inputs">
                        <input type="email"
                            placeholder="Email" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)} 
                        required/>
                        <input type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)} 
                        required/>
                    </div>
                    <div className="btn">
                        <button onClick={handleLogin}>Login</button>
                        <span>New User?<a href="/sign">Signup</a></span>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default Login