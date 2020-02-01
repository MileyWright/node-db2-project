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

// GET request /cars/:id
router.get('/:id', validateAccountID, (req, res) => {
    const id = req.params.id;
    db('cars')
    .where({'id': id})
    .then(car => {
        res.status(200).json(car)
    })
    .catch(err => {
        res.status(500).json({error: 'can not retrieve account by ID'})
    })
})

//custom middleware
function validateAccountID(req, res, next) {
    const id = req.params.id;
    db('cars')
        .where({'id': id})
        .then(car => {
            if(car == ''){
                res.status(400).json({error: 'The specified ID does not exist'})
            } else{
                next();
            }
        })
}

function validateAccount(req, res, next) {
    const data = req.body;
    if(!data.VIN || !data.make || !data.model || !data.mileage){
        res.status(400).json({message: 'missing car data'})
    } else {
        next();
    }
}

module.exports = router;