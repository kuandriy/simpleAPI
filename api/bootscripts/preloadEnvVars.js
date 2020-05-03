
const path = require('path');
const environment = require(path.join(__dirname, '../configs/environment.json'));
// possibly to use 'dotenv' module and '.env' file for different environments 
module.exports = (() => {
    for(let varKey in environment){
        process.env[varKey] = environment[varKey];
    }
})();