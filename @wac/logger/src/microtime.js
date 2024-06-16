class MicroTime {
  constructor() {
    this.microsec = Date.now() * 1e3
    this.hrtime = process.hrtime()
  }

  now() {
    return this.microsec + this.microsecdiff()
  }

  microsecdiff() {
    const [secdiff, nanosecdiff] = process.hrtime(this.hrtime)
    return +(secdiff * 1e6 + nanosecdiff / 1e3).toFixed(0)
  }
}

module.exports = new MicroTime()
