const models = require("../models");

function updateDB() {
    const apiLinks = models.WebAPI.find({});
    console.log(apiLinks);

    apiLinks.forEach(api => {
        console.log("Call API: ", api);
        fetch(api);
    })
}

module.exports = updateDB;