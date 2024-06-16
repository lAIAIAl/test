'use strict'

const DomainNodeCache = require('../../src/cache/domain-node')
const fs = require('fs')
const { promisify } = require('util')
const mkdir = promisify(fs.mkdir)
const writeFile = promisify(fs.writeFile)

const cacheDir = '/tmp/.harmony'

const logger = {
  warn: jest.fn()
}

describe('cache/domain-node.js', () => {
  it('加载域名节点列表', async () => {
    const nodes = {
      default: {
        'jasmineserver.wacai.info': {
          default: {
            tags: {},
            nodeList: ['172.16.65.25:8080:10', '172.16.65.129:8080:10', '172.16.105.209:8080:-1']
          }
        }
      }
    }

    await mkdir('/tmp/.harmony/test/1', { recursive: true })
    await writeFile('/tmp/.harmony/test/1/cache.json', JSON.stringify(nodes))

    const domainNodeCache = new DomainNodeCache(cacheDir, 'test', 1, { logger })
    await domainNodeCache.load()

    const nodeList = domainNodeCache.getNodeList('jasmineserver.wacai.info', 'default', 'default')
    expect(nodeList).toEqual([
      {
        host: '172.16.65.25',
        port: 8080,
        weight: 10
      },
      {
        host: '172.16.65.129',
        port: 8080,
        weight: 10
      },
      {
        host: '172.16.105.209',
        port: 8080,
        weight: -1
      }
    ])

    const noExistsList = domainNodeCache.getNodeList('xxx', 'default', 'default')
    expect(noExistsList).toEqual([])
  })

  it('更新域名节点列表', async () => {
    const domainNodeCache = new DomainNodeCache(cacheDir, 'test', 1, { logger })
    await domainNodeCache.load()
    domainNodeCache.writeback = jest.fn()

    const nodeList = [
      {
        host: '172.16.65.25',
        port: 8080,
        weight: 10
      }
    ]
    domainNodeCache.updateNodeList('sufang.test', 'default', 'default', {}, nodeList)
    expect(domainNodeCache.writeback).toBeCalledTimes(1)

    domainNodeCache.updateNodeList('sufang.test', 'default', 'default', {}, [])
    const cachedList = domainNodeCache.getNodeList('sufang.test', 'default', 'default')
    expect(cachedList).toEqual([])
  })

  it('获取所有节点信息', async () => {
    const domainNodeCache = new DomainNodeCache(cacheDir, 'test', 1, { logger })
    expect(domainNodeCache.all()).toEqual({})
  })
})
