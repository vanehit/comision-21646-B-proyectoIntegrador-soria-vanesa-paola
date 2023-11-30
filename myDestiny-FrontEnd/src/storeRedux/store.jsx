// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReducerPosts from './reducers/ReducerPosts';

const store = createStore(ReducerPosts, applyMiddleware(thunk));

export default store;
