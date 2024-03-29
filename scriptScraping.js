const puppeteer = require('puppeteer')

module.exports=
async function extractDatas() {
    const urlToScraping = `https://proff.no/laglister?rf=30000&rt=1016055511&i=p48196&i=p47371&i=p47372&i=p1523&sa`
    try {
        console.log('\n ## starting extraction data ## \n')

        console.log(`url:${urlToScraping}`)

        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()

        await page.goto(urlToScraping)
        console.log('goto url...')

        let nextPage = await page.evaluate(() => document.querySelectorAll('.arrow.ssproff-right').length > 0)
        console.log(`next Page: ${nextPage}`)

        nextPage ? true : false

        let allCompanies = []
        while (nextPage) {

            console.log('insert jquery...')
            await page.addScriptTag({ path: require.resolve('jquery') })
            let pageNumberArrow = await page.evaluate(() => $('.current').text())
            console.log(`pageNumberArrow: ${pageNumberArrow}`)

            await page.waitForSelector('.listing')

            let ButtonAcept = await page.evaluate(() => document.querySelectorAll('.sc-ifAKCX.bDpbwf').length > 0)
            console.log(`ReplyButon:${ButtonAcept}`)

            ButtonAcept ? await page.click('.sc-ifAKCX.bDpbwf') : ''
            console.log('click button')

            console.log('iniciamos la extraccion de datos...')

            const companiesData = await page.evaluate(() => {

                const result_Scraping = []

                const companies = document.querySelectorAll('.listing')
                companies.forEach((item) => {
                    const Company = $([item]).find('a').text()
                    const Org_nr = $([item]).find('.org-number').text().replace(/Org nr/, '').trim()
                    const Revenue = $([item]).find('.sorted').text().split(':')[1].trim().replace(/\D+/g, "")
                    const Nr_of_employees = $([item]).find('ul li:contains(Ansatte)').text().trim().split(':')[1]

                    let NameEmployees = $([item]).find('.additional-info li:eq(2)').text().replace(/\s*\(.*?\)\s*/g, '').split(':')[1]
                    NameEmployees = NameEmployees ? $([item]).find('.additional-info li:eq(2)').text().replace(/\s*\(.*?\)\s*/g, '').split(':')[1] : NameEmployees = ''
                    let countPosition = NameEmployees.split(' ')
                    countPosition = countPosition ? NameEmployees.split(' ') : countPosition = ''
                    let first_name = countPosition[1]
                    // // firstName = firstName ? countPosition[0] : firstName = '## firstName off ##'
                    middle_name = countPosition.length > 3 ? countPosition[2] : null
                    let last_name = countPosition.length >= 4 ? countPosition[3] : countPosition[2]

                    result_Scraping.push({ Company, Org_nr, Revenue, Nr_of_employees, first_name, middle_name, last_name })
                })
                return result_Scraping
            })
            allCompanies.push(...companiesData)


            if (nextPage) {
                await page.waitForSelector('.arrow.ssproff-right')
                await page.click('.arrow.ssproff-right')
                await page.waitForTimeout(2000)
            }

            module.exports={allCompanies}
        }
        console.log('extraction complete')
    } catch (error) {
        console.error(error)
    }
}