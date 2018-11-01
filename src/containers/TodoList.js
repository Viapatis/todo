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
        const {filterValue,items}=this.props;
        let todoItems = items.map((item, index) => {
            return (((filterValue === "all")||(filterValue===item.itemImportance))?(
                <TodoListItem
                    item={item}
                    key={index}
                    index={index}
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
    todoListActions:PropTypes.object.isRequired
};
function mapStateToProps (state) {
    return {
        filterValue: state.todoList.filterValue,
        items:state.app.todoItems
    }
}
function mapDispatchToProps(dispatch) {
    return {
        todoListActions: bindActionCreators(todoListActions, dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
