
const Looper = require('../src/looper')
const Util = require('../src/util')

describe('looper', async () => {
    
    test('shoulde return HarmonyIP null when getHarmonyServerIPList error', async () => {
       const looper = new Looper()
       looper.getHarmonyServerIPList()
        const res =  Util.getHarmonyIP()
        expect(res).toBe("")
    })
})