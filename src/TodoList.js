import React from "react";
import TodoListItem from './TodoListItem';
import './TodoList.css';
export class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            filterValue: "all"
        };
        this.getFilterValue = this.getFilterValue.bind(this);
    }

    getFilterValue(event){
        let filterValue=event.target.value;
        this.setState({filterValue:filterValue});
    }
    render () {
        let items = this.props.items.map((item, index) => {
            return (((this.state.filterValue==="all")||(this.state.filterValue===item.itemImportance))?(
                <TodoListItem
                    key={index}
                    item={item}
                    index={index}
                    mode={this.props.mode}
                    redactItem={this.props.redactItem}
                    removeItem={this.props.removeItem}
                    markTodoDone={this.props.markTodoDone}
                />):""
            );
        });
        return (
            <div className="list-group">
                <h1 className="list-group-header">Todo list</h1>
                <select className= "list-group-filter" value ={this.state.filterValue}onChange={this.getFilterValue}>
                    <option>all</option>
                    <option>normal</option>
                    <option>important</option>
                    <option>very important</option>
                </select>
                {items}
            </div>
        );
    }
}
export default TodoList;