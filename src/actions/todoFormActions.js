export function resetForm() {
    return {
        type: 'RESET_FORM',
        payload: null
    }
}
export function getItemField(item) {
    return {
        type: 'GET_FIELD',
        payload: {
            item: item
        }
    }
}
export function expendForm(ind) {
    return {
        type: 'EXPEND_FORM',
        payload: {
            ind: ind
        }
    }
}
