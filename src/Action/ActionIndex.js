import * as actionType from './type'

export const setUser = (user)=>{
    return{
        type: actionType.SET_USER,
        payload:{
            currentuser: user
        }
    }
}
