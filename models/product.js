const sequelize = require('./sequelizeConfig');
const {DataTypes} = require('sequelize');

const Product = sequelize.define('admin',{
    
});

//(async ()=>{await sequelize.sync({ force: true });})()


module.exports = Product;