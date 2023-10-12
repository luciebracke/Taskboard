const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

let corsOptions = {
    origin: 'http://localhost:3000',
};

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

//A absolument ajouter si on veut lire les données de type JSON
app.use(bodyParser.json({limit: '50mb', extended: true, type: 'application/json'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.text({limit: '50mb'}))

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));