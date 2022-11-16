const scrapingPage = require('./scriptScraping')
const transformtoCsv = require('./csvExport')

;(async()=>{

    await scrapingPage()

    await transformtoCsv()

})()