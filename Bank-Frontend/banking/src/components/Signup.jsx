import React, { useState } from "react";
import Header from "./Header";
import './Signup.css';
import { useDispatch } from "react-redux";
import { signupFailed, signupStart, signupSuccess } from "../redux/slices/UserSlice";

const Signup=()=>{

    const dispatch=useDispatch();
    const [username,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSignup=async(e)=>{
        e.preventDefault();
        dispatch(signupStart());
        try{
            const response=await fetch(`http://localhost:5000/api/signup`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({username,email,password})
            })
            if(!response.ok){
                throw new Error('Failed to sign up');
            }
            const data=await response.json();
            dispatch(signupSuccess(data));
            alert('User registered');
        }catch(err){
            dispatch(signupFailed(err.message));
            alert('Signup Failed')
        }

    }
    return(
        <div>
            <Header/>
            <section className="sign_container">
                <div className="sign_box">
                <div className="sign_title">
                    <h2>SignUp</h2>
                </div>
                <div className="sign_inputs">
                    <input type="text"
                    placeholder="UserName"
                    value={username}
                    onChange={(e)=>setUserName(e.target.value)}
                    required/>
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
                <div className="sign_btn">
                    <button onClick={handleSignup}>Signup</button>
                    
                </div>
                <span>Already have an account?<a href="/login">Login</a></span>
                </div>
            </section>
        </div>
    )
}
export default Signup