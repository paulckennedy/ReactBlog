import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';
import _ from 'lodash';

const FIELDS = {
    title: { 
        type: 'input',
        label: 'Title for Post',
        error: 'Enter a Post title'
    },
    categories: { 
        type: 'input',
        label: 'Enter some categories for this post',
        error: 'Enter any Post categories'
    },
    content: { 
        type: 'input',
        label: 'Enter some content',
        error: 'Enter some Post content'
    },
}
class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
        .then(() => {
            // blog post has been created, navigate the user to the index
            // We navigate by calling this.context.router.push with the new
            // path to navigate to.
            this.context.router.push('/');
        });
    }

    renderField(fieldConfig, field){
        const fieldHelper = this.props.fields[field];

        return (
            <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type type="text" className="form-control" {...fieldHelper}/>
                <div className="text-help">
                    {fieldHelper.touched ? fieldHelper.error : ''}
                </div>
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) } >
                <h3>Create A New Post</h3>
                {_.map(FIELDS, this.renderField.bind(this))}
                <button type="submit" className="btn bt-primary" >Submit</button>
                <Link to="/" className="btn btn-danger" >Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(FIELDS, (type, field, error) => {
        if(!values[field]) {
            errors[field] = `${type.error}`;
        }
    });
    /*
    if(!values.title){
        errors.title = 'Enter a Post title!';
    }

    if(!values.categories){
        errors.categories = 'Enter any Post categories!';
    }

    if(!values.content){
        errors.content = 'Enter some Post content!';
    }
    */
    return errors;
}

// connect: 1st argument is mapStateToProps, 2nd argument is mapDispatchToProps
// reduxForm: 1st argument is form config, 2nd argument is mapStateToProps, 2nd is mapDispatchToProps
export default reduxForm({
    form: "PostsNewForm",
    fields: _.keys(FIELDS),
    validate
}, null, { createPost })(PostsNew);