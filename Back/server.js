const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user-routes');
const boardRoutes = require('./routes/board-routes');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./config/swagger-config');
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const boardController = require('./controllers/board-controller');

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
      //Lie le serveur back au serveur front
    }
});


connectDB();



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
app.get('/', (req, res) => {
    res.send('<h1>Server BACK ONLINE</h1>');
});
//go to http://localhost:3000/api-docs/ to see the documentation when the server is running
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');});
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    //DELETE TASK
    socket.on('deleteTask', async (boardid, taskid) => {
        console.log('deleteTask: \n Board:' + boardid + '\n Task:' + taskid);
    
        try {
          let deletedTask = await boardController.deleteTask({body:{ boardid, taskid} });
          io.emit('taskDeleted', { boardid, taskid, deletedTask });
        } catch (error) {

          console.error('Error deleting task:', error);
          socket.emit('deleteTaskError', { boardid, taskid, error: error.message });
        }
      });
   //ADD TASK
    socket.on('createTask', async (boardid,description,state,priority ) => {
        console.log('addTask: \n Board:' + boardid + '\n Task:' + description,state,priority);
    
        try {
          let newTask = await boardController.createtask({body:{ boardid,description,state,priority} });
          io.emit('taskCreated', { boardid,description,state,priority,newTask });
        } catch (error) {
          
          console.error('Error adding task:', error);
          socket.emit('addTaskError', { boardid, error });
        }
      }); 
    socket.on('message', (data) => {
        console.log('Message from client:', data);
      });
      //UPDATE TASK
      socket.on('updateTask', async (boardid, taskid, description) => {
        console.log('updateTask: \n Board:' + boardid + '\n Task:' + taskid);
    
        try {
          let updatedTask = await boardController.patchTask({body:{ boardid, taskid, description} });
          io.emit('taskUpdated', { boardid, taskid, updatedTask });
        } catch (error) {
          console.error('Error updating task:', error);
          socket.emit('updateTaskError', { boardid, taskid, error: error.message });
        }
      });
});

server.listen(port, console.log(`Server running  on port ${port}`));