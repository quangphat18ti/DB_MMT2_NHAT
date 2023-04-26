const url = require('url');
const getURL = require('./getURLFromDomain');

function getDomain(url_link) {
    return getURL(url.parse(url_link).hostname);
}

module.exports = getDomain;