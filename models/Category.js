const sequelize = require('./sequelizeConfig');
const {DataTypes} = require('sequelize');

const Category = sequelize.define('category',{
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    parent:{
        type: DataTypes.INTEGER
    },
    imageId:{
        type:DataTypes.INTEGER
    }
});

//(async ()=>{await sequelize.sync({ force: true });})()


module.exports = Category;