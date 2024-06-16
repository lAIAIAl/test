
const Disk = require('../src/disk')
const fs = require('fs-extra')
const path = require('path')
const projectDir = path.join(__dirname, '../data/')

const allConfigFileName = 'jasmine-all-config.json'

describe('disk', () => {

    it('shoulde return value when read', () => { 
        fs.writeJSON(projectDir+allConfigFileName, {sd:'2'}, function (err) {
            if (err) {
              // console.log(`<-- jasmine：将数据写入磁盘出错： ${err.toString()} -->`)
            } else {
              // console.log(`<-- jasmine：将数据写入磁盘成功`)
              // console.log(`<-- 动态链路：动态链路的数据写入磁盘成功：${JSON.stringify({[applicationKey]: applicationIPList})}--> \n`)
            }
          })

          expect.assertions(1);
          const obj = {"sd": "2"}
          return expect(Disk.read(projectDir+allConfigFileName)).resolves.toMatchObject(obj)
    })

    it('shoulde return value when getDirPath', () => {   
      const moduleClass = {
        diskPath: 'a'
      }
      const data = Disk.getDirPath(moduleClass)
      expect(data).toBe('a/jasmine/')
    })

    it('shoulde return default value when getDirPath', () => {  
      const projectDir = path.join(__dirname, '../') 
      const data = Disk.getDirPath()
      expect(data).toBe(projectDir + 'jasmine/')
    })


    it('shoulde return value when readConfig', () => { 
        fs.ensureFile(projectDir+allConfigFileName, function (errDir) {
        })

        fs.emptyDir(projectDir+allConfigFileName, function (err) {
          })

          const obj = {}
          const data = Disk.readConfig(123)
          expect(data).toMatchObject(obj)
    })


    it('shoulde return value when readConfig', () => { 
        const projectDir = path.join(__dirname, '../') 
        const obj = {}
        const data = Disk.read(projectDir+'data'+'aas23.json')
        expect(data).toMatchObject(obj)
  })






    

    


})