import { combineReducers } from 'redux'
import timerReducer from './timer/timerReducer'

const rootReducer = combineReducers({
 timer:timerReducer
})

export default rootReducer;
