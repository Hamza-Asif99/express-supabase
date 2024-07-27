'use strict'
require('dotenv').config();


const express = require('express');
const helmet = require('helmet')
const { rateLimit } = require('express-rate-limit')
const cors = require('cors')

const ordersRouter = require('./api/routes/orders.route')
const checkSupabaseConnection = require('./utils/supabase/verifySupabaseConnection')

const {logger, requestLogger} = require('./utils/logger')

process
  .on('unhandledRejection', (reason, p) => {
    logger.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    logger.error(err, 'Uncaught Exception thrown');
    // process.exit(1); 
  });

const app = express();

//to parse html form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
//security middleware
app.use(helmet())

// when using helmet.js and cors, when you whitelist a certain origin for CORS, you must also
// configure the CORP header value from helmet. Otherwise request can still get blocked from a different origin
// even with CORS whitelisting
app.use(
    helmet.crossOriginResourcePolicy({
      policy: 'cross-origin', // Options: 'same-origin', 'same-site', 'cross-origin'
    })
);
app.use(cors({
    origin: '*'
}))

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

app.use(limiter)

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
