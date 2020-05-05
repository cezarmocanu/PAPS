const sequelize = require('./sequelizeConfig');
const {DataTypes} = require('sequelize');

const Product = sequelize.define('product',{
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    code:{
        type: DataTypes.STRING,
        allowNull:false
    },
    hasPrice:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    price:{
        type: DataTypes.DOUBLE,
    },
    unit:{
        type: DataTypes.STRING,
    },
    categoryId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    }
    
});

//(async ()=>{await sequelize.sync();})()

/*
  name: 'Hello',
  code: 'bdsjbkgjs',
  hasPrice: true,
  price: '12',
  categoryId: 2,
  description: 'efwefw',
  unit: 'cub',
*/

//Product.sync({force:true});
module.exports = Product;