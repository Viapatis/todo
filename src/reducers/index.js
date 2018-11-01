import { combineReducers } from 'redux';

import todoForm from './TodoForm';
import todoList from './TodoList';
import app from './App';

export const rootReducer = combineReducers({
    todoForm:todoForm,
    todoList:todoList,
    app:app
});