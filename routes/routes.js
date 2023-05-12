const express = require('express')
const app = express()
const controller = require('../controller/controller')
const validation = require('../validation/validator')

app.get("/test",(req,res)=>res.send("Test route is working"))
app.post('/orders', validation.createOrder, controller.createOrder)
app.get('/orders', controller.getAllOrders)
app.get('/orders/:id', validation.checkOrderID, controller.getOrderByID)
app.put('/orders', validation.updateOrderByID, controller.updateOrderByID)


module.exports = app