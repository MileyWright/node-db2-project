const express = require('express');

const server = express();

const cars = require('./carRoutes')

server.use(express.json());

server.use('/cars', cars);

server.get('/', (req, res) => {
    res.send(
       `<h2>Welcome to my API</h2>`
    )
})

module.exports = server;