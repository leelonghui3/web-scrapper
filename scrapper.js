const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const writeStream = fs.createWriteStream('govmy.csv')

writeStream.write(`name,url\n`)

const PAGE =
  'https://en.wikipedia.org/wiki/List_of_federal_agencies_in_Malaysia'

const hasLink = link => {
  if (!link) {
    return false
  }
  return true
}

const scrapePage = async () => {
  try {
    const res = await axios.get(PAGE)
    const $ = cheerio.load(res.data)

    $('.mw-parser-output > ul > li').each((i, el) => {
      const name = $(el)
        .text()
        .replace(/,/, '')

      const link = $(el)
        .find('a')
        .attr('href')

      writeStream.write(`${name},${hasLink(link) ? link : null}\n`)
    })
  } catch (error) {
    console.log(error)
  }
}

scrapePage()
