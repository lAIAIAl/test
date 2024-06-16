
const Cache = require('../src/cache')

describe('cache', () => {
    
    it('shoulde delete first when cache length > 100', () => { 

        global.harmonyNodeCache = {}
        
        for (var i = 0;i<101;i++){
            global.harmonyNodeCache[i] = i.toString() + '-unit-test'
        }

        Cache.set('new','test')
        const getData = global.harmonyNodeCache
        expect(getData[0]).toBeUndefined()

    })

    it('shoulde return null when get cache with no name', () => { 
        const getData =  Cache.get()
        expect(getData).toBeNull()
    })

    
})