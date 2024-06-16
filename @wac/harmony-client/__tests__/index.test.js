'use strict'

const Harmony = require('../src/index')

jest.mock('../src/cache/harmony', () => {
  return class {
    constructor() {
      this.serverList = []
    }

    async load() {}
  }
})

jest.mock('../src/cache/domain-node', () => {
  return class {
    getNodeList() {
      return []
    }

    updateNodeList() {}

    all() {
      return {}
    }

    async load() {}
  }
})

jest.useFakeTimers()

const logger = {
  debug: jest.fn(),
  warn: jest.fn()
}

describe('index.js', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('初始化', async () => {
    const harmony = new Harmony({ env: 'test' })
    harmony._runSchedule = jest.fn()

    await harmony.ready()
    expect(harmony._runSchedule).toBeCalledTimes(1)
  })

  it('初始化失败', async () => {
    const harmony = new Harmony({ env: 'test' })
    harmony._runSchedule = jest.fn()
    harmony._getServerList = jest.fn(() => Promise.reject(new Error('boom')))

    await expect(harmony.ready()).rejects.toThrow('boom')
  })

  it('getNodeList', async () => {
    const harmony = new Harmony({ env: 'test' })
    harmony._runSchedule = jest.fn()

    await harmony.ready()
    const nodeList = await harmony.getNodeList('jasmineserver.wacai.info')
    expect(nodeList.length).toBeGreaterThanOrEqual(0)

    harmony.domainNodeCache.getNodeList = jest.fn(() => {
      return [{ host: '172.16.65.25', port: 8080, weight: 10 }]
    })
    const cacheList = await harmony.getNodeList('jasmineserver.wacai.info')
    expect(cacheList).toEqual([{ host: '172.16.65.25', port: 8080, weight: 10 }])
  })

  it('getNode', async () => {
    const harmony = new Harmony({ env: 'test' })
    harmony._runSchedule = jest.fn()
    harmony.getNodeList = jest.fn(() => {
      return [
        { host: '172.16.65.25', port: 8080, weight: 10 },
        { host: '172.16.80.37', port: 8080, weight: 10 }
      ]
    })

    await harmony.ready()
    const node1 = await harmony.getNode('jasmineserver.wacai.info')
    expect(node1).not.toBeNull()

    harmony.getNodeList = jest.fn(() => [])
    const node2 = await harmony.getNode('jasmineserver.wacai.info')
    expect(node2).toBeNull()

    harmony.getNodeList = jest.fn(() => {
      return [
        { host: '172.16.65.25', port: 8080, weight: -1 },
        { host: '172.16.80.37', port: 8080, weight: -1 }
      ]
    })
    const node3 = await harmony.getNode('jasmineserver.wacai.info')
    expect(node3.weight).toBe(-1)
  })

  it('_runSchedule', async () => {
    const harmony = new Harmony({ env: 'test', logger })
    harmony.harmonyCache = {}
    harmony._init = jest.fn(() => Promise.resolve())
    harmony._getServerList = jest.fn()
    harmony._probe = jest.fn()

    const [harmonyTimer, probeTimer] = harmony._runSchedule()
    harmonyTimer.refresh = jest.fn()
    probeTimer.refresh = jest.fn()
    jest.runAllTimers()

    expect(harmony._getServerList).toBeCalledTimes(1)
    expect(harmony._probe).toBeCalledTimes(1)
  })

  it('轮询任务失败', async () => {
    const harmony = new Harmony({ env: 'test', logger })
    harmony.harmonyCache = {}
    harmony._init = jest.fn(() => Promise.resolve())
    harmony._getServerList = jest.fn(() => Promise.reject(new Error('boom')))
    harmony._probe = jest.fn(() => Promise.reject(new Error('boom')))

    const [harmonyTimer, probeTimer] = harmony._runSchedule()
    harmonyTimer.refresh = jest.fn()
    probeTimer.refresh = jest.fn()
    jest.runAllTimers()

    expect(logger.debug).not.toBeCalled()
  })

  it('_probe', async () => {
    const harmony = new Harmony({ env: 'test', logger })
    harmony._runSchedule = jest.fn()
    harmony._getNodeList = jest.fn()

    await harmony.ready()
    harmony.domainNodeCache.all = jest.fn(() => {
      return {}
    })
    await harmony._probe()

    harmony.domainNodeCache.all = jest.fn(() => {
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
    await harmony._probe()
    expect(harmony._getNodeList).toBeCalled()
  })

  it('_selectHarmonyServer', async () => {
    const harmony = new Harmony({ env: 'test', logger })
    harmony._runSchedule = jest.fn()
    harmony.harmonyCache = {
      serverList: [{ host: '127.0.0.1', port: 8081 }, { host: '127.0.0.1', port: 8082 }]
    }
    expect(harmony._selectHarmonyServer()).toBe('127.0.0.1:8081')
    expect(harmony._selectHarmonyServer()).toBe('127.0.0.1:8082')
    expect(harmony._selectHarmonyServer()).toBe('127.0.0.1:8081')
    expect(harmony._selectHarmonyServer()).toBe('127.0.0.1:8082')
  })

  it('无 appGroup 参数与 appGroup 为 undefined 或 null 时，获取缓存结果一致', async () => {
    const harmony = new Harmony({ env: 'test', logger })
    harmony._runSchedule = jest.fn()

    await harmony.ready()

    harmony.domainNodeCache.getNodeList = jest.fn((domain, unit, tagsMd5) => {
      return tagsMd5 === 'default'
        ? [{ host: '172.16.65.25', port: 8080, weight: 10 }]
        : [{ host: '172.16.65.25', port: 8081, weight: 10 }]
    })
    const cacheList1 = await harmony.getNodeList('jasmineserver.wacai.info')
    expect(cacheList1).toEqual([{ host: '172.16.65.25', port: 8080, weight: 10 }])

    const cacheList2 = await harmony.getNodeList('jasmineserver.wacai.info', {
      tags: { appGroup: undefined }
    })
    expect(cacheList2).toEqual([{ host: '172.16.65.25', port: 8080, weight: 10 }])

    const cacheList3 = await harmony.getNodeList('jasmineserver.wacai.info', {
      tags: { appGroup: null }
    })
    expect(cacheList3).toEqual([{ host: '172.16.65.25', port: 8080, weight: 10 }])
  })
})
