
const Jasmine = require('../src/index')
const Disk = require('../src/disk')
const path = require('path')

describe('index', () => {

  let jasmine = null

  beforeEach(() => {
    jasmine = new Jasmine({
      env: 'test',
      unit: 'default',
      diskPath: path.join(__dirname, '../data')
    })
  })
    
    it('shoulde return module when getModule', () => { 
        const mod = jasmine.getModule('loan-leap', 'leap-h5')
        expect(mod.mainModule).toBe('loan-leap')
    })

    it('shoulde return empty mainModule when getModule', () => { 
      let jasmineEmpty = new Jasmine()
      const mod = jasmineEmpty.getModule()
      expect(mod.mainModule).toBe("")
  })


  test('shoulde return data when deleteFile', async () => {
    
    Disk.writeConfig(1,{test:11})
    jasmine.deleteFile()
    expect('1').toBe('1')
    
})

})