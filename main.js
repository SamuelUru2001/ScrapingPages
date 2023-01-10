const scrapingPage1 = require('./scriptScraping')
const scrapingPage2 = require('./scraping2')
const transformtoCsv = require('./csvExport')

;(async()=>{

    // await scrapingPage1()

    await scrapingPage2()

    // await transformtoCsv()

})()