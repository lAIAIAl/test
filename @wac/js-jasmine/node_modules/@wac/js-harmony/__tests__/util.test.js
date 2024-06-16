
const Util = require('../src/util')

describe('util', () => {
    global.harmonyNodeCache = {}
    it('shoulde return right value', () => { 
        const setData = {test:1}
        Util.setHarmonyConfig(setData)
        const getData = Util.getHarmonyConfig()
        expect(getData.test).toBe(setData.test)

    })

    it('shoulde return error when fetch with error url', () => { 
        const getData = Util.fetch({url:'abc'})
        expect(getData.code).toBeUndefined()
    })

    it('shoulde return error when fetch with no opts', () => { 
        const obj = {}
        const getData = Util.fetch()
        expect(getData).toMatchObject(obj)
    })

    test('shoulde return false when getDomain with no url', async () => {
        const res1 = Util.getDomain('')
        expect(res1).toBeFalsy()
    })

    test('shoulde return [] when descendSortByWeight with no data', async () => {
        const arr = []
        const res1 = Util.descendSortByWeight('')
        expect(res1).toMatchObject(arr)
    })

    test('shoulde return {} when randomValueWithArray with no arr', async () => {
        const obj = {}
        const res1 = Util.randomValueWithArray('')
        expect(res1).toMatchObject(obj)
    })

    
    
    
})