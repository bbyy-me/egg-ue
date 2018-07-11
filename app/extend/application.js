'use strict';

const Joi = require('joi');
const Boom = require('boom');
const fs = require('fs-async-await');

module.exports = {
  Joi,
  Boom,
  fs,

  async ajax(url, options) {
    const res = await this.curl(url, options);
    const { status } = res;
    if (status >= 200 && status < 300) {
      return res;
    }
    throw res;
  },
};
