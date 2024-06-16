'use strict'

const Cache = require('../../src/cache/base')
const fs = require('fs')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)

const logger = {
  warn: jest.fn()
}

describe('cache/base.js', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('读取本地缓存失败', async () => {
    const cache = new Cache({ logger })
    const ret = await cache.load('/tmp/foo/no-exists')
    expect(ret).toEqual(null)
    expect(logger.warn).toBeCalledTimes(1)
  })

  it('缓存文件已损坏', async () => {
    const cache = new Cache({ logger })
    const filename = '/tmp/harmony-cache'
    await writeFile(filename, 'balabala')
    const ret = await cache.load(filename)
    expect(ret).toEqual(null)
    expect(logger.warn).toBeCalledTimes(1)
  })

  it('正确加载缓存', async () => {
    const cache = new Cache({ logger })
    const filename = '/tmp/harmony-cache'
    await writeFile(filename, '{}')
    const ret = await cache.load(filename)
    expect(ret).toEqual({})
  })

  it('写缓存成功', async () => {
    const cache = new Cache({ logger })
    const filename = '/tmp/harmony-cache'
    await cache.writeback(filename, { foo: 'bar' })
    expect(logger.warn).not.toBeCalled()
  })

  it('写缓存失败', async () => {
    const cache = new Cache({ logger })
    const filename = '/foo/bar'
    await cache.writeback(filename)
    expect(logger.warn).toBeCalledTimes(1)
  })
})
