import { combineReducers } from 'redux';

import todoForm from './TodoForm';
import todoList from './TodoList';
import todoListItem from './TodoListItem';
import app from './App';

export const rootReducer = combineReducers({
    todoForm:todoForm,
    todoList:todoList,
    todoListItem:todoListItem,
    app:app
});