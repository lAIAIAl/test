'use strict'

const Harmony = require('@wac/harmony-client')
const hakone = require('@wac/hakone')

const HERMES_TASK_INTERVAL = 5000
const MAX_RECORD = 100

module.exports = class HermesStream {
  constructor(opts) {
    const defaultOpts = {
      config: {
        hermesDomain: 'hermes-proxy.newlog', 
        topic: 'red.alert', 
        database: 'trinity'
      }
    }
    this.opts = Object.assign({}, defaultOpts, opts)

    this.harmony = new Harmony({
      env: this.opts.env
    })
    this.queue = []

    this._runSchedule()
  }

  get config() {
    return this.opts.config
  }

  write(record) {
    this.queue.push(record)
    if (this.queue.length >= MAX_RECORD) {
      const records = this.queue
      this.queue = []
      this.send(records)
    }
  }

  async send(records) {
    if (!this.harmony.isReady) {
      await this.harmony.ready()
    }

    const { hermesDomain, topic, database } = this.config

    const data = records.map(record => {
      const data = {
        database,
        measurement: this.opts.name,
        timestamp: Date.now(),
        fields: record
      }
      return {
        topic,
        data: Buffer.from(JSON.stringify(data)).toString('base64')
      }
    })

    const { host, port } = await this.harmony.getNode(hermesDomain)

    return hakone({
      url: `http://${host}:${port}/hermes-proxy/sendBatch`,
      method: 'POST',
      params: {
        topic,
        appName: this.opts.name
      },
      data
    }).catch(() => {})
  }

  _runSchedule() {
    setInterval(() => {
      if (this.queue.length) {
        const records = this.queue
        this.queue = []
        this.send(records)
      }
    }, HERMES_TASK_INTERVAL)
  }
}
