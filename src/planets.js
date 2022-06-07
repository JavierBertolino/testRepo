const { getAll, requestData } = require('./apiHandler');
const config = require('./../config.json');

async function getPlanets() {
    const planets = await getAll(config.planetsUrl);
    const parsedPlanets = Promise.all(planets.map(async planet => await replaceResidents(planet)));
    return parsedPlanets;
}

async function replaceResidents(planet) {
    let residentsNames = [];

    for (residentUrl of planet.residents) {
        const resident = await requestData(residentUrl);
        residentsNames.push(resident.name);
    }

    planet.residents = residentsNames;
    return planet;
}

module.exports = { getPlanets };