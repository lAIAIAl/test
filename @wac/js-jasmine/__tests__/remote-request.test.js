
const Util = require('../src/util')
const remoteRequest = require('../src/remote-request')
const Index = require('../src/index')

describe('remote-request', () => {
    
    
    test('shoulde return null when getProbeConfig', () => {
        const obj = {}
        const data = remoteRequest.getProbeConfig()
        expect(data).toMatchObject(obj)

    })

    test('shoulde return null when getConfig with no params', () => {
        const obj = {}
        const data = remoteRequest.getConfig()
        expect(data).toMatchObject(obj)

    })

    test('shoulde return null when getConfigByKey with no params', () => {
        const obj = {}
        const data = remoteRequest.getConfigByKey()
        expect(data).toMatchObject(obj)

    })
   

})