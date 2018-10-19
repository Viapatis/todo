import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/TodoListItem.css';
import * as todoListItemActions from '../actions/todoListItemActions';

export class TodoListItem extends React.Component {
    onClickClose = () => {
        let itemIndex = this.props.index;
        this.props.removeItem(itemIndex);
    };
    onClickDone = () => {
        let itemIndex = this.props.index;
        this.props.markTodoDone(itemIndex);
    };
    onClickEdit = () => {
        let todo=this.props.item;
        todo.itemIndex = this.props.index;
        this.props.editItem(todo);
    };
    expendItem = () =>{
        this.props.todoListItemActions.expendItem();
    };
    render () {
        const {extended,item} = this.props;
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
                        <input type = "checkbox" className="checkbox" checked={item.itemDone} onChange={this.onClickDone} />
                    </div>
                    <p className = "name">{item.itemName}</p>
                    <button className = "close" onClick={this.onClickClose}>&times;</button>
                    <button
                        className = "redact"
                        disabled = {(item.itemDone||item.overdue)}
                        onClick = {this.onClickEdit}
                    >
                        &#9998;
                    </button>
                </div>
                {formBody}
            </div>
        );
        return(todoListItem);
    }
}
TodoListItem.propTypes={
    item:PropTypes.object.isRequired,
    key: PropTypes.number,
    index:PropTypes.number.isRequired,
    editItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    markTodoDone: PropTypes.func.isRequired,
    extended:PropTypes.bool.isRequired
};
function mapStateToProps (state) {
    return {
        extended: state.todoListItem.extended,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        todoListItemActions: bindActionCreators(todoListItemActions, dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoListItem);
