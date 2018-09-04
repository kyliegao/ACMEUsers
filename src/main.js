import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import axios from 'axios'
import fakeUsers from './fakeUsers'
import Home from './Home'
import Nav from './Nav'
import UserCreate from './UserCreate'
import Users from './Users'
import UserUpdate from './UserUpdate'

//elements:
// - Nav
// - UserCreate
// - UserUpdate
// - Users
// - Home


class Main extends Component {
    constructor(){
        super()
        this.state = {
            users: fakeUsers,
            currentUser: {}
        }
        this.updateUsers = this.updateUsers.bind(this)
        this.userDestroy = this.userDestroy.bind(this)
        this.updateUserName = this.updateUserName.bind(this)
        this.setCurrentUser = this.setCurrentUser.bind(this)
    }

    componentDidMount () {
        axios.get('/api/users')
        .then (res => this.setState({
            users: res.data
        }))
        .then(() => console.log('component mounted'))
    }

    updateUsers (user) {
        this.setState({
            users: [...this.state.users, user]
        })
    }

    updateUserName (user){
        // console.log(user)
        this.setState({
            users: this.state.users.map(_user => {
                if(_user.id === user.id){
                    _user.name = user.name
                }
                return _user
            })
        })

        console.log(this.state.users)
    }

    setCurrentUser(user){
        this.setState({
            currentUser: user
        })
    }

    userDestroy(id){
        axios.delete(`api/users/${id}`)
        .then( () => this.setState({
            users: this.state.users.filter(_user => _user.id !== id)
        }))
        .then( () => console.log('user deleted'))
        .catch( ex => alert(ex))
    }


    render(){
        const {users, currentUser} = this.state
        const {updateUsers, userDestroy, updateUserName, setCurrentUser} = this

        return(
            <div>
                <h1>ACMEUSERS</h1>

                < Nav 
                    userCount = {users.length}
                />

                < Route exact path = '/' 
                    render = {() => <Home userCount = {users.length} />}
                />

                < Route path = '/users'
                    render = {() => <Users 
                        users = {users} 
                        userDestroy = {userDestroy}
                        setCurrentUser = {setCurrentUser}
                        />}
                />

                < Route path = '/users/create'
                    render = {()=> <UserCreate 
                        updateUsers = {updateUsers}
                        setCurrentUser = {setCurrentUser}
                    />}
                />
                {currentUser?
                < Route path = '/users/:userId'
                    render = {() => <UserUpdate
                    updateUserName = {updateUserName}
                    currentUser = {currentUser}
                    />}
                />
                :
                null
                }

            </div>
        )
    }

}




ReactDOM.render(
    <Router>
        <Main />
    </Router>,
    document.getElementById('app')
)