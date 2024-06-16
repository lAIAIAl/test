
const Index = require('../src/index')
const Util = require('../src/util')
const remoteRequest = require('../src/remote-request')

describe('index', () => {
    
    it('shoulde return right value when init', () => { 
        global.harmonyNodeCache = {}
        Index.init({ env: 'test' })
        const getData = Util.getHarmonyConfig()
        expect(getData.env).toBe('test')
    })

    test('shoulde return ip when getServer', async () => {
        global.harmonyNodeCache = {}
        Index.init()
        Index.init({ env: 'test' })

        const domain = 'jasmineserver.wacai.info'
        const res1 = await remoteRequest.getHarmonyServerIPList()

        const data1 = Util.descendSortByWeight(res1.data)
        Util.setHarmonyIP(data1)
        Index.getServer()
        Index.getServer(domain)

        const options = Object.assign({}, Util.getHarmonyConfig(), {
            domain
          })

        const res = await remoteRequest.getDomainServerIPList(options)

        if (res && res.code === 0 && res.data && res.data.length) {
            const data = Util.descendSortByWeight(res.data)
            const getData = Util.randomValueWithArray(data) || {}
            expect(getData.host).toBeTruthy()
          }  
    })


    test('shoulde return hello jasmine when getData', async () => {
        global.harmonyNodeCache = {}
        Index.init({ env: 'test' })

        const res1 = await remoteRequest.getHarmonyServerIPList()

        const data1 = Util.descendSortByWeight(res1.data)
        Util.setHarmonyIP(data1)
        Index.getData()
        const res = await Index.getData({
            url: 'http://jasmineserver.wacai.info/jasmine/getConfig',
            qs: {
              module: 'jasmine_demo',
              subModule: 'quick_start',
              key: 'test'
            }
          })

          expect(res.data.value).toBe('hello jasmine')
    })

})