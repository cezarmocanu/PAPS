const sequelize = require('./sequelizeConfig');
const {DataTypes} = require('sequelize');

const Admin = sequelize.define('admin',{
    email:{
        type: DataTypes.STRING,
        allowNull:false
        //constraint de email
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    role:{
        type: DataTypes.STRING,
    }
});

//(async ()=>{await sequelize.sync({ force: true });})()


module.exports = Admin;