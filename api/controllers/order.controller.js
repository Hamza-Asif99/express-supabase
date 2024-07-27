'use strict'

//controller files are responsible for validating the input, sending the appropriate
// params to the handler files and also for sending back the response

const { sendResponse } = require('../../utils/sendResponse')
const orderHandlers = require('../handlers/order.handler')
const messages = require('../../utils/messages')
const {logger} = require('../../utils/logger')

const getAllOrders = async (req,res) => {
    
    try{
        let {data: ordersList, error} = await orderHandlers.getAllOrders()

        //database could not fetch records
        if(error) {
            throw new Error(error)
        }

        return sendResponse(req, res, 
            {
                error: false,
                responseObj: {
                    responseMessage: messages.successfullyFetchedOrders,
                    orders: ordersList
                }
            }
        )

    } catch(error) {
        logger.error(`Could not fetch orders: ${error}`)
        return sendResponse(req, res, 
            {
                error: error.validationError ? 'client' : 'server',
                responseObj: {
                    responseMessage: messages.failureFetchingOrders,
                    orders: null
                }
            }   
        ) 
    }
}


module.exports = {
    getAllOrders
}