import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as API from '../utils/api';
import { getAllCategories, getAllPosts } from '../actions';
import { bindActionCreators } from 'redux';

class App extends Component {
  componentWillMount() {
    // const { store } = this.props;
    this.props.fetchPosts();
    this.props.fetchCategories();
    

    // API.getCategories()
    // .then((res) => {
    //     store.dispatch({
    //     type: 'USER_LIST_SUCCESS',
    //     users: res
    //     });
    //     console.log(this.props);
    // })
  }

  showPosts() {
    const { posts } = this.props;

    return (
      posts.map(p => (
        <li key={p} className="subheader">
          p
        </li>
      ))
    );
  }

  render() {
    const { allPosts } = this.props;
    const mealOrder = ['breakfast', 'lunch', 'dinner'];
    console.log("Props", this.props);
    return (
      <div className="App" >
        Welcome to Anonymous Posts
        
        <div className="Posts">
          {mealOrder.map((posts) => (
            <li key={posts} className="subheader">
              {posts}
            </li>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapCategories: state.reduceCategories.categories,
    mapPosts: state.reducePosts.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchCategories: getAllCategories,
    fetchPosts: getAllPosts,
  }, dispatch);
}

// Can also call dispatch directly. Do not need to call this.props.fetchCategories() above.
// function mapDispatchToProps(dispatch) {
//   return {
//     fetchCategories: dispatch(getAllCategories()),
//     fetchPosts: dispatch(getAllPosts()),
//   };
// }


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
