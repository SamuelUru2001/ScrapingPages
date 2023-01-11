const puppeteer = require('puppeteer')
const path = require('path')
module.exports =
    async function ExtractData() {

        try {
            const browser = await puppeteer.launch({ headless: false })
            const page = await browser.newPage()
            let url = (`https://ecosystem.airtable.com/consultants#partner-cards`)

            console.log('Run My Site')
            await page.goto(url)
            await page.waitForTimeout(4000)
            let nextPage = await page.evaluate(() => document.querySelectorAll('.rightArrow').length > 0)

            console.log(`next Page: ${nextPage}`)

            const enlaces = []

            while (nextPage) {

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

                console.log("enlaceItems", enlaceItems)
                enlaces.push(...enlaceItems)

                if (nextPage) {
                    let clickOff = await page.evaluate(() => document.querySelectorAll('.disabledArrow > .rightArrow').length > 0)
                    clickOff ? true : false

                    console.log("#### off click ###", clickOff)
                    if (clickOff) {

                        console.log("if")
                        console.log("enlace", enlaces)
                        let AllDatas = []
                        for (let i = 0; i < enlaces.length; i++) {
                            // const element = array[i];
                            await page.goto(enlaces[i])
                            console.log("esperamos 4 segundos")
                            await page.waitForTimeout(4000)

                            await page.evaluate(() => document.scrollingElement.scrollBy(0, 1000))
                            await page.waitForTimeout(5000)
                            console.log("movemos")

                            const Datas = await page.evaluate(() => {

                                const result_Scraping = []
                                let imgs = []

                                const Name = $(".info-card__name").text().trim()
                                const Location = $(".details-card :contains(Location):eq(1)").find('.child').text().trim()
                                const WebSite = $(".details-card .resources-item-wrapper a").attr("href")
                                const Services = $(".details-card :contains(Services):eq(1)").text().replace(/\s+/g, ' ').trim()
                                const Language = $(".details-card :contains(Language):eq(1)").find(".child").text().trim()
                                const About = $(".about ").text()


                                let images = document.querySelectorAll(".item-wrapper .content-item").length > 0
                                if (images) {
                                    let imagenes = document.querySelectorAll(".item-wrapper .content-item img")
                                    imagenes = imagenes ? document.querySelectorAll(".item-wrapper .content-item img") : null
                                    for (let i = 0; i < imagenes.length; i++) {
                                        let img = $([imagenes[i]]).attr("src")
                                        img = img ? $([imagenes[i]]).attr("src") : null
                                        imgs.push(img)
                                    }
                                }
                                images ? result_Scraping.push({ Name, Location, WebSite, Services, Language, About, imgs }) : result_Scraping.push({ Name, Location, WebSite, Services, Language, About })
                                return result_Scraping
                            })

                            AllDatas.push(...Datas)
                            console.log("companies", JSON.stringify(AllDatas))
                            module.exports = { AllDatas }
                        }
                        break
                    } else {
                        console.log("off")
                        console.log("yes todavia ya")
                        await page.waitForTimeout(2000)
                        console.log("esperamos hacer click")
                        await page.waitForTimeout(3000)
                        await page.click('.rightArrow')
                        await page.waitForTimeout(2000)
                    }
                }
            }
        } catch (error) {
            console.error(`Error: ${error}`)
        }

    }