'use strict'

const Harmony = require('../src/index')

jest.mock('@wac/hakone', () => {
  return () => {
    return Promise.resolve({
      data: {
        code: 1,
        errorMessage: 'balabala'
      }
    })
  }
})

const logger = {
  warn: jest.fn()
}

describe('index.js', () => {
  it('获取 harmony 服务器列表失败', async () => {
    const harmony = new Harmony({ env: 'test' })
    harmony._init = jest.fn(() => Promise.resolve())
    await expect(harmony._getServerList()).rejects.toThrow()
  })

  it('获取节点列表失败', async () => {
    const harmony = new Harmony({ env: 'test' })
    harmony._init = jest.fn(() => Promise.resolve())
    harmony._selectHarmonyServer = jest.fn(() => '')
    await expect(harmony._getNodeList()).rejects.toThrow()
  })

  it('探测节点信息失败', async () => {
    const harmony = new Harmony({ env: 'test', logger })
    harmony._init = jest.fn(() => Promise.resolve())
    harmony._selectHarmonyServer = jest.fn(() => '')
    harmony.domainNodeCache = {
      all: jest.fn(() => {
        return {
          default: {
            'jasmineserver.wacai.info': {
              default: {
                tags: {},
                nodeList: ['172.16.65.25:8080:10', '172.16.65.129:8080:10']
              }
            }
          }
        }
      })
    }
    await harmony._probe()
    expect(logger.warn).toBeCalledTimes(1)
  })
})
