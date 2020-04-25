const sequelize = require('./sequelizeConfig');
const {DataTypes} = require('sequelize');

const product = sequelize.define('product',{
    
});

//(async ()=>{await sequelize.sync({ force: true });})()


module.exports = product;