
const Jasmine = require('../src/index')
const path = require('path')
const Cache = require('../src/cache')
const Looper = require('../src/looper')
const Harmony = require('@wac/js-harmony')

describe('module', () => {

  let jasmine = null
  let mod = null

  beforeEach(() => {
    jasmine = new Jasmine({
      env: 'test',
      unit: 'default',
      diskPath: path.join(__dirname, '../data')
    })
    jasmine.cache = new Cache()
    jasmine.harmony = new Harmony({ env: 'test', unit: 'default' })

    const defaultOptions = {
      env: 'test', // 环境，挖财已有的环境包括：test, production, staging
      unit: 'default', // unit:  表示单元，通过环境变量APP_IDC获取，挖财已有的单元包括：hzxs,hzxs3,hzqsh,hzifc，如果没有配置环境变量可以写default,harmony会返回同机房的jasmine服务器地址
      crossUnit: 2 // 默认为2。需要跨单元的场景只需要在查询时加上crossUnit参数 1:支持跨单元 2:不支持；跨单元指的是,在本单元没有可服务的节点时,流量路由到中心单元
    }

    jasmine.harmony.cache.set('harmonyNodeConfig', defaultOptions)

    jasmine.harmony.cache.set('harmonyNodeServerIPList', [
      {
      "host": "172.16.76.16",
      "port": 8080,
      "weight": 0
      }
      ])

    mod = jasmine.getModule('loan-leap', 'leap-h5')
  })
    
    it('shoulde return value when getConfig with cache', async () => { 
        jasmine.cache.set('loan-leap', 'leap-h5', '测试')
        const config = await mod.getConfig()
        expect(config).toBe('测试')
    })

    it('shoulde return value when getConfig with net', async () => { 
        let config = await mod.getConfig()
        expect(config.TEST2).toBe('\"值kkkk111111\"')
    })

    it('shoulde return value when getConfigByKey with cache', async () => { 
        jasmine.cache.set('loan-leap', 'leap-h5', {test:'测试'})
        const config = await mod.getConfigByKey('test')
        expect(config).toBe('测试')
    })

    it('shoulde return value when getConfigByKey with net', async () => { 
        let config = await mod.getConfigByKey('TEST2')
        config = JSON.parse(config)
        expect(config).toBe('\"值kkkk111111\"')
    })

    it('shoulde return empty when getConfigByKey with disk', async () => { 
        let config = await mod.getConfigByKey()
        const obj = {}
        expect(config).toMatchObject(obj)
    })

    it('shoulde return success when add', async () => { 
      let config = await mod.add('unit','1')
      expect(config.code).toBe(1)
    })

    it('shoulde return error when add', async () => { 
      let config = await mod.add()
      expect(config.error).toBe('参数错误')
    })

    it('shoulde return success when update', async () => { 
      let config = await mod.update('unit','1')
      expect(config.code).toBe(0)
    })


    it('shoulde return value when getConfig with disk', async () => { 

      const defaultOptions2 = {
        env: 'test', // 环境，挖财已有的环境包括：test, production, staging
        unit: 'default', // unit:  表示单元，通过环境变量APP_IDC获取，挖财已有的单元包括：hzxs,hzxs3,hzqsh,hzifc，如果没有配置环境变量可以写default,harmony会返回同机房的jasmine服务器地址
        crossUnit: 2 // 默认为2。需要跨单元的场景只需要在查询时加上crossUnit参数 1:支持跨单元 2:不支持；跨单元指的是,在本单元没有可服务的节点时,流量路由到中心单元
      }

      jasmine.harmony.cache.set('harmonyNodeConfig', defaultOptions2)

      jasmine.harmony.cache.set('harmonyNodeServerIPList', [
        {
        "host": "172.16.84.0",
        "port": 8080,
        "weight": 0
        }
        ])
      let mod2 = jasmine.getModule('loan-leap', 'leap-h5')
      let config = await mod2.getConfig()
      expect(config.UNIT).toBe('\"1\"')
  })


  it('shoulde return value when getConfigByKey with disk', async () => { 
    const defaultOptions2 = {
      env: 'test', // 环境，挖财已有的环境包括：test, production, staging
      unit: 'default', // unit:  表示单元，通过环境变量APP_IDC获取，挖财已有的单元包括：hzxs,hzxs3,hzqsh,hzifc，如果没有配置环境变量可以写default,harmony会返回同机房的jasmine服务器地址
      crossUnit: 2 // 默认为2。需要跨单元的场景只需要在查询时加上crossUnit参数 1:支持跨单元 2:不支持；跨单元指的是,在本单元没有可服务的节点时,流量路由到中心单元
    }

    jasmine.harmony.cache.set('harmonyNodeConfig', defaultOptions2)

    jasmine.harmony.cache.set('harmonyNodeServerIPList', [
      {
      "host": "172.16.84.0",
      "port": 8080,
      "weight": 0
      }
      ])
    let mod2 = jasmine.getModule('loan-leap', 'leap-h5')
    let config = await mod2.getConfigByKey('unit')
    expect(config).toBe('\"1\"')
  })


  it('shoulde return value when Looper probeConfig', async () => { 
    jasmine.cache.set('loan-leap', 'leap-aas', {test:'测试23122'})

    const looper = new Looper(jasmine)
    looper.probeConfig()
    let config = await mod.getConfigByKey('unit')
    config = JSON.parse(config)
    expect(config).toBe('\"1\"')
  })




})