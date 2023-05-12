const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const { createOrder, getAllOrders, getOrderByID, updateOrderByID } = require('../../controller/controller');
const mssql = require('../../db/mssql');
const crypto = require('../../controller/crypto');

describe('createOrder function test cases', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should create a new order successfully', async () => {
    const req = {
      body: {
        pair: 'ETH-BTC',
        price: 1234,
        side: 'buy',
        quantity: 1.23,
        type: 'limit'
      }
    };
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const getPriceStub = sandbox.stub(crypto, 'getPrice').resolves(1212);
    const createOrderStub = sandbox.stub(mssql, 'createOrder').resolves('Order is created successfully.');
    await createOrder(req, res);
    expect(createOrderStub.calledOnce).to.be.true;
    expect(getPriceStub.calledOnce).to.be.false;
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should create a new order successfully by getting the price from crypto exchange', async () => {
    const req = {
      body: {
        pair: 'ETH-BTC',
        side: 'buy',
        quantity: 1.23,
        type: 'limit'
      }
    };
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const getPriceStub = sandbox.stub(crypto, 'getPrice').resolves(1212);
    const createOrderStub = sandbox.stub(mssql, 'createOrder').resolves('Order is created successfully.');
    await createOrder(req, res);
    expect(createOrderStub.calledOnce).to.be.true;
    expect(getPriceStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should handle errors during order creation', async () => {
    const req = {
      body: {
        pair: 'ETH-BTC',
        side: 'buy',
        quantity: 1.23,
        type: 'limit'
      }
    };
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const getPriceStub = sandbox.stub(crypto, 'getPrice').resolves(1234);
    const createOrderStub = sandbox.stub(mssql, 'createOrder').rejects('Error creating order.');

    try{
      await createOrder(req, res);
    }catch(error){
      expect(createOrderStub.calledOnce).to.be.true;
      expect(getPriceStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
    }

  });

  it('should handle errors during price retrieval', async () => {
    const req = {
      body: {
        pair: 'ETH-BTC',
        side: 'buy',
        quantity: 1.23,
        type: 'limit'
      }
    };
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const getPriceStub = sandbox.stub(crypto, 'getPrice').rejects({ Message: 'Error retrieving price.' });

    await createOrder(req, res);
    expect(getPriceStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});


describe('getAllOrders function test cases', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should fetch all orders successfully', async () => {
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const getAllOrdersStub = sandbox.stub(mssql, 'getAllOrders').resolves('fetched all details sucessfully');
    await getAllOrders(null, res);
    expect(getAllOrdersStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should handle errors during getAllOrders', async () => {
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const getAllOrdersStub = sandbox.stub(mssql, 'getAllOrders').rejects(true);
    try{
      await getAllOrders(null, res);
    }catch(error){
      expect(getAllOrdersStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
    } 
  });
});



describe('getOrderByID function test cases', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should fetch order details by id successfully', async () => {
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const req = {
      params: {
        id: "1b50b1e0-00bc-454b-bb64-27805d384ab0"
      }
    };
    const getOrderByIDStub = sandbox.stub(mssql, 'getOrderByID').resolves(true);
    await getOrderByID(req, res);
    expect(getOrderByIDStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should handle errors while fetching getOrderByID', async () => {
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const req = {
      params: {
        id: "1b50b1e0-00bc-454b-bb64-27805d384ab0"
      }
    };
    const getOrderByIDStub = sandbox.stub(mssql, 'getOrderByID').rejects(true);
    try {
      await getOrderByID(req, res);
    } catch (error) {
      expect(getOrderByIDStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
    }
  });
});


describe('updateOrderByID function test cases', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should update the order successfully', async () => {
    const req = {
      body: {
        pair: 'ETH-BTC',
        price: 1234,
        side: 'buy',
        quantity: 1.23,
        type: 'limit'
      }
    };
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const getPriceStub = sandbox.stub(crypto, 'getPrice').resolves(100);
    const updateOrderByIDStub = sandbox.stub(mssql, 'updateOrderByID').resolves('Order is updated successfully.');
    await updateOrderByID(req, res);
    expect(updateOrderByIDStub.calledOnce).to.be.true;
    expect(getPriceStub.calledOnce).to.be.false;
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should update the order successfully by getting the price from crypto exchange', async () => {
    const req = {
      body: {
        pair: 'ETH-BTC',
        side: 'buy',
        quantity: 1.23,
        type: 'limit'
      }
    };
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const getPriceStub = sandbox.stub(crypto, 'getPrice').resolves(100);
    const updateOrderByIDStub = sandbox.stub(mssql, 'updateOrderByID').resolves('Order is updated successfully.');
    await updateOrderByID(req, res);
    expect(updateOrderByIDStub.calledOnce).to.be.true;
    expect(getPriceStub.calledOnce).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should handle errors during order update', async () => {
    const req = {
      body: {
        pair: 'ETH-BTC',
        side: 'buy',
        price: 99,
        quantity: 1.23,
        type: 'limit'
      }
    };
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const updateOrderByIDStub = sandbox.stub(mssql, 'updateOrderByID').rejects('Error updating order.');

    try{
      await updateOrderByID(req, res);
    }catch(error){
      expect(updateOrderByIDStub.calledOnce).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
    }
  });

  it('should handle errors during price retrieval', async () => {
    const req = {
      body: {
        pair: 'ETH-BTC',
        side: 'buy',
        quantity: 1.23,
        type: 'limit'
      }
    };
    const res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
    const getPriceStub = sandbox.stub(crypto, 'getPrice').rejects(true);
    
    await updateOrderByID(req, res);
    expect(getPriceStub.calledOnce).to.be.true;
    expect(res.status.calledWith(500)).to.be.true;
  });
});