const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 2345
const {seed, db} = require('../models/db')


//body parsing middleware
app.use(express.json())

//static file-serving middleware
app.use(express.static(path.join(__dirname, '../src')))
app.use('/public',express.static(path.join(__dirname, '../public')))
app.use('/api',require('./api'))

//main GET route

app.get('/', (req, res, next)=> {
    res.sendFile(path.join(__dirname, '../src/index.html'))
})


//error catching middleware

app.use ((err, req, res,next) => {
    console.log(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send (err.message || 'Internal server error.')
})



//initialize server

const init = () => {
    db.sync({force:true})
    .then (() => seed())
    .then (() => app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`)
    }))

}

init()