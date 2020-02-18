const { Retailer, Extension, Result } =  require('./LaboPerformance')
const fs = require('fs').promises

const Argos = new Retailer("Argos", "https://www.argos.co.uk")
const Honey = new Extension("Honey")
const HoneyResult = new Result([])

async function getFinalResult (Extension, Retailer, ExtensionResult) {
  Extension.results = await ExtensionResult.repeatTests(3, Retailer.getRetailerHomepage(), Extension.getParam(Extension.name.toLowerCase())).catch(console.log)
  Retailer.extensionTests = await Extension
  fs.writeFile('reports/test.json', JSON.stringify(await Retailer, null, 2))
  return await Retailer
}

getFinalResult(Honey, Argos, HoneyResult).then(console.log).catch(console.log)
