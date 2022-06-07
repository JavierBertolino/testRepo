const request = require('request')

async function requestData(url) {
    return await new Promise((resolve, reject) => {
        request(url, { json: true }, (error, res, body) => {
            if (error)
                reject(error);
            resolve(body);
        });
    })
}


async function getAll(url) {
    let response = [];
    let items = [];
    try {

        do {
            if (response && response.next) {
                url = response.next;
            }

            response = await requestData(url);
            items = [...items, response.results];

        } while (response.next)
    } catch (e) {
        console.error('Failed to retrieve the data', e);
    }

    return items.flat();
}

module.exports = {
    getAll,
    requestData
};