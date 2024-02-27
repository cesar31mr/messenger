const dotenv = require('dotenv').config();

module.exports = {
    API_PORT: process.env.PORT || 4201,
    API_HOST: process.env.HOST || 'localhost',
};
