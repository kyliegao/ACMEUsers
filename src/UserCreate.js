import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios'

class UserCreate extends Component{
    constructor(props){
        super()
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        console.log(this.state.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        const {updateUsers} = this.props

        e.preventDefault()
        axios.post('/api/users',
            {name: this.state.name}
        )
        .then( res => updateUsers(res.data))
        .then( () => console.log('user created'))
        .catch( (ex) => alert(ex))

    }

    render () {
        const {handleSubmit, handleChange} = this
        const {name} = this.state

        return(
            <div>
                <h2>Create User</h2>
                <hr />
                <form onSubmit = {handleSubmit}>
                    <label htmlFor = 'name'>Name:</label>
                    <input type = 'text' name = 'name' value = {name} onChange = {handleChange}/>
                    <br/>
                    Save: <button type = 'submit'>Create</button>
                </form>
            </div>
        )
    }
}

export default UserCreate