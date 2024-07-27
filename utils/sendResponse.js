'use strict'

//the purpose of this module is to have one place from where all the responses go out.
// the benefit of this is if in the future we need to add any new logic before sending
// a response, we just have to add it in one place, minimizing change impact

const sendResponse = (req, res, data) => {

    //bad request from client, either missing attributes or bad values
    if(data.error === 'client') {
        res.status(400).send(data.responseObj)
    }
    
    //server error
    if(data.error === 'server') {
        res.status(500).send(data.responseObj)
    }

    res.send(data.responseObj)

}

module.exports = {
    sendResponse
}