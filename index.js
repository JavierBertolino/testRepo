const express = require('express');
const app = express();
const config = require('./config.json');
const { getPeople } = require('./src/people');
const { getPlanets } = require('./src/planets');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/people/:sortBy?', async (req, res) => {
    let request;
    const sortKey = req.params.sortBy;
    // request = await getPeople(sortKey);
    res.setHeader('test', 'Hello');
    request = { message: "Hello world", headers: res.getHeaders() }
    res.send(request);
    // res.render('view', { results: request, header: 'People' });
});

app.get('/planets', async (req, res) => {
    let request;
    request = await getPlanets();
    res.render('view', { results: request, header: 'Planets' });
});


app.listen(config.port, () => console.log(`Listening on port ${config.port}`));