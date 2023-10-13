const swaggerOptions = {

    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'TaskMaster API',
            description: 'TaskMaster app API Information',
            version: '1.0.0',
        },
    },
    apis: ['./server.js',
        './routes/user-routes.js',
        './routes/product-routes.js',]
};

module.exports = swaggerOptions;
