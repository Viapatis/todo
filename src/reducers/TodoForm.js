import {RESET_FORM ,GET_FIELD,EXPEND_FORM} from '../constants/TodoForm';

const initialState = {
    newItem: {
        itemName: "",
        itemDescription:"",
        itemImportance: "normal",
        itemDate: "",
        itemTime: "",
        itemDone:false,
        timeExecuted:"",
        overdue:false
    },
    change:false,
    extended:false
};

export default function todoForm(state = initialState,action) {
    switch(action.type) {
        case RESET_FORM:
            return {
                ...state,
                newItem:{
                    itemName: "",
                    itemDescription:"",
                    itemImportance: "normal",
                    itemDate: "",
                    itemTime: "",
                    itemDone:false,
                    timeExecuted:"",
                    overdue:false
                },
                change: false,
                extended:false
            };
        case GET_FIELD:
            return {
                ...state,
                newItem: {...action.payload.item},
                change: true
            };
        case EXPEND_FORM:
            return {
                ...state,
                extended:action.payload.ind
            };
        default:
            return state;
    }
}