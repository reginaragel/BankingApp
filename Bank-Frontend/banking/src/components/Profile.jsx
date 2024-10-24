import React, { useState } from "react";
import Header from "./Header";
import './Profile.css';
const Profile=()=>{
    const [email,setEmail]=useState('');
    const [loading,setLoading]=useState(false);
    const [profile,setProfile]=useState(null);
    const [error,setError]=useState('');
    const [depositAmount,setDepositAmount]=useState('');
    const [depoOpen,setDepoOpen]=useState(false);
    const [withdrawAmount,setWithDrawAmount]=useState('');
    const [withdrawopen,setWithDrawOpen]=useState(false);
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const response=await fetch(`http://localhost:5000/api/profile?email=${email}`);
            if(!response.ok){
                throw new Error('Failed to fetch profile');
            }
            const data=await response.json();
            if(data.message=== "Account Found"){
                setProfile(data.user);
            }else{
                setError('Account NOt found');
            }
        }catch(err){
            console.error("Error Fetching Profile:",err);
            setError('Failed to fetch account details');
        }finally{
            setLoading(false);
        }
    }


    const handleDeposit=()=>{

        setDepoOpen(true);
        
    }
    const handleWithDraw=()=>{
        setWithDrawOpen(true)
    }

    const handleAddMoney=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch('http://localhost:5000/api/deposit',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    balance:depositAmount,
                    account_number:profile.account_number,
                })
            })
            if(!response.ok){
                throw new Error('Failed to deposit money');
            }
            const data=await response.json();
            if(data.message==='Deposit Successful'){
                alert('Deposit Successful!!!!!!');
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    balance: parseFloat(prevProfile.balance) + parseFloat(depositAmount),
                }));

            }else{
                alert('Failed to add money');
            }
            
            setDepoOpen(false)

            // setProfile((prevProfile)=>({
            //     ...prevProfile,
            //     balance:prevProfile.balance+Number(depositAmount),
            // }));
        }catch(err){
            console.log(err)
        }

    }

    const handleWithDrawMoney=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`http://localhost:5000/api/withdraw`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    balance:withdrawAmount,
                    account_number:profile.account_number,

                })
            })
            if(!response.ok){
                throw new Error('Failed to withdraw money');
            }
            const data=await response.json();
            if(data.message==='Withdraw Successful'){
                alert('Withdraw Successful!!!!!!');
                
            }
            else{
                alert('Withdraw Successful!!!!!!');
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    balance: parseFloat(prevProfile.balance) - parseFloat(withdrawAmount),
                }));
            }
            setWithDrawOpen(false);
        }catch(err){
            console.error("Error occured",err);
            console.log(err);
        }

    }
              
          
    return(
        <div>
            <Header/>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Get Profile'}
                    </button>
                </form>
            </div>
            <h1>Profile Details</h1>
            {error && <p>{error}</p>}
          {profile && ( <section className="prof_details">
                <div className="prof_container">
                    <div className="prof_name">
                        <p><strong>Name:</strong>{profile.fullname}</p>
                    </div>
                    <div className="prof_number">
                        <p><strong>Mobile Number:</strong>{profile.number}</p>
                    </div>
                    <div className="prof_dob">
                        <p><strong>Dob:</strong>{profile.dob}</p>
                    </div>
                    <div className="prof_account">
                        <p><strong>Account Number:</strong>{profile.account_number}</p>
                    </div>
                    <div className="prof_accountbal">
                        <p><strong>Account Balance:</strong>{profile.balance || 'Not Avialable'}</p>
                    </div>
                    <div className="prof_address">
                        <p><strong>Address:</strong>{profile.address}</p>
                    </div>
                    <div className="prof_proof">
                        <p><strong>Aadhaar ID:</strong>{profile.proof}</p>
                    </div>
                    <div className="prof_occupation">
                        <p><strong>Occupation:</strong>{profile.occupation}</p>
                    </div>
                    <div className="actions">
                        <button onClick={handleDeposit}>Deposit</button>
                        <button onClick={handleWithDraw}>WithDraw</button>
                    </div>
                </div>

              

            </section>)}
            <section className={`deposit ${depoOpen ? 'active':''}`}>
            {depoOpen && (   <div className="deposit_container">
                    <h2>Deposit</h2>
                    <input type="number" placeholder="Enter the Amount to Deposit"
                    value={depositAmount}
                    onChange={(e)=>setDepositAmount(e.target.value)}/>
                    <div className="btn_depo">
                        <button id="btn_1" onClick={handleAddMoney}>OK</button>
                        <button id="btn_2" onClick={()=>setDepoOpen(false)}>Cancel</button>
                    </div>

                </div>)}

            </section>
            <section className={`withdraw ${withdrawopen ? 'active':' '}`}>
                {withdrawopen && (<div className="withdraw_container">
                    <h2>Withdraw</h2>
                    <input type="text" placeholder="Enter the Amount to Withdraw"
                    value={withdrawAmount}
                    onChange={(e)=>setWithDrawAmount(e.target.value)}/>
                    <div className="btn_with">
                        <button id="btn_3" onClick={handleWithDrawMoney}>Ok</button>
                        <button id="btn_4" onClick={()=>setWithDrawOpen(false)}>Cancel</button>
                    </div>
                </div>)}

            </section>
        </div>
    )
}

export default Profile