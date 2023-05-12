const {check, validationResult} = require('express-validator')

const validator = (req,res,next)=>{
    const e = validationResult(req)
    if(e.errors.length>0){
        let errorMessage = {
            error: "BadRequestError",
            message: "Request doesn\'t contain all the fields.",
            errors: e.errors.map(detail=>detail.msg)
        }
        res.status(400).send(errorMessage)
    }else{
        next()
    }
}
module.exports.createOrder = [
    check('pair').exists().withMessage("pair is required").isString().withMessage("pair should be a string"),
    check('type').exists().withMessage("type is required").custom((value, { req }) => {
        if (value !== 'buy' && value !== 'sell') {
          throw new Error('Invalid type. Allowed values: buy, sell');
        }
        return true;
      }),
    check('price').optional().isFloat({ gt: 0 }).withMessage('price should be greater than 0'),
    check('quantity').exists().withMessage("quantity is required").isNumeric().withMessage('quantity should be a valid number').isFloat({ gt: 0 }).withMessage('quantity should be greater than 0'),
    validator
]

module.exports.checkOrderID = [
    check('id').exists().withMessage('ID parameter is required').isUUID().withMessage('Invalid ID parameter'),
    validator   
]

module.exports.updateOrderByID = [
    check('id').exists().withMessage('ID parameter is required').isUUID().withMessage('Invalid ID parameter'),
    check('pair').exists().withMessage("pair is required").isString().withMessage("pair should be a string"),
    check('type').exists().withMessage("type is required").custom((value, { req }) => {
        if (value !== 'buy' && value !== 'sell') {
          throw new Error('Invalid type. Allowed values: buy, sell');
        }
        return true;
      }),
    check('price').optional().isFloat({ gt: 0 }).withMessage('price should be greater than 0'),
    check('quantity').exists().withMessage("quantity is required").isNumeric().withMessage('quantity should be a valid number').isFloat({ gt: 0 }).withMessage('quantity should be greater than 0'),
    validator   
]