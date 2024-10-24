import React, { useState } from "react";
import { assets } from '../assets/image';
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/UserSlice";
import { Navigate } from "react-router-dom";

const Header=()=>{
    const dispatch=useDispatch();
    const [redirect,setRedirect]=useState(false);


    const handleLogout=async()=>{
       dispatch(logout());
       try{
        const response=await fetch(`http://localhost:5000/api/logout`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer  ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({}),
        })
        if(response.ok){
            console.log("Logout Success");
            setRedirect(true);
        }
       }catch(err){
        console.error(err);
        console.log('Logout Unsuccessful')
       }

    }
    if(redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <div>
            <nav className='navbar'>
                <div className='image'>
                    <img src={assets.bank_icon} alt='bankicon'/>
                </div>
                <ul className='elements'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Services</li>
                    <li>Customer Support</li>
                </ul>
                <div className='top_btn'>
                <div className='login_btn'>
                    <a href='/login'>Login</a>
                </div>
                <div className='create_btn'>
                    <a href='/create'>Create Account</a>

                </div>
                <div className='logout_btn'>
                    <a href='/' onClick={handleLogout}>Logout</a>

                </div>
                </div>
            </nav>
            


        </div>
    )
}

export default Header