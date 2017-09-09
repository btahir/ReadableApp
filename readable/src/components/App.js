import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as API from '../utils/api';
import { getAllCategories } from '../actions';
import {bindActionCreators} from 'redux';

class App extends Component {
  componentDidMount() {
    
    // const { store } = this.props;
    // this.props.fetchCategories();

    // API.getCategories()
    // .then((res) => {
    //     store.dispatch({
    //     type: 'USER_LIST_SUCCESS',
    //     users: res
    //     });
    //     console.log(this.props);
    // })
  }

  render() {
    // const { categories } = this.props;
    console.log("Props", this.props);
    return (
      <div className="App" >
      value: 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCategories: getAllCategories
  }, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
