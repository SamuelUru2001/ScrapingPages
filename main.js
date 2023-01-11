const scrapingPage1 = require('./scriptScraping')
const transformtoCsv = require('./csvExport')
const scrapingPage2 = require('./scraping2')
const transformtoCsv2 = require('./test2')

    ; (async () => {

        // await scrapingPage1()
        console.log("### START SCRAPING...")
        await scrapingPage2()

        console.log("transform data")
        // await transformtoCsv()
        await transformtoCsv2()

    })()