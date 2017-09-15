import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import {
  combineForms,
  createForms // optional
} from 'react-redux-form';
import reducer from './index';

const initialUserState = {
  firstName: '',
  lastName: ''
};

const storeReducer = combineReducers({
  reducer: reducer,

  // ... use createForms, which will create:
  // the model reducer at "user"
  // the forms reducer at "forms" (e.g., "forms.user")
  ...createForms({
    user: initialUserState,
  }),
});

export default storeReducer;
