import React, { useState } from "react";
import {Navigate} from 'react-router-dom';
import Header from "./Header";
import './CreatePage.css';
import { useDispatch,useSelector } from "react-redux";
import { createAccountStart,createAccountSuccess,createAccountFailed } from "../redux/slices/AccountSlice";
const CreatePage=()=>{
    const dispatch=useDispatch();
    const {loading,error}=useSelector((state)=>state.account);
    const [fullname,setFullName]=useState('');
    const [dob,setDob]=useState('');
    const [number,setNumber]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [address,setAddress]=useState('');
    const [proof,setProof]=useState('');
    const [occupation,setOccupation]=useState('');
    const [redirect,setRedirect]=useState(false);


    const handleCreate=async(e)=>{
        e.preventDefault();
        dispatch(createAccountStart());
        try{
            const response=await fetch(`http://localhost:5000/api/account_register`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    fullname,
                    dob,
                    number,
                    email,
                    password,
                    address,
                    proof,
                    occupation,
                })
            })
            if(!response.ok){
                throw new Error('Failed to create account')
            }
            await response.json();
            dispatch(createAccountSuccess());
            alert('Account Created');
            setRedirect(true);
        }catch(error){
            dispatch(createAccountFailed(error.message))
            alert('Account Creation Failed');
        }

    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(
        <div>
            <Header/>
            <section className="main_content">
                <div className="title">
                    <span>Create Account</span>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
                <div className="fields">
                   <div className="name">
                        <label>FullName:
                            <input type="text" value={fullname}
                            onChange={(e)=>setFullName(e.target.value)} required/>
                        </label>
                   </div>
                   <div className="dob">
                        <label>Date of Birth:
                            <input type="date" value={dob}
                            onChange={(e)=>setDob(e.target.value)} required/>
                        </label>
                   </div>
                   <div className="number">
                        <label>Phone Number:
                            <input type="text" value={number}
                            onChange={(e)=>setNumber(e.target.value)} required/>
                        </label>
                   </div>
                   <div className="mail">
                        <label>Email:
                            <input type="email" value={email}
                            onChange={(e)=>setEmail(e.target.value)} required/>
                        </label>
                   </div>
                   <div className="pass">
                        <label>Password:
                            <input type="password" value={password}
                            onChange={(e)=>setPassword(e.target.value)}required/>
                        </label>
                   </div>
                   <div className="address">
                        <label>Residential Address:
                            <textarea value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                        </label>
                   </div>
                   <div className="proof">
                        <label>Aadhar ID:
                            <input type="text" value={proof} 
                            onChange={(e)=>setProof(e.target.value)}required/>
                        </label>
                   </div>
                   <div className="designation">
                        <label>Occupation:
                            <input type="text" value={occupation}
                            onChange={(e)=>setOccupation(e.target.value)}required/>
                        </label>
                   </div>
                   <div>
                        <button onClick={handleCreate}>Create Account</button>
                   </div>
                </div>
            </section>
        </div>
    )
}
export default CreatePage