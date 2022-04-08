import React from 'react';

process.env.NODE_ENV = 'development';

jest.mock('fs');
const fs = require('fs');

const existsSyncOri = fs.existsSync;

let serverRenderer;

describe('serverRenderer-dev', () => {
  beforeAll(() => {
    fs.readFileSync.mockReturnValue('{}');
    fs.existsSync.mockImplementation(str => {
      if (/dist\/vendorDll\.js/.test(str)) {
        return false;
      }
      return existsSyncOri(str);
    });
    serverRenderer = require('./serverRenderer').default;
  });

  test('works with minimum setup', done => {
    serverRenderer({
      expressCtx: {
        req: {
          query: {}
        },
        res: {
          locals: {
            webpackStats: {
              toJson: () => ({
                assetsByChunkName: {
                  app: ['app.js', 'app.css'],
                  vendor: ['vendor.js', 'vendor.css']
                }
              })
            }
          }
        }
      },
      context: {},
      onRender: () => <div>test123</div>
    }).then(str => {
      expect(str).toMatch(/test123/);
      done();
    });
  });

  test('works with minimum setup - with DLL', done => {
    fs.existsSync.mockImplementation(str => {
      if (/dist\/vendorDll\.js/.test(str)) {
        return true;
      }
      return existsSyncOri(str);
    });
    serverRenderer({
      expressCtx: {
        req: {
          query: {}
        },
        res: {
          locals: {
            webpackStats: {
              toJson: () => ({
                assetsByChunkName: {
                  app: ['app.js', 'app.css'],
                  vendor: ['vendor.js', 'vendor.css']
                }
              })
            }
          }
        }
      },
      context: {},
      onRender: () => <div>test123</div>
    }).then(str => {
      expect(str).toMatch(/test123/);
      expect(str).toMatch("<script src='/vendorDll.js'></script>");
      done();
    });
  });

  test('works with no style', done => {
    serverRenderer({
      expressCtx: {
        req: {
          query: {}
        },
        res: {
          locals: {
            webpackStats: {
              toJson: () => ({
                assetsByChunkName: {
                  app: ['app.js'],
                  vendor: ['vendor.js']
                }
              })
            }
          }
        }
      },
      context: {},
      onRender: () => <div>test123</div>
    }).then(str => {
      expect(str).not.toMatch(/(app|vendor)\.css/);
      done();
    });
  });

  test('async onRender', done => {
    serverRenderer({
      expressCtx: {
        req: {
          query: {}
        },
        res: {
          locals: {
            webpackStats: {
              toJson: () => ({
                assetsByChunkName: {
                  app: ['app.js'],
                  vendor: ['vendor.js']
                }
              })
            }
          }
        }
      },
      context: {},
      onRender: async () => <div>test123</div>
    }).then(str => {
      expect(str).toMatch(/test123/);
      done();
    });
  });
});
