const express = require('express');
const app = express();
const config = require('./config.json');
const { getPeople } = require('./src/people');
const { getPlanets } = require('./src/planets');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'max-age=7');
    res.render('home', { headers: req.headers });
});

app.get('/people/:sortBy?', async (req, res) => {
    let request;
    const sortKey = req.params.sortBy;
    // request = await getPeople(sortKey);
    // res.setHeader('Cache-Control', 'Hello');
    console.log("INCOME CACHE HEADER", req.headers['cache-control']);
    console.log("CACHE HEADER", res.getHeader('Cache-Control'));
    request = { message: "Hello world", headers: res.getHeaders(), orighead: req.headers }
    res.send(request);
    // res.render('view', { results: request, orighead: req.headers });
});

app.get('/planets', async (req, res) => {
    let request;
    request = await getPlanets();
    res.render('view', { results: request, orighead: req });
});


app.listen(config.port, () => console.log(`Listening on port ${config.port}`));