import React, { Component } from 'react';
import { votePost, votePostDetail } from '../actions/PostAction';
import { voteComment } from '../actions/CommentAction';
import { connect } from 'react-redux';

class Vote extends Component {

  moveVote(option) {
    const data = {
      id: this.props.voteData.id,
      option: option
    };
    if(this.props.voteData.item === 'comment') {
      this.props.voteComment(data);
    } else if(this.props.voteData.item === 'post') {
      this.props.votePost(data);
    } else if(this.props.voteData.item === 'postDetail') {
      this.props.votePostDetail(data);
    }
  }

  render() {
    return (
      <div className={this.props.classStyle}>
        <img onClick={() => {this.moveVote('upVote'); }} src={require('../img/arrow-up.png')} alt="boohoo" height="24" width="24" className="img-responsive"/>
        <div className="between-arrows">
          {this.props.voteData.score}
        </div>
        <img  onClick={() => {this.moveVote('downVote'); }} src={require('../img/arrow-down.png')} alt="boohoo" height="24" width="24" className="img-responsive"/>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    voteComment: (data) => dispatch(voteComment(data)),
    votePost: (data) => dispatch(votePost(data)),
    votePostDetail: (data) => dispatch(votePostDetail(data))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Vote);