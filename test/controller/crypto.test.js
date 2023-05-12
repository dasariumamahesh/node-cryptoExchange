const axios = require('axios')
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect

const { getPrice } = require('../../controller/crypto');

describe('getPrice function', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return price in success case', async () => {
    const price = 500;
    const axiosResponse = {
      data: {
        ['USD']: price,
      },
    };

    const axiosStub = sandbox.stub(axios, 'get').resolves(axiosResponse);
    const res = {};
    const result = await getPrice(res, 'ETH', 'USD');
    expect(result).to.equal(price);
    expect(axiosStub.callCount).to.equal(1);
  });

  it('should return error when axios call fails', async () => {
    const axiosResponse = {
      data: {
        Response: 'Error',
        Message:'An error occurred',
      },
    };

    const axiosStub = sandbox.stub(axios, 'get').resolves(axiosResponse);
    const res = {};
    try{
      await getPrice(res, 'ETH', 'USD')
    }catch(error){
      expect(axiosStub.callCount).to.equal(1);
      expect(axiosStub.getCall(0).args[1]).to.deep.equal({
        headers: {
          Authorization: `Bearer ${process.env.CRYPTO_KEY}`,
        },
      });
    }
  });
});
