const fs = require('fs');
const logs = [];

const logger = (message) =>{
    logs.push(`${message}\n`);
}

module.exports = {log:logger,messages:logs};