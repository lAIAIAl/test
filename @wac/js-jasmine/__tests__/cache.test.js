
const Cache = require('../src/cache')

describe('cache', () => {

    it('shoulde return null when getByKey with no params', () => { 
        const cache =  new Cache()
        let config = cache.getByKey()
        expect(config).toBeNull()
    })

    it('shoulde return null when getByKey with no module', () => { 
        const cache =  new Cache()
        cache.set('loan-leap', 'leap-h5', 'aas')
        let config = cache.getByKey('loan-leap', 'leap-h5', 'a')
        expect(config).toBeNull()
    })

    it('shoulde return null when get with no subModule', () => { 
        const cache =  new Cache()
        cache.set('loan-leap', 'leap-aas', 'aas')
        cache.get('loan-leap')
        let config = cache.get('loan-leap', 'leap-err')
        expect(config).toBeNull()
    })
    
})