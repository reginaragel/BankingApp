const {DataTypes}=require('sequelize');
const sequelize=require('../config/config');

const Account=sequelize.define('accounts',{
    fullname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    dob:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    number:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    proof:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    occupation:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    account_number:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    balance:{
        type:DataTypes.DECIMAL(12,2),
        defaultValue:0,
    }
    
},
    {
        freezeTableName:true,
        timestamps: false, 
});
module.exports=Account;