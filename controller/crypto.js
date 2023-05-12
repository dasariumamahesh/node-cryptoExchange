const axios = require('axios')
require("dotenv").config()

module.exports.getPrice = async (res, pair1, pair2)=>{
  return new Promise(async (resolve, reject)=>{
    let apiUrl = process.env.CRYPTO_URL.replace("PAIR1", pair1).replace("PAIR2", pair2);
  const authToken = process.env.CRYPTO_KEY;
  let response = await axios.get(apiUrl, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  if(response.data.Response == "Error"){
    reject({Message:response.data.Message})
  }else{
    resolve(response.data[pair2])
  }
  })
}