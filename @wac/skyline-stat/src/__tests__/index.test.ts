// import Stat, { __stat__ } from '../index';

// jest.mock('load-script', () => {
//   return jest.fn((url, cb) => {
//     cb();
//   });
// });

// import { Promise } from 'es6-promise';

// jset.mock('load-script', () => {
//   return jest.fn((url, cb) => {
//     cb()
//   })
// })

// jest.mock('../src/logger')

// let util: UtilType, loadScript, sa, sendLogger

// beforeEach(() => {
//   jest.resetModules()
//   jest.resetAllMocks()

//   loadScript = require('load-script')
//   sendLogger = require('@wac/skyline-core/lib/logger')

//   util = require('@wac/skyline-core/lib/util')
//   sa = require('sa-sdk-javascript')

//   sa.track = jest.fn()
//   sa.init = jest.fn()
//   sa.registerPage = jest.fn()
//   util.getReferrer = jest.fn().mockReturnValue('')
// });

test('包含必要方法', () => {
  // expect(__stat__).toEqual(expect.any(Object));
  // expect(Stat.init).toEqual(expect.any(Function));
  // expect(Stat.send).toEqual(expect.any(Function));
  // expect(Stat.trackSinglePage).toEqual(expect.any(Function));
});
