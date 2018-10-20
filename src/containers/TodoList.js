import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoListItem from './TodoListItem';
import '../styles/TodoList.css';
import * as todoListActions from '../actions/todoListActions';

export class TodoList extends React.Component {
    getFilterValue=(event)=>{
        let filterValue=event.target.value;
        this.props.todoListActions.getFilterValue(filterValue);
    };
    render () {
        const {filterValue,items,editItem,removeItem,markTodoDone}=this.props;
        let todoItems = items.map((item, index) => {
            return (((filterValue === "all")||(filterValue===item.itemImportance))?(
                <TodoListItem
                    item={item}
                    key={index}
                    index={index}
                    editItem={editItem}
                    removeItem={removeItem}
                    markTodoDone={markTodoDone}
                />):""
            );
        });
        let todoList=
            <div className="list-group" >
                <h1 className="list-group-header">Todo list</h1>
                <select className= "list-group-filter" value ={filterValue} onChange={this.getFilterValue}>
                    <option>all</option>
                    <option>normal</option>
                    <option>important</option>
                    <option>very important</option>
                </select>
                {todoItems}
            </div>;
        return (todoList);
    }
}
TodoList.propTypes={
    items:PropTypes.array.isRequired,
    editItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    markTodoDone: PropTypes.func.isRequired
};
function mapStateToProps (state) {
    return {
        filterValue: state.todoList.filterValue,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        todoListActions: bindActionCreators(todoListActions, dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
