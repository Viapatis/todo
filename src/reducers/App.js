import { ADD_ITEM ,REMOVE_ITEM,DONE_ITEM,EDIT_ITEM,OVERDUE_CHECK,EXPEND_ITEM} from '../constants/App';

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
            const {todoItems} = state;
            const {itemIndex} = action.payload;
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
            const formatDate=getDate();
            const {todoItems} = state;
            const {itemIndex} = action.payload;
            const todoItem={...todoItems[itemIndex]};
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
            const {todoItem} = action.payload;
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
                const {todoItems,editing} = state;
                todoItems[editing.itemIndex] = todoItem;
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
        case OVERDUE_CHECK: {
            const todoItems = [...state.todoItems];
            for(let i=0;i<todoItems.length;i++){
                if((todoItems[i].itemDate!=="")&&!todoItems[i].itemDone){
                    const time=(todoItems[i].itemTime!=="")?todoItems[i].itemTime:"00:00";
                    const currentTime = new Date();
                    const date = todoItems[i].itemDate + " " + time;
                    const dateItem = new Date(date);
                    if (currentTime > dateItem) {
                        todoItems[i].overdue = true;
                        todoItems[i]={...todoItems[i]};
                    }
                }
            }
            return{
                ...state,
                todoItems: [...todoItems]
            }
        }
        case EXPEND_ITEM:
            const {todoItems} = state;
            const {itemIndex} = action.payload;
            const todoItem={...todoItems[itemIndex]};
            todoItem.extended=!todoItem.extended;
            todoItems[itemIndex]=todoItem;
            return{
                ...state,
                todoItems: [...todoItems]
            };
        default: return state
    }
}
function getDate() {
    const date = new Date();
    const optionsDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',

    };
    const optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
    };

    return  date.toLocaleString("ru", optionsDate)
            .split(".")
            .reverse()
            .join("-")
        + " " + date.toLocaleString("ru", optionsTime);
}