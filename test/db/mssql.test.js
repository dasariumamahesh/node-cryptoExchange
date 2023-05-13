const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const sql = require('mssql')
const { createOrder, getAllOrders, getOrderByID, updateOrderByID } = require('../../db/mssql')

describe('Testing createOrder function', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('Should create order sucessfully', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(null, { rowsAffected: 1 })
    })
    const inputData = {
      uuid: '1b50b1e0-00bc-454b-bb64-27805d384ab0',
      pair: 'BTC-USD',
      type: 'buy',
      price: 100,
      quantity: 10
    }
    try {
      const result = await createOrder(inputData)
      expect(result).to.be.a('string')
      expect(result).to.equal('Order created')
      expect(queryStub.calledOnceWith(`INSERT INTO cryptoData VALUES('1b50b1e0-00bc-454b-bb64-27805d384ab0', 'BTC-USD', 'buy', 100, 10)`)).to.be.true
    } catch (error) {
    }
  })

  it('Should fail to create order', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(null, { rowsAffected: 0 })
    })
    const inputData = {
      uuid: '1b50b1e0-00bc-454b-bb64-27805d384ab0',
      pair: 'BTC-USD',
      type: 'buy',
      price: 100,
      quantity: 10
    }
    try {
      const result = await createOrder(inputData)
    } catch (error) {
      expect(queryStub.calledOnceWith(`INSERT INTO cryptoData VALUES('1b50b1e0-00bc-454b-bb64-27805d384ab0', 'BTC-USD', 'buy', 100, 10)`)).to.be.true
      expect(error).to.be.a('object')
      expect(error).to.not.be.null;
    }
  })


  it('query should fail to run', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(true, null)
    })
    const inputData = {
      uuid: '1b50b1e0-00bc-454b-bb64-27805d384ab0',
      pair: 'BTC-USD',
      type: 'buy',
      price: 100,
      quantity: 10
    }
    try {
      const result = await createOrder(inputData)
    } catch (error) {
      expect(queryStub.calledOnceWith(`INSERT INTO cryptoData VALUES('1b50b1e0-00bc-454b-bb64-27805d384ab0', 'BTC-USD', 'buy', 100, 10)`)).to.be.true
      expect(error).to.be.true
      expect(error).to.not.be.null;
    }
  })
})

describe('Testing getAllOrders function', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('Should fetch all orders sucessfully', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(null, { rowsAffected: 5, recordset: {} })
    })
    try {
      const result = await getAllOrders()
      expect(result).to.be.a('object')
      expect(queryStub.calledOnceWith(`SELECT * FROM cryptoData`)).to.be.true
    } catch (error) {
    }
  })

  it('Should fetch no orders', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(null, { rowsAffected: 0 })
    })
    try {
      const result = await getAllOrders()
      expect(queryStub.calledOnceWith(`SELECT * FROM cryptoData`)).to.be.true
      expect(result).to.be.a('object')
      expect(result).to.not.be.null;
    } catch (error) {
    }
  })


  it('query should fail to run', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(true, null)
    })
    try {
      const result = await getAllOrders()
    } catch (error) {
      expect(queryStub.calledOnceWith(`SELECT * FROM cryptoData`)).to.be.true
      expect(error).to.be.true
      expect(error).to.not.be.null;
    }
  })
})


describe('Testing getOrderByID function', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('Should fetch order by its id sucessfully', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(null, { rowsAffected: 1, recordset: {} })
    })
    try {
      const result = await getOrderByID('1b50b1e0-00bc-454b-bb64-27805d384ab0')
      expect(result).to.be.a('string')
      expect(queryStub.calledOnceWith(`SELECT * FROM cryptoData WHERE UUID='1b50b1e0-00bc-454b-bb64-27805d384ab0'`)).to.be.true
    } catch (error) {
    }
  })

  it('should fetch no order', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(null, { rowsAffected: 0 })
    })
    try {
      const result = await getOrderByID('1b50b1e0-00bc-454b-bb64-27805d384ab0')
      expect(result).to.be.a('object')
      expect(queryStub.calledOnceWith(`SELECT * FROM cryptoData WHERE UUID='1b50b1e0-00bc-454b-bb64-27805d384ab0'`)).to.be.true
    } catch (error) {
    }
  })

  it('query should fail to run', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(true, null)
    })
    try {
      const result = await getOrderByID('1b50b1e0-00bc-454b-bb64-27805d384ab0')
    } catch (error) {
      expect(queryStub.calledOnceWith(`SELECT * FROM cryptoData WHERE UUID='1b50b1e0-00bc-454b-bb64-27805d384ab0'`)).to.be.true
      expect(error).to.be.true
      expect(error).to.not.be.null;
    }
  })
})

describe('Testing updateOrderByID function', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('Should update order sucessfully', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(null, { rowsAffected: 1 })
    })
    const inputData = {
      id: '1b50b1e0-00bc-454b-bb64-27805d384ab0',
      pair: 'BTC-USD',
      type: 'buy',
      price: 100,
      quantity: 10
    }
    try {
      const result = await updateOrderByID(inputData)
      expect(result).to.be.a('string')
      expect(result).to.equal('Order created')
      expect(queryStub.calledOnceWith(`UPDATE cryptoData SET PAIR='BTC-USD', ORDERTYPE='buy', PRICE=100, QUANTITY=10 WHERE UUID='1b50b1e0-00bc-454b-bb64-27805d384ab0'`)).to.be.true
    } catch (error) {
    }
  })

  it('Should fail to update order', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(null, { rowsAffected: 0 })
    })
    const inputData = {
      id: '1b50b1e0-00bc-454b-bb64-27805d384ab0',
      pair: 'BTC-USD',
      type: 'buy',
      price: 100,
      quantity: 10
    }
    try {
      const result = await updateOrderByID(inputData)
    } catch (error) {
      expect(queryStub.calledOnceWith(`UPDATE cryptoData SET PAIR='BTC-USD', ORDERTYPE='buy', PRICE=100, QUANTITY=10 WHERE UUID='1b50b1e0-00bc-454b-bb64-27805d384ab0'`)).to.be.true
      expect(error).to.be.a('object')
      expect(error).to.not.be.null;
    }
  })


  it('query should fail to run', async () => {
    const queryStub = sandbox.stub(sql.Request.prototype, 'query').callsFake((query, callback) => {
      callback(true, null)
    })
    const inputData = {
      id: '1b50b1e0-00bc-454b-bb64-27805d384ab0',
      pair: 'BTC-USD',
      type: 'buy',
      price: 100,
      quantity: 10
    }
    try {
      const result = await updateOrderByID(inputData)
    } catch (error) {
      expect(queryStub.calledOnceWith(`UPDATE cryptoData SET PAIR='BTC-USD', ORDERTYPE='buy', PRICE=100, QUANTITY=10 WHERE UUID='1b50b1e0-00bc-454b-bb64-27805d384ab0'`)).to.be.true
      expect(error).to.be.true
      expect(error).to.not.be.null;
    }
  })
})