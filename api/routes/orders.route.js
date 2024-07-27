'use strict'

/** 
 * all orders related routes are declared here
 * route files relay the request to corresponding methods in the controller files
**/

const express = require('express')
const ordersController = require('../controllers/order.controller')

const ordersRouter = express.Router()


ordersRouter.get(`/`, async (req, res) => {

    await ordersController.getAllOrders(req, res)

    // res.json(items);
});


ordersRouter.get(`/:id`, async (req, res) => {

    await ordersController.getSpecificOrder(req, res)

    res.json(items);
});


module.exports = ordersRouter