const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router
.get('/', userController.getAllUsers)
.post('/register', userController.createUser)
.patch('/:id', userController.updateUser)
.delete('/:id', userController.deleteUser);

module.exports = router;

/**
 * @swagger
 * 
 * paths:
 *   /api/users:
 *     get:
 *       summary: Gets all users
 *       tags:
 *         - Users
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token
 *           required: true
 *           type: string
 *           format: string        
 * 
 *       responses:
 *         200:
 *           description: OK
 *         500:
 *          description: Internal server error
 * 
 *   api/users/register:
 *     post:
 *       tags:
 *         - Users
 *       summary: Register a new user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *             example:
 *              email: "john.doe@gmail.com"
 *              password: "password"           
 *          
 *       responses:
 *         201:
 *           description: Created
 *         500: 
 *           description: Internal Server Error
 * 
 *   api/users/login:
 *     post:
 *       tags:
 *         - Users
 *       summary: Login a user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               example:
 *                 email: "luluberlu@hotmail.fr"
 *                 password: "password"
 * 
 *       responses:
 *         200:
 *           description: OK 
 *         500:
 *           description: Internal Server Error
 * 
 *   api/users/{id}:
 *     patch:
 *       tags:
 *        - Users
 *       summary: Modify a user by id
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token
 *           required: true
 *           type: string
 *           format: string       
 *         - name: id
 *           in: path
 *           description: id of the user
 *           required: true
 *           type: string
 *           format: string
 *       requestBody:
 *          description: Fields that can be modified
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string               
 *
 *       responses:
 *         200:
 *           description: OK
 *         500:
 *           description: Internal Server Error
 * 
 *     delete:
 *       tags:
 *        - Users
 *       summary: Delete a user by id
 *       parameters:
 *         - name: Authorization
 *           in: header
 *           description: Bearer token
 *           required: true
 *           type: string
 *           format: string
 *         - name: id
 *           in: path
 *           description: id of the user
 *           required: true
 *           type: string
 *           format: string
 * 
 *       responses:
 *         200:
 *           description: OK
 *         500:
 *           description: Internal Server Error      
 *                                                              
 */