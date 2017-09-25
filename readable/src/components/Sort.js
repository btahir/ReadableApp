import React, { Component } from 'react';
import { sortLatest, sortPopular, LATEST } from '../actions/SortAction';
import { connect } from 'react-redux';
import '../Assets/dropdown.css';

class Sort extends Component {
  constructor(props) {
    super(props);
    // This is the only place I am using local state vs Redux store
    this.state = {value: this.props.sortProp};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    // fire off updates
    this.fireDispatch(this.state.value);
  }

  handleChange(event) {
    // set value
    this.setState({value: event.target.value});
  }

  fireDispatch(event) {
    if(event === LATEST) {
      this.props.sortLatest();
    } else {
      this.props.sortPopular();
    }
  }

  render() {
    return (
      <form className="sort-form">
        <label className="sort-label">
          Sort By:
          <select className="sort-list" value={this.state.value} onChange={this.handleChange}>
            <option value="POPULAR">Popular</option>
            <option value="LATEST">Latest</option>
          </select>
        </label>
      </form>
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
