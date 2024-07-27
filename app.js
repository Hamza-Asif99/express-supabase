'use strict'
require('dotenv').config();

//vLdA48Ua.2AK25X

const express = require('express');
const helmet = require('helmet')

const ordersRouter = require('./api/routes/orders.route')
const checkSupabaseConnection = require('./utils/supabase/verifySupabaseConnection')

const {logger, requestLogger} = require('./utils/logger')

const app = express();

//to parse html form data
app.use(express.urlencoded({ extended: false }));

//security middleware
app.use(helmet())
app.disable('x-powered-by')  //reduces fingerprinting

//logging
app.use(requestLogger)
//router
app.use('/api/orders', ordersRouter)

//envrionment variables
const port = process.env.PORT;

//verify the connection to supabase before starting server
(async()=>{
    let connectionSuccess = await checkSupabaseConnection()
    if(connectionSuccess){
        app.listen(port, () => {
            logger.info(`Server is running on http://localhost:${port}`);
        });
    }else{
        logger.error('Could not connect to Supabase. Server shutting down....')
    }
})()
