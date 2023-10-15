const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user-routes');
const boardRoutes = require('./routes/board-routes');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./config/swagger-config');

let corsOptions = {
    origin: 'http://localhost:3001',
};

connectDB();

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());

//A absolument ajouter si on veut lire les données de type JSON
app.use(bodyParser.json({limit: '50mb', extended: true, type: 'application/json'}));
/* app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.text({limit: '50mb'})) */

//Routes
app.use('/api/users', userRoutes);
app.use('/api/board/', boardRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//go to http://localhost:3000/api-docs/ to see the documentation when the server is running
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const server = app.listen(port, console.log(`Server running on port ${port}`));

module.exports = app;
// exports the app.listen for testing, necessary for preventing Jest from running indefinitely
module.exports = server;
