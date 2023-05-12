const mssql = require('../db/mssql')
const { v4: uuidv4 } = require('uuid');
const crypto = require('./crypto')

module.exports.createOrder = async (req, res)=>{
    req.body.uuid = uuidv4();
    req.body.pair = req.body.pair.toUpperCase();
    req.body.price = (req.body.price)? req.body.price : await crypto.getPrice(res, req.body.pair.split("-")[0], req.body.pair.split("-")[1])
    mssql.createOrder(req.body).then((data)=>{
        res.status(200).send({
            message: data,
            OrderID: req.body.uuid
        })
    }).catch((error)=>{
        res.status(500).send(error)
    })
}

module.exports.getAllOrders = (req, res)=>{
    mssql.getAllOrders().then((data)=>{
        res.status(200).send(data)
    }).catch((error)=>{
        res.status(500).send(error)
    })
}

module.exports.getOrderByID = (req, res)=>{
    mssql.getOrderByID(req.params.id).then((data)=>{
        res.status(200).send(data)
    }).catch((error)=>{
        res.status(500).send(error)
    })
}

module.exports.updateOrderByID = async (req, res)=>{
    req.body.pair = req.body.pair.toUpperCase()
    req.body.price = (req.body.price)? req.body.price : await crypto.getPrice(res, req.body.pair.split("-")[0], req.body.pair.split("-")[1])
    mssql.updateOrderByID(req.body).then((data)=>{
        res.status(200).send({
            message: data,
            OrderID: req.body.uuid
        })
    }).catch((error)=>{
        res.status(500).send(error)
    })
}