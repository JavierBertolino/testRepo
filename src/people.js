const { getAll } = require('./apiHandler');
const config = require('./../config.json');

async function getPeople(sortKey) {
    const response = await getAll(config.peopleUrl);

    return sortKey ? response.sort((a, b) => compareFunction(a, b, sortKey)) : response;
}

function compareFunction(a, b, sortKey) {
    if (sortKey === "name") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
        return a[sortKey] - b[sortKey];
    }
}

module.exports = { getPeople };