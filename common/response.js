const handleResponse = (response, statusCode, message, data = null) => {
    switch (statusCode) {
        case 200:
        case 201:
            return response.status(statusCode).json({ success: true, message, data });

        case 400:
            return response.status(statusCode).json({ success: false, message });
        case 401:
            return response.status(statusCode).json({ success: false, message: "Unauthorise!" });
        case 402:
            return response.status(statusCode).json({ success: false, message: "Forbbiden Resource!" });
        case 403:
            return response.status(statusCode).json({ success: false });
        case 404:
            return response.status(statusCode).json({ success: false, message });

        case 500:
            return response.status(statusCode).json({ success: false, message: "The system has an unexpected technical issue." });
    }
}

module.exports = handleResponse;