const { Report, Extension, TestBuilder } =  require('./LaboPerformance')
const fs = require('fs').promises

const Argos = new Report("Argos", "https://www.argos.co.uk")
const Honey = new Extension("Honey")
const HoneyResult = new TestBuilder()

async function getFinalResult (Extension, Report, ExtensionResult) {
  Extension.results = await ExtensionResult.repeatTests(3, Report.getRetailerHomepage(), Extension.getParam(Extension.name.toLowerCase())).catch(console.log)
  Report.extensionTests = await Extension
  fs.writeFile('reports/test.json', JSON.stringify(await Report, null, 2))
  return await Report
}

getFinalResult(Honey, Argos, HoneyResult).then(console.log).catch(console.log)
