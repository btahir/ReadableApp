import React, { Component } from 'react';
import { sortLatest, sortPopular } from '../actions';
import { connect } from 'react-redux';

class Sort extends Component {

  render() {
    // console.log(this.props);
    return (
        <div className="sort-buttons">
          <button onClick={this.props.sortPopular} className="btn-popular">Popular</button>
          <button onClick={this.props.sortLatest} className="btn-latest">Latest</button>
        </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    sortLatest: () => dispatch(sortLatest()),
    sortPopular: () => dispatch(sortPopular())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Sort);