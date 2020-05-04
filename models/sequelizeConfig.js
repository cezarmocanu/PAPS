const Sequelize = require('sequelize');
const logger = require('../logs/Logger');
/*
const sequelize = new Sequelize('agrobraz_db', 'agrobraz_test', 'pass@agrobraz', {
  host: 'localhost',
  dialect: 'mysql'
});
*/
const sequelize = new Sequelize('test_paps', 'paps', 'parola@paps', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    logger.log('Connexion succesful')
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    logger.log(JSON.stringify(err))
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;

