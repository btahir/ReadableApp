import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { editPost } from '../actions/PostAction';

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
  }

  handleInitialize() {
    const initData = {
      'title': this.props.postData.title,
      'body': this.props.postData.body
    };
    this.props.initialize(initData);
  }


  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="form-div">
        <form className='post-form' onSubmit={handleSubmit( (values) => {this.savePost(values); })}>
          <div>
            <label className="form-label">Title</label>
            <div>
              <Field
                className="form-field"
                name="title"
                type="text"
                component="input"
              />
            </div>
          </div>
          <div>
            <label className="form-label">Body</label>
            <div>
              <Field
                className="form-field"
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
            <button className="reset-btn" onClick={() => {this.props.history.push(`/posts/${this.props.postData.category}/${this.props.match.params.id}`)} }>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    postData: state.reducePosts.posts.filter(post => post.id === ownProps.match.params.id)[0]
  };
}


const initialComponent = withRouter(connect(
  mapStateToProps,
  null
)(PostEdit));

export default reduxForm({
  form: 'post-edit'
})(initialComponent);

