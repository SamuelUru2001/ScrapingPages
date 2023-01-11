const puppeteer = require('puppeteer')
const path = require('path')
// const MongoDbHelper = require("./server/MongoDbHelper");
// const mongoDbHelper = new MongoDbHelper (`mongodb+srv://samuelScraper:Samuel123@cluster0.lfugl.mongodb.net/craiglist022?retryWrites=true&w=majority`);
module.exports =
    async function ExtractData() {

        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        // const maxPaginationNumber = 3000

        // for (let i = 0; i < maxPaginationNumber;  ) {

        // let url = (`https://sfbay.craigslist.org/sfc/cto/d/brisbane-1999-toyota-4runner-4x4/7490408280.html`)
        let url = (`https://ecosystem.airtable.com/consultants#partner-cards`)
        // console.log(`pagination number: ${maxPaginationNumber}`)
        // console.log(`contador: ${i}`)

        console.log('Run My Site')
        await page.waitForTimeout(4000)
        await page.goto(url)
        await page.waitForSelector('.rightArrow')
        // await page.waitForTimeout(4000)
        let nextPage = await page.evaluate(() => document.querySelectorAll('.rightArrow').length > 0)
        nextPage ? true : false
        console.log(`next Page: ${nextPage}`)

        while (nextPage) {

        // await page.waitForSelector('.button.next')
        console.log(`URL 21: ${url}`)
        console.count('pages')

            const enlaceItems = await page.evaluate(() => {
                const elements = document.querySelectorAll('#searcher .card--with-reviews')
                const links = []
                for (let element of elements) {
                    links.push(element.href)
                }

                return links
            })

            const Datos_Cars = []
            // for (let enlace of enlaceItems) {

            //     await page.goto(enlace)
            // //     console.count('Vehicles')

            //     // await page.waitForTimeout(2000)
            //     await page.screenshot({ path: path.join(__dirname, 'img', `${new Date().getTime()}.png`) });
                
            //     let AllDatas = []
            //     const Datas = await page.evaluate(() => {

            //         const result_Scraping = []

            //         // companies.forEach((item) => {
            //         const Name = $(".info-card__name").text().trim()
            //         // const Location = $(".details-card :contains(Location):eq(1)").find('.child ').text().trim()

            //         result_Scraping.push({ Name/* , Org_nr, Revenue, Nr_of_employees, first_name, middle_name, last_name  */ })
            //         // })
            //         return result_Scraping
            //     })
            //     AllDatas.push(...Datas)
            //     console.log("companies", JSON.stringify(AllDatas))
            //     console.count("antes del if cambio pagina")
            //     module.exports={AllDatas}
            // }
            if (nextPage) {
                // await page.goto(url)
                await page.waitForTimeout(2000)
                console.log("adentro del if")
                // console.log(urlToScraping)
                await page.waitForSelector('.rightArrow')
                await page.click('.rightArrow')
                await page.waitForTimeout(2000)
            }
        }

        // console.log('FIN')
        // await browser.close()
    }
// ExtractData()