import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios'

const Home = ({userCount}) => {
    return (
        <div>
            <h2>Home</h2>
            <hr/>
            <h3>Welcome to Acme Users! We have {userCount} users! </h3>
        </div>
    )
}

export default Home