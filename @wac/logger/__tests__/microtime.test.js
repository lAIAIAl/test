describe('micro time', () => {
  it('#now() should return current time in microseconds', () => {
    Date.now = () => 10000000
    process.hrtime = () => [2, 123456]

    const microtime = require('../src/microtime')

    expect(microtime.now()).toBe(10000000 * 1e3 + +(2 * 1e6 + 123456 / 1e3).toFixed(0))
  })
})
