
import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducers from './search/searchReducer';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({reducers}),
  applyMiddleware(thunk)
);
export default store;