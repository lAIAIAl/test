
const Util = require('../src/util')
const remoteRequest = require('../src/remote-request')
const Index = require('../src/index')

describe('remote-request', () => {
    
    test('shoulde return null when getDomainServerIPList with no cache', async () => {
        global.harmonyNodeCache = {}
        const res1 = remoteRequest.getDomainServerIPList()
        expect(res1).toBeNull()

    })

    test('shoulde return {} when getRandomDomainIP with no domain', async () => {
        const res1 = remoteRequest.getRandomDomainIP('')
        expect(res1.host).toBeUndefined()
    })

    test('shoulde return {} when getRandomDomainIP with domain null', async () => {
        const res1 = remoteRequest.getRandomDomainIP()
        expect(res1.host).toBeUndefined()
    })
    
    test('shoulde return {} when getRandomDomainIP with error', async () => {
        global.harmonyNodeCache = {}
        Index.init({ env: 'test' })

        //const domain = 'jasmineserver.wacai.info'
        const res1 = await remoteRequest.getHarmonyServerIPList()

        const data1 = Util.descendSortByWeight(res1.data)
        Util.setHarmonyIP(data1)

        const res2 = await remoteRequest.getRandomDomainIP('abc')
        expect(res2.host).toBeUndefined()
    })

    test('shoulde return {} when getDataWithUrl with no url', async () => {
        const res1 = remoteRequest.getDataWithUrl('')
        expect(res1.code).toBeUndefined()
    })

})