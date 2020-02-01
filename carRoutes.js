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
router.get('/:id', validateCarID, (req, res) => {
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

// POST request /cars
router.post('/', (req, res) => {
    const data = req.body;
    db('cars')
        .insert(data)
        .then(ids => {
            const id = ids[0];
            db('cars')
                .select('VIN', 'make', 'model', 'mileage', 'transmission_type', 'title_status')
                .where({id})
                .first()
                .then(posts => {
                    res.status(200).json(posts)
                })
                
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not post account info'})
        })
})

//PUT request /cars/:id
router.put('/:id', validateCarID, validateCar, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db('cars')
    .where({id})
    .update(changes)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Could not update car data'})
    })
})

//DELETE request /cars/:id
router.delete('/:id', validateCarID,(req, res) => {
    const id = req.params.id;
    db('cars')
        .where({id})
        .del()
        .then(post => {
            res.status(200).json({message: 'account deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not delete post'})
        })
})

//custom middleware
function validateCarID(req, res, next) {
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

function validateCar(req, res, next) {
    const data = req.body;
    if(!data.VIN || !data.make || !data.model || !data.mileage){
        res.status(400).json({message: 'missing car data'})
    } else {
        next();
    }
}

module.exports = router;