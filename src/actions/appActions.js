export function addItem(todoItem) {
    return {
        type: 'ADD_ITEM',
        payload: {
            todoItem: todoItem
        }
    }
}

export function removeItem(itemIndex) {
    return {
        type: 'REMOVE_ITEM',
        payload: {
            itemIndex: itemIndex
        }
    }
}
export function markTodoDone(itemIndex) {
    return {
        type: 'DONE_ITEM',
        payload: {
            itemIndex: itemIndex
        }
    }
}
export function editItem(todoItem) {
    return {
        type: 'EDIT_ITEM',
        payload: {
            todoItem: todoItem
        }
    }
}