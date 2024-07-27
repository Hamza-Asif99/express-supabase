'use strict'

//the purpose of this module is to have one place from where all the responses go out.
// the benefit of this is if in the future we need to add any new logic before sending
// a response, we just have to add it in one place, minimizing change impact

const logger = require('../utils/logger')

const sendResponse = (req, res, data) => {

    logger.responseLogger(req,res,data)
    //bad request from client, either missing attributes or bad values
    if(data.error) {
        res.status(400).send(data.responseObj)
        return
    }

    res.send(data.responseObj)

}

module.exports = {
    sendResponse
}