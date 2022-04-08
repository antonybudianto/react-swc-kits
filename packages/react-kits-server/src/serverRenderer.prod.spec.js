import React from 'react';

process.env.NODE_ENV = 'production';

jest.mock('fs');
const fs = require('fs');

let serverRenderer;
describe('serverRenderer', () => {
  beforeAll(() => {
    fs.readFileSync.mockReturnValue('{}');
    serverRenderer = require('./serverRenderer').default;
  });

  test('works with minimum setup', done => {
    serverRenderer({
      expressCtx: {
        req: {
          query: {}
        },
        res: {}
      },
      context: {},
      onRender: () => <div>test123</div>
    }).then(str => {
      expect(str).toMatch(/test123/);
      done();
    });
  });

  test('works with minimum setup - with shell', done => {
    serverRenderer({
      expressCtx: {
        req: {
          query: {
            'rkit-shell': true
          }
        },
        res: {}
      },
      context: {},
      onRender: () => <div>test123</div>
    }).then(str => {
      expect(str).toMatch(/window\.__shell__ = true/);
      done();
    });
  });
});
