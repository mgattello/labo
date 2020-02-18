/**
 *
 */
class Retailer {
  constructor (name, homepage, extensionTests = {}) {
    this.name = name
    this.homepage = homepage
    this.extensionTests = extensionTests
  }

  /**
   *
   */
  getRetailerHomepage () {
    return `${this.homepage}`
  }
}

/**
 *
 */
class Extension {
  constructor (name) {
    this.name = name
    this.param = ''
    this.results = []
  }

  /**
   *
   * @param {*} extension
   */
  getParam (extension) {
    if (extension === 'none')  {
      const browserParam = {
        headless: false,
        devtools: true,
      }
      return this.param = browserParam
    }
    const browserParam = {
      headless: false,
      args: [
        `--disable-extensions-except=${extension}`,
        `--load-extension=${extension}`
      ],
      devtools: true
    }
    return this.param  = browserParam
  }
}


const Puppeteer = require('puppeteer')

/**
 *
 */
class Result {
  tests = []

  /**
   *
   * @param {*} homepage
   * @param {*} browserParam
   */
  async getResult (homepage, browserParam) {
    const browser = await Puppeteer.launch(browserParam)
    const page = await browser.newPage()

    await page.goto(homepage);

    const metrics = await page.metrics()
    const performanceTiming = await page.evaluate(() => JSON.parse(JSON.stringify(window.performance.timing)))
    let loadTime = (performanceTiming.loadEventEnd - performanceTiming.navigationStart) / 1000
    // JSHeapUsedSize / 1024 / 1024
    let heapSize = metrics.JSHeapUsedSize / 1048576

    if(!metrics && !performanceTiming) {
      throw new Error("Metrics and performanceTiming don't exist")
    }
    const resultTest = new Test (loadTime, heapSize)
    console.log(resultTest)
    await browser.close()
    return resultTest
  }

  /**
   *
   * @param {*} counter
   * @param {*} homepage
   * @param {*} browserParam
   */
  async repeatTests (counter, homepage, browserParam) {
    let allTests = []
    for( let i = 0; i < counter; i++){
      await this.getResult(homepage, browserParam).then(res => {
        allTests.push(res)
        console.log(allTests)
      }).catch(console.log)
    }
    return allTests
  }
}

/**
 *
 */
class Test {
  constructor (loadTime, heapSize) {
    this.timestamp = new Date().getTime()
    this.loadTime = loadTime.toFixed(2) + ' s'
    this.heapSize = heapSize.toFixed(2) + ' MB'
  }
}

module.exports = { Retailer, Extension, Result, Test }
