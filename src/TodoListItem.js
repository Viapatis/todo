import React from "react";
import './TodoListItem.css';
import TodoForm from "./TodoForm";
import PropTypes from 'prop-types';
export default class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            extended: false
        };
    }
    onClickClose = () => {
        let itemIndex = this.props.index;
        this.props.removeItem(itemIndex);
    };
    onClickDone = () => {
        let itemIndex = this.props.index;
        this.props.markTodoDone(itemIndex);
    };
    onClickRedact = () => {
        let todo=this.props.item;
        todo.itemIndex = this.props.index;
        this.props.redactItem(todo);
    };
    expendItem = () =>{
        let ind=!this.state.extended;
        this.setState({
            ...this.state,
            extended:ind
        });
    };
    render () {
        let {extended} = this.state;
        let item = this.props.item;
        let timeExecuted = (item.timeExecuted!=="")?
            (<p className = "timeExecuted"> Done:{item.timeExecuted} </p>):"";
        let timeDate = ((item.itemDate!=="")||(item.itemTime!==""))?
            (<p className = "timeDateToComplete">To complete:
                {item.itemDate} {item.itemTime}</p>):"";
        let [formBody ,expendButtonValue] = extended ?
            [(
             <div className = "list-group-item item-body">
                <p className = "description"> {item.itemDescription}</p>
                <div className = "item-body other">
                     <p className = "importance">Importance: {item.itemImportance}</p>
                     <div className = "timeData">
                         {timeDate}
                         {timeExecuted}
                     </div>
                </div>
             </div>
            ),"-"]:
            ["","+"];
        let todoClass = item.overdue ?
            "todoOverdue" :
            (item.itemDone ?
                "todoDone" :
                "todoUndone");
        let todoListItem=(
            <div className = {"list-group-item "+todoClass}>
                <div className = "list-group-item item-head">
                    <button className = "expend-button"
                            onClick={this.expendItem}
                    >
                        {expendButtonValue}
                    </button>
                    <div className = "head-checkbox" >
                        <input type = "checkbox" className="checkbox" onChange={this.onClickDone} />
                    </div>
                    <p className = "name">{item.itemName}</p>
                    <button className = "close" onClick={this.onClickClose}>&times;</button>
                    <button
                        className = "redact"
                        disabled = {(item.itemDone||item.overdue)}
                        onClick = {this.onClickRedact}
                    >
                        &#9998;
                    </button>
                </div>
                {formBody}
            </div>
        )
        return(todoListItem);
    }
}
TodoListItem.propTypes={
    item:PropTypes.object.isRequired,
    key: PropTypes.number.isRequired,
    index:PropTypes.number.isRequired,
    redactItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    markTodoDone: PropTypes.func.isRequired
};