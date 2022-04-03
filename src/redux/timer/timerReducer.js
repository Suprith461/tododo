import {ADD_LABEL_REQUEST,ADD_LABEL_SUCCESS,ADD_LABEL_FAILURE,
    READ_LABELS_REQUEST,READ_LABELS_SUCCESS,READ_LABELS_FAILURE
    } from './timerActionTypes'
    
    const initialState= {
        addingLabel:false,
        addedLabelStatus:null,
        addLabelError:null,

        readingLabels:false,
        readLabelsPayload:null,
        readLabelsError:null
    
    
    }
    
    export default function timerReducer(state=initialState,action){
        switch(action.type){
            case ADD_LABEL_REQUEST:
                return{
                    ...state,
                   addingLabel:true
                }
            case ADD_LABEL_SUCCESS:
                return{
                    ...state,
                    addingLabel:false,
                    addedLabelStatus:action.payload
                }
            case ADD_LABEL_FAILURE:
                    return{
                        ...state,
                        addingLabel:false,
                        addLabelError:action.payload
                    }
            
            case READ_LABELS_REQUEST:
                return{
                    ...state,
                    readingLabels:true
                }

            case READ_LABELS_SUCCESS:
                return{
                    ...state,
                    readingLabels:false,
                    readLabelsPayload:action.payload
                }
            case READ_LABELS_FAILURE:
                return{
                    ...state,
                    readingLabels:false,
                    readLabelsError:action.payload
                }
          
              
            default:return state
        }
    }