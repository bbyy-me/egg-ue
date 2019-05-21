'use strict';

const Joi = require('joi');
const _ = require('lodash');
const Boom = require('boom');
const ajax = require('./ajax');

module.exports = {
  Joi, Boom,
  ajax,
  validate(schemas = {}) {
    const ctx = this;
    const defaultOpts = { abortEarly: false };
    const options = Object.assign({}, defaultOpts, schemas.options);

    const defaultValidateKeys = [ 'body', 'query', 'params', 'headers' ];
    const needValidateKeys = _.intersection(defaultValidateKeys, Object.keys(schemas));

    const errors = [];
    needValidateKeys.forEach(item => {
      const args = item === 'body' ? ctx.request.body : ctx[item];
      let opts = options;
      if (item === 'headers') {
        opts = Object.assign({}, options, { allowUnknown: true });
      }
      const result = Joi.validate(args, schemas[item], opts);
      if (result.error) {
        result.error.details.forEach(e => {
          e.location = item;
          errors.push(e);
        });
        return;
      }
      _.assignIn(args, result.value);
    });

    if (errors.length) {
      const error = Boom.badRequest('Arguments Error', errors);
      ctx.throw(error);
    }
  },
};
