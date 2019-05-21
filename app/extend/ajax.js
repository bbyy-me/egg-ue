'use strict';

const Boom = require('boom');
function getMessageFromError(err) {
  if (typeof err === 'string') return err;
  return err.message || err.msg || err.toString();
}
module.exports = async function ajax(url, options, errMaker) {
  const res = await this.curl(url, options);
  const { status, data } = res;
  if (status >= 200 && status < 300) {
    return res;
  }

  if (typeof errMaker === 'function') {
    throw errMaker(res);
  }

  let message = '';
  if (typeof data === 'string') {
    message = data;
  } else if (data.error) {
    message = getMessageFromError(data.error);
  } else if (data.err) {
    message = getMessageFromError(data.err);
  }
  message = message || '';

  throw new Boom(message, {
    statusCode: status,
    data,
  });
};
