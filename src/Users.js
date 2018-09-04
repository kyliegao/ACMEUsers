import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios'

const Users = ({users, userDestroy, setCurrentUser}) => {
    return (
        <div>
            <h2> Users </h2>
            <hr />
            <ul>
                {users.map(user => (
                    <li key = {user.id}>
                        <Link to = {`/users/${user.id}`} onClick = {() => setCurrentUser(user)}>
                            {user.name}
                        </Link>
                        <button onClick = {() => userDestroy(user.id)}>x</button>
                    </li>        
                ))}
            </ul>
        </div>
    )
}

export default Users