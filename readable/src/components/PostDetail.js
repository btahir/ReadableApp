import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOnePost, deletePost } from '../actions/PostAction';
import { getComments } from '../actions/CommentAction';
import { 
  toggleModal, 
  commentBodyModal, 
  commentAuthorModal, 
  commentIdModal, 
  toggleEditModal
} from '../actions/ModalAction';
import NewCommentModal from './NewCommentModal';
import EditCommentModal from './EditCommentModal';
import { getDate, sortItems} from '../utils/helper';
import Vote from './Vote';
import Sort from './Sort';

class PostDetail extends Component {

  showContent(item) {
    if(item !== 'Post is Deleted') {
      if(item.category) {
        return (
          <div key={item.id}>
            <Vote voteData={{id: item.id, item: 'postDetail', score: item.voteScore}}  classStyle="vote-post-detail" />
            <div className="post-title">
              {item.title}
            </div>
            <div className="post-body">
              {item.body}
            </div>
            <div className="post-misc-detail">
              <div className="padding-stuff" />
                Author: {item.author}
                &nbsp;&nbsp;&nbsp;&nbsp; Category: {item.category}
                &nbsp;&nbsp;&nbsp;&nbsp; Date: {getDate(item.timestamp)}
            </div>
          </div>
        );
      } else {
        return (
          <div key={item.id}>
            <Vote voteData={{id: item.id, item: 'comment', score: item.voteScore}}  classStyle="vote-comment" />
            <div className="comment-body">
              <button onClick={() => {this.editCommentModal(item);} } className="comment-style">{item.body}</button>
            </div>
            <div className="post-misc-detail">
              <div className="padding-stuff" />
                Author: {item.author}
                &nbsp;&nbsp;&nbsp;&nbsp; Date: {getDate(item.timestamp)}
            </div>
            <div className="hrComment" />
          </div>
        );
      }
    } else {
      return (
        <div className="post-body">
          Post has been Deleted!
        </div>
      );
    }
  }

  showPost() {
    const post = this.props.getPost;
    return (
      <div className="post-content"> 
        {this.showContent(post)}
      </div>
    );
  }

  delPost(id) {
    this.props.deletePost(id);
    this.props.history.push('/');
  }

  showComment() {
    const comments = sortItems(this.props.getComments, this.props.sortValue.sortValue);
    return (
      <div> 
        {comments && comments.map(comment => this.showContent(comment))}
      </div>
    );
  }

  editCommentModal(item) {
    // pre-populating Comment Edit Modal
    this.props.toggleEditModal();
    this.props.addCommentID(item.id);
    this.props.addCommentBody(item.body);
    this.props.addCommentAuthor(item.author);
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <div>
          <button onClick={() => {this.props.history.push('/'); }} className="btn-back">Back</button>
          <button className="btn-edit"><Link className="link-new-post" to={`/posts/edit/${this.props.match.params.id}`}>Edit</Link></button>
          <button onClick={() => {this.delPost(this.props.match.params.id); }} className="btn-edit">Delete</button>
        </div>
        <div className="post-position">{this.showPost()}</div>
        <div className="comment-position">{this.props.getComments && this.props.getComments.length} Comments</div>
        <button onClick={() => {this.props.toggleModal();} } className="btn-comment">Add Comment</button>
        <Sort sortProp={this.props.sortValue.sortValue}/>
        <NewCommentModal parentID={this.props.match.params.id}/>
        <EditCommentModal parentID={this.props.match.params.id}/>
        <hr />
        <div className="post-position">{this.showComment()}</div>
      </div>
    );
  }

}

function mapStateToProps (state) {
  return {
    getPost: state.reducePosts.posts ? state.reducePosts.posts[0] : 'Post is Deleted',
    getComments: state.reducePosts.posts ? state.reduceComments.comments : '',
    sortValue: state.sortValue
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatchPost: dispatch(getOnePost(ownProps.match.params.id)),
    dispatchComments: dispatch(getComments(ownProps.match.params.id)),
    deletePost: () => dispatch(deletePost(ownProps.match.params.id)),
    toggleModal: () => dispatch(toggleModal()),
    toggleEditModal: () => dispatch(toggleEditModal()),
    addCommentID: (event) => dispatch(commentIdModal(event)),
    addCommentBody: (event) => dispatch(commentBodyModal(event)),
    addCommentAuthor: (event) => dispatch(commentAuthorModal(event))
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail));