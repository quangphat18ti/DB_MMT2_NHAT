const models = require("../models");

async function updateDB() {
    const apiLinks = await models.WebAPI.find({}, { APILink: 1 });

    apiLinks.forEach(api => {
        console.log(`Call API (${api.APILink}) successfully!`);
        try {
            fetch(api.APILink)
                .then(response => response.text())
                .then(response => console.log(response))
                .catch(err => console.log(err));
        }
        catch (err) {
            console.log(err);
        }
    })
}

module.exports = updateDB;