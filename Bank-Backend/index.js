const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
// const db=require('./config/config');
const cors=require('cors');
const sequelize=require('./config/config');
const AccountControl=require('./controllers/AccountControl')
const Account=require('./models/Account');
const app=express();

dotenv.config({path:path.join(__dirname,'config','config.env')});
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/api',require('./routes/AccountRouter'));
app.use('/api',require('./routes/UserRouter'));

sequelize.authenticate()
.then(()=>{
    console.log('Database synced with Accoount');
})
.catch((error)=>{
    console.log('error while syncing the database',error);
    res.status(500).json({ message: "Internal Server Error", error });
})


console.log(process.env.PORT)
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})