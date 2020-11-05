import message from './message'

import auth from './auth'

import {combineReducers} from 'redux'


const rootReducer = combineReducers({

     message,

     auth

})


export default rootReducer