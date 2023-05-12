const sql = require('mssql')
require('dotenv').config()
const config = {
    database: process.env.DATABASE,
    server: process.env.SERVER,
    password: process.env.PASSWORD,
    user: process.env.USER,
    options:{
        trustServerCertificate: true 
    }
}
sql.on("error",err=>{console.log(err.message)})
sql.connect(config, (err)=>{
    if(err){
        console.log(err)
    }
    console.log("DB conecction sucessful")
})
var request = new sql.Request()

module.exports.createOrder = (data)=>{
    return new Promise((resolve, reject)=>{
        let query = `INSERT INTO cryptoData VALUES('${data.uuid}', '${data.pair}', '${data.type}', ${data.price}, ${data.quantity})`
        request.query(query, (err,res)=>{
            if(err){
                reject(err)
            }else{
                if(res.rowsAffected == 1){
                    resolve("Order created")
                }else{
                    reject({error:"Failed to create the order"})
                }
            }
        })
    })
}

module.exports.getAllOrders = ()=>{
    return new Promise((resolve, reject)=>{
        let query = `SELECT * FROM cryptoData`
        request.query(query, (err,res)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                if(res.rowsAffected > 0){
                    resolve(res.recordset)
                }else{
                    resolve({message :"No Orders found"})
                }
            }
        })
    })
}

module.exports.getOrderByID = (data)=>{
    return new Promise((resolve, reject)=>{
        let query = `SELECT * FROM cryptoData WHERE UUID='${data}'`
        request.query(query, (err,res)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                if(res.rowsAffected > 0){
                    resolve(res.recordset)
                }else{
                    resolve({message :"No Order found"})
                }
            }
        })
    })
}

module.exports.updateOrderByID = (data)=>{
    return new Promise((resolve, reject)=>{
        let query = `UPDATE cryptoData SET PAIR='${data.pair}', ORDERTYPE='${data.type}', PRICE=${data.price}, QUANTITY=${data.quantity} WHERE UUID='${data.id}'`
        console.log(query)
        request.query(query, (err,res)=>{
            if(err){
                console.log(err)
                reject(err)
            }else{
                if(res.rowsAffected == 1){
                    resolve("Order details updated")
                }else{
                    reject({message :"Failed to Update Order details"})
                }
            }
        })
    })   
}