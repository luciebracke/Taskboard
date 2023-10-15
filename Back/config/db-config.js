require('dotenv').config()

module.exports = {
    secret: 'the most secret key ever',
    database: process.env.MONGODB_URI
}