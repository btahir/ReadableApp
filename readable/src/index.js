import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/MainReducer';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();

