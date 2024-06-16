const originalEnv = process.env.NODE_ENV

describe('test api-map', () => {
  afterEach(() => {
    process.env.NODE_ENV = originalEnv
    jest.resetModules()
  })

  it('should check rules type', () => {
    const mapper = require('index')

    const error = 'arguments rules must be an non-empty array or object!'
    expect(() => mapper()).toThrowError(error)
    expect(() => mapper([])).toThrowError(error)
    expect(() => mapper({})).toThrowError(error)
  })

  it('should check every rule type', () => {
    const mapper = require('index')

    expect(() => mapper([1])).toThrowError('rule must be an object!')
    expect(() => mapper([{ host: 1 }])).toThrowError('host needs to be a string or an object!')
    expect(() => mapper([{ host: 'wacai.com', map: 1 }])).toThrowError(
      'map needs to be an object or a function!'
    )
    expect(() => mapper([{ host: 'wacai.com', match: 'xxxxx', map: {} }])).toThrowError(
      'match needs be a reg or a function!'
    )
  })

  it('should check pathname', () => {
    const mapper = require('index')
    const apiMap = mapper([{ host: 'wacai.com', match: /^api/, map: {} }])

    const error = 'arguments pathname is required and must be a string!'

    expect(() => apiMap(1)).toThrowError(error)
    expect(() => apiMap()).toThrowError(error)
  })

  it('should check match rule', () => {
    const mapper = require('index')
    const apiMap = mapper([{ host: 'wacai.com', match: /^api/, map: {} }])
    const apiMapFunc = mapper([
      { host: 'wacai.com', match: pathname => /^api/.test(pathname), map: {} }
    ])

    expect(apiMap('xxxxx')).toBe('xxxxx')
    expect(apiMapFunc('xxxxx')).toBe('xxxxx')
  })

  it('should check host.env', () => {
    process.env.NODE_ENV = ''

    const mapper = require('index')
    const apiMap = mapper([{ host: { test: 'wacai.com' }, match: /^api/, map: {} }])

    expect(() => apiMap('api')).toThrowError('host.development should not be empty!')
  })

  it('should get path when rules is an array', () => {
    process.env.NODE_ENV = 'test'

    const mapper = require('index')
    const apiMap = mapper([
      {
        host: { test: 'http://wacai.com' },
        match: path => /api/.test(path),
        map: {
          '/api/query/(\\d+)': 'http://caimi-inc.com/api/query/$1',
          '/api/delete/(\\d+)': '/api/remove/$1',
          '/api/update?id=(\\d+)': '/api/update?id=$1',
          '/api/create': '/api/add'
        }
      },
      {
        host: 'http://caimi-inc.com',
        match: /API/,
        map: path => path + '/1'
      },
      {
        match: /user/,
        map: path => `http://wacai-inc/info${path}`
      },
      {
        host: 'http://wacai.info'
      }
    ])

    expect(apiMap('/api/query/1')).toBe('http://caimi-inc.com/api/query/1')
    expect(apiMap('/api/delete/1')).toBe('http://wacai.com/api/remove/1')
    expect(apiMap('/api/update?id=1')).toBe('http://wacai.com/api/update?id=1')
    expect(apiMap('/API/query')).toBe('http://caimi-inc.com/API/query/1')
    expect(apiMap('xxx/query')).toBe('http://wacai.info/xxx/query')
    expect(apiMap('/api/create')).toBe('http://wacai.com/api/add')
    expect(apiMap('/user/query')).toBe('http://wacai-inc/info/user/query')
  })

  it('should get path when rules is an non-array object', () => {
    const mapper = require('index')
    const apiMap = mapper({ host: 'https://wacai.com', map: path => path + '/1' })

    expect(apiMap('/route')).toBe('https://wacai.com/route/1')
  })
})
