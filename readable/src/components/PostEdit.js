import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { editPost } from '../actions';

class PostEdit extends Component {

  componentDidMount() {
    this.handleInitialize();
  }

  savePost(values) {

    const data = {
      'id': this.props.match.params.id,
      'title': values.title,
      'body': values.body,
      'timestamp': Date.now(),
      'author': this.props.postData.author,
      'category': this.props.postData.category
    };

    this.props.history.push('/');
    return editPost(data);

    // return data;
  }

  handleInitialize() {
    const initData = {
      "title": this.props.postData.title,
      "body": this.props.postData.body
    };

    this.props.initialize(initData);
  }


  render() {
    // console.log(this.props);
    const { handleSubmit } = this.props;
    return (
      <form className='post-form' onSubmit={handleSubmit( (values) => {this.savePost(values)} )}>
        <div>
          <label className="form-label">Title</label>
          <div className="form-field">
            <Field
              className="form-field"
              name="title"
              type="text"
              component={renderField}
            />
          </div>
        </div>
        <div>
          <label className="form-label">Body</label>
          <div className="form-field">
            <Field
              name="body"
              component="textarea"
              type="text"
              size="35"
            />
          </div>
        </div>
        <div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps (state) {
  return {
    postData: state.reducePosts.postDetail
  };
}

const renderField = field => (
  <div>
    <label>{field.input.label}</label>
    <input {...field.input} />
  </div>
);


const initialComponent = withRouter(connect(
  mapStateToProps,
  null
)(PostEdit));

export default reduxForm({
  form: 'post-edit'
})(initialComponent);

