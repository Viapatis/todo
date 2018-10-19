import {EXPEND_ITEM} from '../constants/TodoListItem';

const initialState = {
    extended: false
};
export default function todoListItem(state = initialState,action) {
    switch(action.type) {
        case EXPEND_ITEM:
            let ind=!state.extended;
            return{
                ...state,
                extended:ind
            };
        default: return state
    }
}