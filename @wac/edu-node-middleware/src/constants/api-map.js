const eduApiMap = {
  development: 'http://api.wac-edu.wke-office.test.wacai.info',
  test: 'http://api.wac-edu.wke-office.test.wacai.info',
  staging: 'http://api.wac-edu-staging.k2.staging.wacai.info',
  production: 'http://api.wac-edu.k2.wacai.info',
}

const ucenterApiMap = {
  development: 'http://api.user.test.wacai.info',
  test: 'http://api.user.test.wacai.info',
  staging: 'http://api.user.staging.wacai.info',
  production: 'http://api.user.wacai.info',
}

module.exports = {
  eduApiMap,
  ucenterApiMap,
}
