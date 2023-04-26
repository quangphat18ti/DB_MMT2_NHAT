function getURLFromDomain(url, domain = "https:/") {
    try {
        if (url.at(-1) == '/')
            url = url.substr(0, url.length - 1);

        if (url.includes('http')) return url;

        if (url.startsWith('/')) return `${domain}${url}`;

        return `${domain}/${url}`;

    } catch (error) {
        console.log(error);
        return url;
    }
}
module.exports = getURLFromDomain;