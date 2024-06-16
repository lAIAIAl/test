
const Util = require('../src/util')
const Index = require('../src/index')

describe('util', () => {

    it('shoulde return empty when getHeaderDynamic with no module', () => { 
        const data = Util.getHeaderDynamic()
        expect(data).toBe('')
    })
    
    it('shoulde return value when saveDisk', () => { 
        const getData =  Util.saveDisk({test:'hello'})
        expect(getData).toBeUndefined()
    })

    


})