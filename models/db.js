const Sequelize = require ('sequelize')
const pg = require('pg')


const db = new Sequelize (process.env.DATABASE_URL || 'postgres://localhost:5432/acmecrud')

const User = db.define('user',{
    name: {
        type: Sequelize.STRING,
        unique: true
    },
})

const seed = () => {
    Promise.all([
        User.create({name: 'larry'}),
        User.create({name: 'moe'}),
        User.create({name: 'curly'})
    ])
    .then(users => {
        console.log('seeding successful!')
    })
}

module.exports = {
    User,
    seed,
    db
}