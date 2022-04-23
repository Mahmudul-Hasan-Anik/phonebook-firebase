import { combineReducers } from 'redux'
import * as actionType from '../Action/type'

const initValue = {
    currentuser: null,
    loading: true
}

const root_reducer = (state = initValue, action)=>{
    switch(action.type){
       case actionType.SET_USER:
           return{
               currentuser: action.payload.currentuser
           }
       default: return state
    }
}

const Reducer = combineReducers({
    user: root_reducer
})

export default Reducer