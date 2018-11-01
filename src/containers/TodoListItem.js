import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/TodoListItem.css';
import * as appActions from '../actions/appActions';

export class TodoListItem extends React.Component {
    onClickClose = () => {
        const itemIndex = this.props.index;
        this.props.removeItem(itemIndex);
    };
    onClickDone = () => {
        const itemIndex = this.props.index;
        this.props.markTodoDone(itemIndex);
    };
    onClickEdit = () => {
        const todo=this.props.item;
        todo.itemIndex = this.props.index;
        this.props.editItem(todo);
    };
    expendItem = () =>{
        const itemIndex = this.props.index;
        this.props.expendItem(itemIndex);
    };
    render () {
        const {item} = this.props;
        const showTimeExecuted = !(item.timeExecuted!=="");
        const showTimeDate = !((item.itemDate!=="")||(item.itemTime!==""));
        const expendButtonValue = item.extended ? "-": "+";
        const formBody=(
            <div className = "list-group-item item-body" hidden={!item.extended}>
                <p className = "description"> {item.itemDescription}</p>
                <div className = "item-body other">
                    <p className = "importance">Importance: {item.itemImportance}</p>
                    <div className = "timeData">
                        <p className ="timeDateToComplete" hidden={showTimeDate}>
                            To complete:{item.itemDate} {item.itemTime}
                        </p>
                        <p className = "timeExecuted"hidden={showTimeExecuted}> Done:{item.timeExecuted} </p>
                    </div>
                </div>
            </div>
        );
        const todoClass = item.overdue ?
            "todoOverdue" :
            (item.itemDone ?
                "todoDone" :
                "todoUndone");
        const todoListItem=(
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
    expendItem: PropTypes.func.isRequired
};
function mapStateToProps (state) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        editItem: bindActionCreators(appActions, dispatch).editItem,
        removeItem:bindActionCreators(appActions, dispatch).removeItem,
        markTodoDone:bindActionCreators(appActions, dispatch).markTodoDone,
        expendItem:bindActionCreators(appActions, dispatch).expendItem
    }
}
export default connect( mapStateToProps,mapDispatchToProps)(TodoListItem);
