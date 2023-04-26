const getHTML = require('./getHTML');
const cheerio = require('cheerio');


const getIcon = async (url) => {
    try {
        const html = await getHTML(url);
        const $ = cheerio.load(html);
        const link = $('link[rel*="icon"]').attr("href");
        return link;
    } catch (error) {
        console.log(error);
    }
};

module.exports = getIcon;