import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { editConsultationById } from '../../auth/api'
import messages from '../../auth/messages'
class EditConsultation extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            content: '',
            author: ''
        }
    }
    componentDidMount() {
        const { info } = this.props.location.state
        console.log(this.props);

        let title = info.title
        let content = info.content
        let author = info.author

        let id = info._id
        this.setState({
            title, content, author, id
        })
    }
    handleChange = event => this.setState({
        [event.target.name]: event.target.value
    })
    onEditConsultation = event => {
        event.preventDefault()
        const { alert, history, user } = this.props
        editConsultationById(this.state, this.props.user)
            .then((response) => { })
            .then(() => alert(messages.editConsultationSuccess, 'success'))
            .then(() => history.push('/consultation'))
            .catch(error => {
                console.log(error)
                this.setState({
                    title: '',
                    content: '',
                    author: '',
                })
                alert(messages.editConsultationFailure, 'danger')
            })
    }
    render() {
        const { title, content, author } = this.state
        return (
            <form className='auth-form' onSubmit={this.onEditConsultation}>
                <h3>Edit A Consultation</h3>
                <label htmlFor="Title">Title</label>
                <input
                    required
                    name="title"
                    value={title}
                    type="title"
                    placeholder="Title"
                    onChange={this.handleChange}
                />
                <label htmlFor="content">Content</label>
                <input
                    required
                    name="content"
                    value={content}
                    type="content"
                    placeholder="Content"
                    onChange={this.handleChange}
                />
                <label htmlFor="author">Author</label>
                <input
                    required
                    name="author"
                    value={author}
                    type="author"
                    placeholder="Author"
                    onChange={this.handleChange}
                />
                <button type="submit">ADD Consultation</button>
            </form>
        )
    }
}
export default EditConsultation;