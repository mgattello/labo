const { Website, Extension, Result } =  require('./LaboPerformance')
const fs = require('fs').promises

const Argos = new Website("Argos", "https://www.argos.co.uk")
const Honey = new Extension("Honey")
const HoneyResult = new Result([])

async function getFinalResult (Extension, Website, ExtensionResult) {
  Extension.results = await ExtensionResult.repeatTests(3, Website.getRetailerHomepage(), Extension.getParam(Extension.name.toLowerCase())).catch(console.log)
  Website.extensionTests = await Extension
  fs.writeFile('reports/test.json', JSON.stringify(await Website, null, 2))
  return await Website
}

getFinalResult(Honey, Argos, HoneyResult).then(console.log).catch(console.log)
