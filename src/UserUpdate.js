import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import axios from 'axios'

class UserUpdate extends Component {

    constructor(props){
        super(props)

        this.state ={
            name: props.currentUser.name
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate(prevProps){
        if (prevProps.currentUser !== this.props.currentUser){
            this.setState({name: this.props.currentUser.name})
        }
    }

    handleChange (e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit (e) {
        const {updateUserName, currentUser} = this.props
        console.log(this.props.currentUser.id)
        
        e.preventDefault()
        axios.put(`/api/users/${currentUser.id}`,{
            name: this.state.name
        })
        .then ( res => updateUserName(res.data) )
        .then( () => console.log('username updated'))
        .catch(ex => alert(ex))

    }

    render () {
        const {handleSubmit, handleChange} = this
        const {name} = this.state

        return(
            <div>
                <h2> Update User </h2>
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

export default UserUpdate