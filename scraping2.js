const puppeteer = require('puppeteer')
const path = require('path')
// const MongoDbHelper = require("./server/MongoDbHelper");
// const mongoDbHelper = new MongoDbHelper (`mongodb+srv://samuelScraper:Samuel123@cluster0.lfugl.mongodb.net/craiglist022?retryWrites=true&w=majority`);
module.exports=
async function ExtractData() {

    const browser = await puppeteer.launch({headless:false})
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
        await page.waitForTimeout(4000)
        // await page.waitForSelector('.button.next')
        console.log(`URL 21: ${url}`)
        console.count('pages')

       const enlaceItems = await page.evaluate(() => {
         const elements = document.querySelectorAll('#searcher .card--with-reviews')
        //  const elements = document.querySelectorAll('#search-results div > h3 a')
         const links = []
         for (let element of elements) {
         links.push(element.href)
         }

         return links
        })

        const Datos_Cars = []

        for (let enlace of enlaceItems) {

            await page.goto(enlace)
            console.count('Vehicles')

            await page.waitForTimeout(4000)
            await page.screenshot({path:path.join(__dirname, 'img', `${new Date().getTime()}.png`)});
            // let ReplyButon = await page.evaluate(()=>document.querySelectorAll('.reply-button').length > 0)
            // console.log(`ReplyButon:${ReplyButon}`)

            // if(ReplyButon){

            //    console.log('existe Reply Buton')

            //    console.log('CONDICION...')

            //    await page.waitForSelector('.reply-button')
            //    await page.click('.reply-button')
   
            //    await page.waitForTimeout(5000)
   
            //    let captchaExists = await page.evaluate(()=>document.querySelectorAll('.h-captcha').length > 0)
            //    console.log(`captchaExists:${captchaExists}`)
   
            //    if(!captchaExists){
   
            //    console.log('captcha off')
   
            //    await page.waitForSelector('.reply-flap.js-captcha')
   
            //    let showphone = await page.evaluate(()=>document.querySelectorAll('.show-phone').length > 0)
            //    console.log(`showphone:${showphone}`)
   
            //    if(ReplyButon && showphone && !captchaExists){
   
            //    console.log('solo phone')
            //    await page.click('.show-phone')
            //    await page.waitForTimeout(3000)
   
            // const Datos_Vehicles = await page.evaluate(()=>{
           
            //    const Informaciones = {}
            //     Informaciones.URL = window.location.href
            //     Informaciones.CarsModel = $('.attrgroup:eq()').text().trim()
            //     Informaciones.Price = $('.price').text()
            //     Informaciones.Price =   Informaciones.Price ? document.querySelector('.price').innerText :   Informaciones.Price = 'NO DISPONIBLE'
            //     Informaciones.VIN = $(' span:contains(VIN)').text().split(':')[1]
            //     Informaciones.VIN = Informaciones.VIN ?  $(' span:contains(VIN)').text().split(':')[1].trim() : Informaciones.VIN = 'NO ESTA DISPONIBLE VIN'
            //     Informaciones.Odometer = $('span:contains(odometer)').text().split(':')[1].trim()
            //     Informaciones.PhoneNumbers = $('.reply-tel-number span:contains(-)').text().replace('','+')
            //        return Informaciones
            //     })
   
            //    Datos_Cars.push(Datos_Vehicles)
            //    console.log(Datos_Vehicles)
            //    console.log('\n\n successful extraction \n\n')
            //    await mongoDbHelper.connect()
            //    const result = await mongoDbHelper.db.collection('scraping022').insertOne(Datos_Vehicles);
            //    await mongoDbHelper.disconnect()
   
        //    }
        //    else{
        //     console.log('no phone')
        //    await page.goto(enlace)
        //    }

        //  }
        //  else{
        //  console.log('YES CAPTCHA')
        //  await page.goto(enlace)
        //  } 

        //  }else{
        //     console.log('No existe Reply Buton')
        //     await page.goto(enlace)
        //  }

            
//    }
    // i=i+120
 }
    // console.log('FIN')
    // await browser.close()
}
// ExtractData()