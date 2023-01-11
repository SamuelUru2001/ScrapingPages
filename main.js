const scrapingPage1 = require('./scriptScraping')
const scrapingPage2 = require('./scraping2')
const transformtoCsv = require('./csvExport')
const transformtoCsv2 = require('./test2')

;(async()=>{

    // await scrapingPage1()

    await scrapingPage2()
console.log("transform data ")
    // await transformtoCsv()
    await transformtoCsv2()

})()