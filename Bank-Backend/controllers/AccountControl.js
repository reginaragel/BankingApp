const Account=require('../models/Account');
const bcrypt=require('bcrypt');
const crypto=require('crypto');


const salt=bcrypt.genSaltSync(10);

function generateAccountNumber(){
    return crypto.randomBytes(5).toString('hex').toUpperCase();
}


const AccountControl={
    account_register:async(req,res)=>{
        const {fullname,dob,number,email,password,address,proof,occupation}=req.body;

        console.log(req.body);
        

        try{
            let account_number;
            let isUnique=false;

            while(!isUnique){
                account_number=generateAccountNumber();
                 const exisitingAccount=await Account.findOne({where:{account_number:account_number}});

                 if(!exisitingAccount){
                    isUnique=true;
                 }
            }

            const accounts=await Account.create({
                fullname,
                dob,
                number,
                email,
                address,
                proof,
                occupation,
                password:bcrypt.hashSync(password,salt),
                account_number:account_number,
            });
            res.status(201).json({message:'Account created Successfully',accounts});
        }catch(error){
            console.error("Error creating account",error);
        }
    },
    profile:async(req,res)=>{
        const {email}=req.query;
        console.log(email);

        if(!email){
            return res.status(400).json({message:'Email is required'});
        }
        try{
            const user=await Account.findOne({where:{email}});
            console.log(user)
            if(!user){
                res.status(404).json({message:'Account not Found:Create One!!!!'})
                console.log("Account is not available.Create One!!!!")
            }else{
                res.status(200).json({message:'Account Found',user});
            }
        }catch(err){
            console.error(err);
            console.log("Account not found")
        }
    },
    deposit:async(req,res)=>{
        const {account_number,balance}=req.body;
        console.log(req.body);
        try{
            const account=await Account.findOne({where:{account_number}});
            if(account){
                const currentBalance=parseFloat(account.balance);
                const depositAmount=parseFloat(balance);
                const newBalance=currentBalance+depositAmount;
                await Account.update({balance:newBalance},{where:{id:account.id}});
                return res.status(200).json({message:'Deposit Successful',newBalance});
            }else{
                return res.status(404).json({message:'Account not found'})


            }
        }catch(error){
            console.error("Error depositing money",error);
            return res.status(500).json({message:'An error occurred'})
        }

    },
    withdraw:async(req,res)=>{
        const {account_number,balance}=req.body;
        console.log(req.body);

        try{
            const account=await Account.findOne({where:{account_number}});
            if(account){
                const currentBalance=parseFloat(account.balance);
                const  withdrawAmount=parseFloat(balance);
                const newBalance=currentBalance-withdrawAmount;
                await Account.update({balance:newBalance},{where:{id:account.id}});
                return res.status(200).json({message:"Amount Withdrawed"})

            }else{
                return res.status(404).json({message:'Account not found'})
            }
        }catch(err){
            console.error("error occured while withdrawing",err);
            return res.status(500).json({message:'Internal server error'})
        }
    }

}

module.exports=AccountControl;