const {Sequelize}=require('sequelize');
const dotenv=require('dotenv');
const path=require('path');


const sequelize=new Sequelize('bank','postgres','root',{
    host:'localhost',
    dialect:'postgres',
    port:'5432',
});
// console.log(sequelize)

console.log('Database credentials:', {
    database: 'bank',
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: '5432',
});


module.exports=sequelize;