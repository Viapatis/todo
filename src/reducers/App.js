import { ADD_ITEM ,REMOVE_ITEM,DONE_ITEM,EDIT_ITEM} from '../constants/App';

const initialState = {
    todoItems:[],
    editing:{
        allowed:false,
        todo:{},
        itemIndex:0
    }
};

export default function app(state = initialState,action) {
    switch(action.type) {
        case ADD_ITEM: {
            return{
                ...state,
                todoItems: [...state.todoItems,action.payload.todoItem]
            };
        }
        case REMOVE_ITEM: {
            let todoItems = state.todoItems;
            let itemIndex = action.payload.itemIndex;
            todoItems.splice(itemIndex, 1);
            return {
                ...state,
                todoItems: [...todoItems],
                editing: {
                    allowed: false,
                    todo: {},
                    itemIndex: 0
                }
            };
        }
        case DONE_ITEM: {
            let formatDate=getDate();
            let todoItems = state.todoItems;
            let itemIndex = action.payload.itemIndex;
            let todoItem={...todoItems[itemIndex]};
            todoItem.itemDone = !todoItem.itemDone;
            todoItem.timeExecuted = todoItem.itemDone ? formatDate : "";
            todoItems[itemIndex]= todoItem;
            return {
                ...state,
                todoItems: [...todoItems],
                editing: {
                    allowed: false,
                    todo: {},
                    itemIndex: 0
                }
            };
        }
        case EDIT_ITEM: {
            let todoItem = action.payload.todoItem;
            if (!state.editing.allowed) {
                return {
                    ...state,
                    editing: {
                        allowed: true,
                        todo: todoItem,
                        itemIndex: todoItem.itemIndex
                    }
                };
            }
            else {
                let todoItems = state.todoItems;
                todoItems[state.editing.itemIndex] = todoItem;
                return {
                    ...state,
                    todoItems: [...todoItems],
                    editing: {
                        allowed: false,
                        todo: {},
                        itemIndex: 0
                    }
                };
            }
        }
        default: return state
    }
}
function getDate() {
    let date = new Date();
    let optionsDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',

    };
    let optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
    };

    let formatDate = date.toLocaleString("ru", optionsDate)
            .split(".")
            .reverse()
            .join("-")
        + " " + date.toLocaleString("ru", optionsTime);
    return formatDate;
}