import { ADD_ITEM ,REMOVE_ITEM,DONE_ITEM,EDIT_ITEM,OVERDUE_CHECK} from '../constants/App';

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
        case OVERDUE_CHECK: {
            console.log('f');
            let todoItems = [...state.todoItems];
            for(let i=0;i<todoItems.length;i++){
                if((todoItems[i].itemDate!=="")&&!todoItems[i].itemDone){
                    let time=(todoItems[i].itemTime!=="")?todoItems[i].itemTime:"00:00";
                    let currentTime = new Date();
                    let date = todoItems[i].itemDate + " " + time;
                    let dateItem = new Date(date);
                    if (currentTime > dateItem) {
                        todoItems[i].overdue = true;
                    }
                }
            }
            return{
                ...state,
                todoItems: [...todoItems]
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