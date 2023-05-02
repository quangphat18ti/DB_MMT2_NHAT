const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
    'title': 'JS - Javascript',
    'author': 'Phat Vip Pro',
    'id': '3'
});

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://mmt-main-dbserver.vercel.app/api/category?quantity=10&type=laptop&name=lenovo',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
};

fetch("https://mmt-main-dbserver.vercel.app/api/category/64508676949d74031655e4f8")
    .then((response) => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log("Desc = ", data.Category.Desc);
    })
    .catch((error) => {
        console.log(error);
    });
