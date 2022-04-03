import {ADD_LABEL_REQUEST,ADD_LABEL_SUCCESS,ADD_LABEL_FAILURE} from './timerActionTypes'

export function addLabelRequest(data){
    return{
        type:ADD_LABEL_REQUEST,
        payload:data
    }
}

export function addLabelSuccess(data){
    return{
        type:ADD_LABEL_SUCCESS,
        payload:data
    }
}

export function addLabelFailure(data){
    return{
        type:ADD_LABEL_FAILURE,
        payload:data
    }
}