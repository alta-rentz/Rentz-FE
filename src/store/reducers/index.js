import { combineReducers } from 'redux';
import listPost from './postReducers'

const rootReducer = combineReducers({
  listPost
});

export default rootReducer;