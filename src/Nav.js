import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios'

const Nav = ({userCount}) => {
    return(
        <div>
            <Link to = '/' >
                <button>Home</button>
            </Link>

            <Link to = '/users'>
                <button>Users ({userCount})</button>
            </Link>

            <Link to = '/users/create'>
                <button>Add A User</button>
            </Link>
        </div>
    )
}

export default Nav