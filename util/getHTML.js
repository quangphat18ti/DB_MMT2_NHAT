const fs = require("fs");
const puppeteer = require("puppeteer");
const axios = require('axios');

const getHTML = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setDefaultTimeout(0);
        await page.goto(url);
        let HTML = await page.content();
        browser.close();

        fs.writeFileSync("index.html", HTML);
        return HTML;
    } catch (error) {
        console.log(error);
    }
};

// const getHTML = async (url) => {
//     try {
//         let response = await axios.get(url);
//         let HTML = await response.data;
//         console.log(HTML);
//         fs.writeFileSync("index.html", HTML);
//         return HTML;
//     } catch (error) {
//         console.log(error);
//     }
// };

module.exports = getHTML;