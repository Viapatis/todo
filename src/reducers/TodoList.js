import {GET_FILTER} from '../constants/TodoList';

const initialState = {
    filterValue: "all"
};

export default function todoList(state = initialState,action) {
    switch (action.type) {
        case GET_FILTER: {
            return {
                ...state,
                filterValue:action.payload
            };
        }
        default:
            return state;
    }
}