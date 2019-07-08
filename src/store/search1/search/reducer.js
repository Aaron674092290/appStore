import { combineReducers } from 'redux'
import { SEARCH_HOT,SEARCH_RESULT,CLEAR_SEARCH_RESULT } from './action'
function hots(state = [], action){
  switch(action.type) {
    case SEARCH_HOT:
      return action.obj;
    default:
      return state;
  }
}

function result(state = [], action){
  switch(action.type) {
    case SEARCH_RESULT:
      return action.obj;
    default:
      return state;
  }
}
function clearResult(state = [], action){
  switch(action.type) {
    case CLEAR_SEARCH_RESULT:
      return [];
    default:
      return state;
  }
}


const Reducers = combineReducers({
  hots,result,clearResult
})

export default Reducers