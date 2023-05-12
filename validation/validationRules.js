const {check, validationResult} = require('express-validator')

module.exports = {
    id: check('id').exists().withMessage('ID parameter is required').isUUID().withMessage('Invalid ID parameter'),
    pair: check('pair').exists().withMessage("pair is required").isString().withMessage("pair should be a string"),
    type: check('type').exists().withMessage("type is required").custom((value, { req }) => {
        if (value !== 'buy' && value !== 'sell') {
          throw new Error('Invalid type. Allowed values: buy, sell');
        }
        return true;
      }),
    price: check('price').optional().isFloat({ gt: 0 }).withMessage('price should be greater than 0'),
    quantity: check('quantity').exists().withMessage("quantity is required").isNumeric().withMessage('quantity should be a valid number').isFloat({ gt: 0 }).withMessage('quantity should be greater than 0')
}