'use strict'

//controller files are responsible for validating the input, sending the appropriate
// params to the handler files and also for sending back the response

const { sendResponse } = require('../../utils/sendResponse')
const orderHandlers = require('../handlers/order.handler')
const messages = require('../../utils/messages')
const {logger} = require('../../utils/logger')
const pgRespCodes = require('../../utils/pgRespCodes')
const { generateOrderId } = require('../../utils/generateOrderId')

const getAllOrders = async (req,res) => {
    
    try{
        let {data: ordersList, error} = await orderHandlers.getAllOrders()

        //database could not fetch records
        if(error) {
            throw new Error(JSON.stringify(error))
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
                error: true,
                responseObj: {
                    responseMessage: messages.failureFetchingOrders,
                    orders: null
                }
            }   
        ) 
    }
}

const getSpecificOrder = async (req,res) => {
    try{
        let {id} = req.params
        if(!id) {
            throw new Error('Order Id not provided')
        }

        let {data: order, error} = await orderHandlers.getSpecificOrder(id)

        //database could not fetch record
        if(error) {
            throw new Error(JSON.stringify(error))
        }

        return sendResponse(req, res, 
            {
                error: false,
                responseObj: {
                    responseMessage: messages.successfullyFetchedOrders,
                    order: order
                }
            }
        )

    } catch(error) {
        logger.error(`Could not fetch order: ${error}`)
        return sendResponse(req, res, 
            {
                error: true,
                responseObj: {
                    responseMessage: messages.failureFetchingOrders,
                    order: null
                }
            }   
        ) 
    }
}

const insertOrder = async (req,res) => {
    try{   
        let {game, username, userId,serverId, amount, paymentMethod, date, agent,status, processedBy, code, price} = req.body

        if(!game || !username || !userId || !amount || !paymentMethod || !agent || !price) {
            throw new Error('Invalid Payload: Please send all required attributes')
        }

        let orderId = generateOrderId('KS')

        let payload = {
            orderId,
            game,
            username,
            userId,
            serverId,
            amount,
            paymentMethod,
            date, //TODO: date should not actually be coming from the frontend
            agent,
            status,
            processedBy,
            code,
            price
        }

        let {data, error} = await orderHandlers.insertOrder(payload)

        //database could not insert record
        if(error) {
            throw new Error(JSON.stringify(error))
        }

        return sendResponse(req, res, 
            {
                error: false,
                responseObj: {
                    responseMessage: messages.successInsertingOrder,
                }
            }
        )

    }catch(error){
        logger.error(`Could not insert order: ${error}`)
        return sendResponse(req, res, 
            {
                error: true,
                responseObj: {
                    responseMessage: messages.failureInsertingOrder,
                }
            }   
        ) 
    }
}

const updateOrderStatus = async (req, res) => {
    try{
        let {status, id} = req.body

        if(!status, !id) {
            throw new Error('Invalid Payload: Please send status and the order id')
        }
        status = status.toLowerCase()
        //enforcing some possible values for the status
        const allowedStatusValues = ['pending', 'concluded', 'cancelled']
        if(!allowedStatusValues.includes(status)){
            throw new Error('Provide valid status')
        }

        let {data, error} = await orderHandlers.updateOrderStatus(status, id)

        //database could not insert record
        if(error) {
            throw new Error(JSON.stringify(error))
        }

        return sendResponse(req, res, 
            {
                error: false,
                responseObj: {
                    responseMessage: messages.successUpdatingOrder,
                }
            }
        )

    }catch(error){
        logger.error(`Could not update order: ${error}`)
        return sendResponse(req, res, 
            {
                error: true,
                responseObj: {
                    responseMessage: messages.failureUpdatingOrder,
                }
            }   
        ) 
    }
}


module.exports = {
    getAllOrders,
    getSpecificOrder,
    insertOrder,
    updateOrderStatus
}