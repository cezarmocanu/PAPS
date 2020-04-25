const sequelize = require('./sequelizeConfig');
const {DataTypes} = require('sequelize');

const Image = sequelize.define('image',{
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    pathname:{
        type: DataTypes.STRING,
        allowNull:false
    }
});

//(async ()=>{await sequelize.sync();})()


module.exports = Image;