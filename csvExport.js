module.exports=
async function tramsform(){
const { parse } = require('json2csv');
const {allCompanies} = require('./scriptScraping')
console.log("companies", JSON.stringify(allCompanies))
    const csv = parse(allCompanies);
    const fs = require('fs').promises
    await fs.writeFile(`test.csv`, csv, 'utf8')
    console.log('transform to csv')
}