const express = require('express');
const db = require('./data/dbConfig.js');
const router = express.Router();

//GET request /cars
router.get('/', (req, res) => {
    db('cars')
    .then(car => {
        res.status(200).json(car)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Cannot retrieve cars'})
    })
})

module.exports = router;