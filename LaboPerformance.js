/**
 * Dependencies
 */
const fs = require('fs').promises
const {v1: uuidv1} = require('uuid')

/**
  * @Report is the final output of the LaboPerformance Test.
  * It contains all the information needed for the tester to run, as well as the final results of the tests.
  */
class Report {
  constructor (name, homepage, extensionTests = {}) {
    this.name = name
    this.homepage = homepage
    this.extensionTests = extensionTests
  }

  /**
   * Return the homepage from the Class
   */
  getRetailerHomepage () {
    return `${this.homepage}`
  }

  getRetailerName () {
    return `${this.name}`
  }
}

/**
 * @Extension is a class that contains the Broswer Parameters needed for Puppeteer to load the extension.
 * It'll contain the results as an Array
 */
class Extension {
  constructor (name) {
    this.name = name
    this.param = ''
    this.results = []
  }

  /**
   * @getParam will dynamically return the path of the extension inside the Browser Parameter object
   *
   * @param {ExtensionName} extension
   */
  getParam (extension) {
    if (extension === 'none')  {
      const browserParam = {
        headless: false
      }
      return this.param = browserParam
    }
    const browserParam = {
      headless: false,
      args: [
        `--disable-extensions-except=${extension}`,
        `--load-extension=${extension}`
      ]
    }
    return this.param  = browserParam
  }
}


const Puppeteer = require('puppeteer')

/**
 * @TestBuilder is an empty array that will contain all Tests classes.
 * Here is where most of the magic happens.
*/
class TestBuilder {
  tests = []

  /**
   * @getResult returns an Instance of Test (resultTest). Inside resultTest there are 2 important variables:
   * It runs the test and format the data in a more readable way.
   * The 2 important variables are:
   * - heapSize: is the runtime memory used in terms of MB to load the page
   * - loadTime: is the time spent for the Broswer to load
   *
   * @param {wbsiteUsedInTheTest} homepage
   * @param {browserParamUsedInTheTest} browserParam
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
    await browser.close()
    return resultTest
  }

  /**
   * @repeatTests run the getResult as many time as the counter. Counter must be a number
   *
   * @param {counterNumber} counter
   * @param {WebsiteToTest} homepage
   * @param {ExtensionToTest} browserParam
   */
  async repeatTests (counter, homepage, browserParam) {
    let allTests = []
    // TODO: will be a reduce
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
 * @Test is the class that contains all data converted and formatted.
 *
 * Timestamp is the ID used to diversify the Tests.
 * Loadtime is shown with 2 digit after the point
 * Heapsize is converted from bytes in  megabytes
 */
class Test {
  constructor (loadTime, heapSize) {
    this.date = new Date().toLocaleString()
    this.loadTime = loadTime.toFixed(2) + ' s'
    this.heapSize = heapSize.toFixed(2) + ' MB'
  }
}

/**
 *
 * @param {ExtensionName} Extension
 * @param {PageToBeTested} Report
 * @param {ExtensionResult} ExtensionResult
 */
async function getFinalResult (Extension, Report, ExtensionResult) {
  Extension.results = await ExtensionResult.repeatTests(3, Report.getRetailerHomepage(), Extension.getParam(Extension.name.toLowerCase())).catch(console.log)
  Report.extensionTests = await Extension
  const reportName = await Report.getRetailerName()
  fs.writeFile(`reports/${reportName + '_' +uuidv1()}.json`, JSON.stringify(await Report, null, 2))
  return await Report
}

/**
 *
 * @param {*} ExtensionName
 * @param {*} PagesToTest
 *
 * LaboPerformance('Pouch', WebsitesToTest)
 * LaboPerformance('Honey', WebsitesToTest)
 */
async function LaboPerformance(ExtensionName, PagesToTest) {
  const caseStudy = PagesToTest.forEach(async (page) => {
    const report = new Report(page.name, page.website)
    const extensionName = new Extension(ExtensionName)
    const extensionResult = new TestBuilder()
    getFinalResult(extensionName, report, extensionResult).then(console.log).catch(console.log)
  })
  return await caseStudy
}

module.exports = { LaboPerformance }
