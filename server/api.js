Sequelize = require('sequelize')
const router = require('express').Router()
const {User} = require('../models/db')


router.get('/users', (req, res, next )=> {
    User.findAll()
    .then(data => res.send(data))
})

router.post('/users', (req, res, next)=> {
    User.create(req.body)
    .then(data => res.send(data))
})

router.get('/users/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then(data => res.send(data))
})

router.put('/users/:id', (req, res, next)=> {
    User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then (data => res.send(data))
})

router.delete('/users/:id', (req, res, next) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(201))
})

// GET /api/users
// GET /api/users/:id
// POST /api/users
// PUT /api/users/:id
// DELETE /api/users/:id
//


module.exports = router