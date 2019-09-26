'use strict';

const Boom = require('boom');
const Joi = require('joi');
const { app, assert/* , mock*/ } = require('egg-mock/bootstrap');

describe('test/extend/application.test.js', () => {

  describe('app Boom & Joi', () => {
    it('should true', () => {
      assert(app.Boom === Boom);
      assert(app.Joi === Joi);
    });
  });

  describe('ajax', () => {
    it('test success: 200=<statusCode<300', async () => {
      try {
        await app.ajax('https://www.bbyy.me/not-found-404');
        const num = 2;
        assert(num === 1);
      } catch (err) {
        if (err.code === 'ERR_ASSERTION') {
          throw err;
        }
        assert(err.status === 404);
      }
    });

    it('test failed: statusCode<200 or statusCode>=300', async () => {
      await app.ajax('https://www.bbyy.me');
    });
  });
});
