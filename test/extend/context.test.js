'use strict';
const Boom = require('boom');
const Joi = require('joi');
const { app, assert/* , mock*/ } = require('egg-mock/bootstrap');

describe('test/extend/context.test.js', () => {

  describe('validate', () => {
    it('should true', () => {
      const ctx = app.mockContext({
        query: {
          limit: 10,
          page: 1,
        },
      });
      const result = ctx.validate({
        query: {
          limit: ctx.Joi.number().required(),
          page: ctx.Joi.number().required(),
        },
      });
      assert(result === undefined);
    });
    describe('app Boom & Joi', () => {
      it('should true', () => {
        const ctx = app.mockContext();
        assert(ctx.Boom === Boom);
        assert(ctx.Joi === Joi);
      });
    });

    describe('ajax', () => {
      it('test success: statusCode<200 or statusCode>=300', async () => {
        const ctx = app.mockContext();
        try {
          await ctx.ajax('https://www.bbyy.me/not-found-404');
          const num = 2;
          assert(num === 1);
        } catch (err) {
          if (err.code === 'ERR_ASSERTION') {
            throw err;
          }
          assert(err.status === 404);
        }
      });
      it('test failed: 200=<statusCode<300', async () => {
        const ctx = app.mockContext();
        await ctx.ajax('https://www.bbyy.me');
      });
      it('test bad host', async () => {
        const ctx = app.mockContext();
        try {
          await ctx.ajax('https://undefined/not-found-404');
        } catch (err) {
          assert(err.code === 'ENOTFOUND');
          assert(err.status === -1);
        }
      });
    });
  });
});
