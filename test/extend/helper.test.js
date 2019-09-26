'use strict';

const { app, assert/* , mock*/ } = require('egg-mock/bootstrap');
const lodash = require('lodash');
const uuid = require('uuid');

describe('test/extend/helper.test.js', () => {
  describe('xor', () => {
    it('xor 1', () => {
      const ctx = app.mockContext();
      const xor = ctx.helper.xor;
      const result = xor([ 2, 1, 3 ], [ 2, 4, 6, 1 ]);
      assert.deepEqual(result.toDel, [ 3 ]);
      assert.deepEqual(result.toAdd, [ 4, 6 ]);
    });
    it('xor 2', () => {
      const ctx = app.mockContext();
      const xor = ctx.helper.xor;
      const result = xor([], [ 2, 4, 1 ]);
      assert.deepEqual(result.toAdd, [ 2, 4, 1 ]);
      assert(result.toDel.length === 0);
    });
    it('xor 3', () => {
      const ctx = app.mockContext();
      const xor = ctx.helper.xor;
      const result = xor([ 2, 1, 3 ], []);
      assert.deepEqual(result.toDel, [ 2, 1, 3 ]);
      assert(result.toAdd.length === 0);
    });

    it('xor string', () => {
      const ctx = app.mockContext();
      const xor = ctx.helper.xor;
      const result = xor([ 'bang', 'leo', 'yao', 'long' ], [ 'leo', 'bang', 'deng', 'yang' ]);
      assert.deepEqual(result.toDel, [ 'yao', 'long' ]);
      assert.deepEqual(result.toAdd, [ 'deng', 'yang' ]);
    });
  });

  describe('uuid && lodash', () => {
    it('should true', () => {
      const ctx = app.mockContext();
      assert(ctx.helper.uuid === uuid);
      assert(ctx.helper._ === lodash);
    });
  });

  describe('password', () => {
    it('hash & compare', async () => {
      const ctx = app.mockContext();
      const originalPassword = '1234';
      const hashPassword = await ctx.helper.password.hash(originalPassword);
      const hashPassword2 = await ctx.helper.password.hash(originalPassword);
      console.log(hashPassword);
      console.log(hashPassword2);
      assert(originalPassword !== hashPassword);
      assert(hashPassword !== hashPassword2);
      assert(await ctx.helper.password.compare(originalPassword, hashPassword));
      assert(await ctx.helper.password.compare(originalPassword, hashPassword2));
      assert(!(await ctx.helper.password.compare(originalPassword, hashPassword + '123')));
    });
  });

  describe('exec', () => {
    it('exec ls', async () => {
      const ctx = app.mockContext();
      const resAsync = await ctx.helper.exec(`ls ${__dirname}`);
      assert(resAsync.stderr === '');
      assert(resAsync.stdout === 'application.test.js\ncontext.test.js\nhelper.test.js\ntest_file\n');
    });
  });

  describe('pagination', () => {
    it('default args', () => {
      const ctx = app.mockContext();
      const res = ctx.helper.pagination();
      assert(res.prev === null);
      assert(res.data.length === 0);
    });
    it('count < limit', () => {
      const ctx = app.mockContext();
      const data = [ 1, 2, 3, 4, 5, 6 ];
      const res = ctx.helper.pagination(data, 1, 10);
      assert(res.data.length === data.length);
      assert(res.prev === null);
      assert(res.count === data.length);
    });
  });

  describe('urlconcat', () => {
    it('urlconcat', async () => {
      const ctx = app.mockContext();
      assert(ctx.helper.urlconcat('http://localhost:8080/', 'api/search', 'something', '?a=b&b=c'),
        'http://localhost:8080/api/search/something?a=b&b=c');
    });
  });
});
