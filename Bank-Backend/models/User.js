const {DataTypes}=require('sequelize');
const sequelize=require('../config/config');

const User=sequelize.define('users',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true,
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    freezeTableName:true,
    timestamps:false,
})
module.exports=User;