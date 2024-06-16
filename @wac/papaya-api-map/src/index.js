const apiMap = require('./api-map')
const util = require('./util')

module.exports = apiMap
apiMap.getOrigin = util.getOrigin
apiMap.getPath = util.getPath
