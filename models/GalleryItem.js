const sequelize = require('./sequelizeConfig');
const {DataTypes} = require('sequelize');

const GalleryItem = sequelize.define('galleryitem',{
    productId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    imageId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    orderIndex:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
});

//(async ()=>{await sequelize.sync();})()

//GalleryItem.sync({force:true});
module.exports = GalleryItem;