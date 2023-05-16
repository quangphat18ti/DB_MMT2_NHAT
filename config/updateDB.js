const models = require("../models");

async function updateDB() {
    const apiLinks = await models.WebAPI.find({}, { APILink: 1 });

    apiLinks.forEach(api => {
        try {
            fetch(api.APILink)
                .then(response => response.text())
                .then(response => {
                    console.log(`Call API (${api.APILink}) successfully!`);
                    console.log(response);
                })
                .catch(err => {
                    console.log(`Call API (${api.APILink}) fail!`);
                    console.log(err)
                });
        }
        catch (err) {
            console.log(err);
        }
    })
}

module.exports = updateDB;