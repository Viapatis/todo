import React from "react";
import TodoListItem from './TodoListItem';
import './TodoList.css';
import PropTypes from 'prop-types';
export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            filterValue: "all"
        };
    }
    getFilterValue=(event)=>{
        let filterValue=event.target.value;
        this.setState({
            ...this.state,
            filterValue:filterValue
        });
    };
    render () {
        let {filterValue}=this.state;
        let todoItems = this.props.items.map((item, index) => {
            return (((filterValue==="all")||(filterValue===item.itemImportance))?(
                <TodoListItem
                    item={item}
                    key={index}
                    index={index}
                    redactItem={this.props.redactItem}
                    removeItem={this.props.removeItem}
                    markTodoDone={this.props.markTodoDone}
                />):""
            );
        });
        let todoList=
            <div className="list-group">
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
    redactItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    markTodoDone: PropTypes.func.isRequired
};