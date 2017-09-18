import React, { Component } from 'react';
import '../App.css';
import { withRouter, Route } from 'react-router-dom';
import Categories from './Categories';
import PostDetail from './PostDetail';
import Post from './Post';
import { connect } from 'react-redux';


class App extends Component {

  // mapPostsRoutes() {
  //   const allPosts = this.props.allPosts;
  //   return (
  //     allPosts && allPosts.map((posts) => (
  //       <ul key={posts.id} className="post-id">
  //         <Route path={`/post:${posts.id}`}
  //           render={() => (
  //             <Posts postInfo = {posts}/>
  //           )}
  //         />
  //       </ul>
  //     ))
  //   );
  // }


  render() {
    // console.log("Props", this.props);
    return (
      <div className="App" >
        <h1 className="main-title">
          Welcome to Anonymous Posts
        </h1>
        <Route exact path="/"
          render={() => (
            <Categories filterCategory={['react','redux','udacity']}/>
          )}
        />
        <Route exact path="/react"
          render={() => (
            <Categories filterCategory={['react']}/>
          )}
        />
        <Route path="/redux"
          render={() => (
            <Categories filterCategory={['redux']}/>
          )}
        />
        <Route path="/udacity"
          render={() => (
            <Categories filterCategory={['udacity']}/>
          )}
        />
        <Route path="/posts/:id"
          render={() => (
            <PostDetail />
          )}
        />
        <Route path="/post"
          render={() => (
            <Post />
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allPosts: state.reducePosts.posts
  };
}

export default withRouter(connect(
  mapStateToProps,
  null
)(App));
