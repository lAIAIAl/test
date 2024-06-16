'use strict'

const HarmonyCache = require('../../src/cache/harmony')
const fs = require('fs')
const { promisify } = require('util')
const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)

const cacheDir = '/tmp/.harmony'

const logger = {
  warn: jest.fn()
}

describe('cache/harmony.js', () => {
  it('加载缓存服务器列表', async () => {
    const serverList = [
      {
        host: '127.0.0.1',
        port: 8080,
        weight: 0
      }
    ]

    await mkdir('/tmp/.harmony/', { recursive: true })
    await writeFile('/tmp/.harmony/harmony.json', JSON.stringify(serverList))

    const harmonyCache = new HarmonyCache(cacheDir, { logger })
    await harmonyCache.load()
    expect(harmonyCache.serverList).toEqual(serverList)
  })

  it('更新服务器列表', async () => {
    const harmonyCache = new HarmonyCache(cacheDir, { logger })
    harmonyCache.writeback = jest.fn()
    await harmonyCache.load()

    const serverList = [
      {
        host: '127.0.0.1',
        port: 8081,
        weight: 0
      }
    ]
    harmonyCache.serverList = serverList
    expect(harmonyCache.writeback).toBeCalledTimes(1)
    expect(harmonyCache.serverList).toEqual(serverList)
  })
})
