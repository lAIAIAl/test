'use strict'

const Logger = require('../src/index')
const path = require('path')
const bunyan = require('bunyan')
const shell = require('shelljs')
const globby = require('globby')
const mkdirp = require('mkdirp')
const fs = require('fs')
const moment = require('moment')

const logsDir = path.join(__dirname, '../logs')
const rorateDir = path.join(__dirname, '../rorate')

describe('logger', () => {
  let ringBuffer
  process.stdout.write = jest.fn()

  beforeAll(() => {
    shell.rm('-rf', logsDir)
    shell.rm('-rf', rorateDir)
  })

  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    shell.rm('-rf', rorateDir)
  })

  afterEach(() => {
    shell.rm('-rf', logsDir)
  })

  beforeEach(() => {
    ringBuffer = new bunyan.RingBuffer()
  })

  it('日志必须提供一个name', () => {
    expect(() => new Logger()).toThrow('log name must be a non-empty string')
  })

  it('打印日志，不提供 transport 则打印到终端', () => {
    const logger = new Logger({ name: 'foo' })
    logger.addStream({
      type: 'raw',
      stream: ringBuffer,
      level: 'trace'
    })

    logger.info()
    logger.info('hi')
    logger.info('hi %s', 'xxx')
    logger.info({ foo: 'bar' }, 'hi')
    logger.info(new Error('boom'))
    logger.info(new Error('boom'), 'more on this: %s', 'xxx')
    logger.info({ foo: 'bar', err: new Error('boom') }, 'some msg about this error')
    logger.debug('hi')
    logger.warn('hi')
    logger.error('hi')

    const records = ringBuffer.records
    expect(records[0].msg).toBe('hi')
    expect(records[1].msg).toBe('hi xxx')
    expect(records[2].foo).toBe('bar')
    expect(records[3].err.message).toBe('boom')
    expect(records[3].msg).toBe('boom')
    expect(records[4].err.message).toBe('boom')
    expect(records[4].msg).toBe('more on this: xxx')
    expect(records[5].foo).toBe('bar')
    expect(records[5].err.message).toBe('boom')
    expect(records[5].msg).toBe('some msg about this error')

    const logger2 = new Logger({ name: 'bar', transports: [] })
    logger2.addStream({
      type: 'raw',
      stream: ringBuffer,
      level: 'trace'
    })

    logger.info('hi')
    expect(records[6].msg).toBe('hi')
  })

  it('指定 transport', () => {
    mkdirp.sync(logsDir)
    const logger = new Logger({
      name: 'foo',
      transports: [
        {
          type: 'rotating-file',
          path: path.join(logsDir, 'foo.log'),
          period: '1d',
          count: 3
        },
        {
          type: 'raw',
          stream: fs.createWriteStream(path.join(logsDir, 'bar.log'))
        }
      ]
    })
    logger.addStream({
      type: 'raw',
      stream: ringBuffer,
      level: 'trace'
    })

    logger.info('hi')

    const files = globby.sync(logsDir)
    expect(files.length).toBe(2)
  })

  it('打印日志源', () => {
    const logger1 = new Logger({ name: 'foo', src: true })
    logger1.addStream({
      type: 'raw',
      stream: ringBuffer,
      level: 'trace'
    })

    logger1.info('hi')

    const logger2 = new Logger({ name: 'bar' })
    logger2.addStream({
      type: 'raw',
      stream: ringBuffer,
      level: 'trace'
    })

    logger2.info('hi')

    const records = ringBuffer.records
    expect(records[0].src).toBeDefined()
    expect(records[1].src).toBeUndefined()
  })

  it('重写 rotate，日志备份以时间戳结尾', async () => {
    const logger = new Logger({
      name: 'foo',
      transports: [
        {
          type: 'rotating-file',
          path: path.join(rorateDir, 'foo.log'),
          period: '10ms',
          count: 2
        }
      ]
    })

    logger.info('hi')

    await new Promise(resolve => setTimeout(resolve, 100))

    const files = globby.sync([`${rorateDir}/foo.*.log`])
    expect(files.length).toBeGreaterThanOrEqual(1)
  })

  it('log.child', () => {
    const logger = new Logger({ name: 'foo' })
    const child = logger.child({ foo: 'bar' })
    child.addStream({
      type: 'raw',
      stream: ringBuffer,
      level: 'trace'
    })

    child.info('hi')

    const records = ringBuffer.records
    expect(records[0].foo).toBe('bar')
  })

  it('addStream 添加的输出流，文件名增加时间戳', () => {
    bunyan.prototype.addStream = jest.fn()
    const now = moment().format('YYYYMMDDHHmmss')
    const logger = new Logger({ name: 'foo' })

    logger.addStream({
      type: 'file',
      path: '/tmp/foo.log'
    })
    const replacedPath = bunyan.prototype.addStream.mock.calls[1][0].path
    const { name } = path.parse(replacedPath)
    expect(+now).toBeLessThanOrEqual(+name.split('.')[1])
  })
})
