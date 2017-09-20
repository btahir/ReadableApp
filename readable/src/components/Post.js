import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addPost } from '../actions';

class Post extends Component {

  getUUID() {
    return Math.floor((1 + Math.random()) * 0x1000000000000)
      .toString(16);
  }

  savePost(values) {
    const uuid = this.getUUID();

    const data = {
      'id': uuid,
      'timestamp': Date.now(),
      'title': values.title,
      'body': values.body,
      'author': values.author,
      'category': values.category
    };

    this.props.history.push('/');
    return this.props.dispatch(addPost(data));
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form className='post-form' onSubmit={handleSubmit( (values) => {this.savePost(values)} )}>
        <div>
          <label className="form-label">Title</label>
          <div className="form-field">
            <Field
              validate={[required]}
              className="form-field"
              name="title"
              component={renderField}
              type="text"
            />
          </div>
        </div>
        <div>
          <label className="form-label">Body</label>
          <div className="form-field">
            <Field
              validate={[required]}
              name="body"
              component="textarea"
              type="text"
              size="35"
            />
          </div>
        </div>
        <div>
          <label className="form-label">Author</label>
          <div className="form-field">
            <Field
              name="author"
              validate={[required]}
              component={renderField}
              type="text"
              className="form-field"
            />
          </div>
        </div>
        <div>
          <label className="form-label">Category</label>
          <div className="form-field">
            <label className="form-label">
              <Field
                name="category"
                component="input"
                type="radio"
                value="react"
              />{' '}
              react
            </label>
            <label className="form-label">
              <Field
                name="category"
                component="input"
                type="radio"
                value="redux"
              />{' '}
              redux
            </label>
            <label className="form-label">
              <Field
                name="category"
                component="input"
                type="radio"
                value="udacity"
              />{' '}
              udacity
            </label>
          </div>
        </div>
        <div>
          <button className="submit-btn" type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button className="reset-btn" type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
          <button className="reset-btn" type="button" onClick={() => {this.props.history.push('/')} }>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

// form validation stuff
const required = value => value ? undefined : 'Required';
const validate = values => {
  const errors = {};
  if (!values.title) {
    // console.log('title is required');
    errors.title = 'Required';
  }
  if (!values.author) {
    // console.log('author is required');
    errors.author = 'Required';
  }
  return errors;
};
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div className="form-field">
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const initialComponent = withRouter(connect(
  null,
  null
)(Post));

export default reduxForm({
  form: 'post-details',
  validate, // a unique name for this form
})(initialComponent);

