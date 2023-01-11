module.exports=
async function tramsform(){
const { parse } = require('json2csv');
const {AllDatas} = require('./scraping2')
console.log("companies", JSON.stringify(AllDatas))
    const csv = parse(AllDatas);
    const fs = require('fs').promises
    await fs.writeFile(`items2.csv`, csv, 'utf8')
    console.log('transform to csv')
}