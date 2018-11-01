import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/TodoForm.css';
import * as todoFormActions from '../actions/todoFormActions';
import * as appActions from '../actions/appActions';

export class TodoForm extends React.Component {

    addItem=()=> {
        let editing=this.props.editing;
        if(!editing.allowed) {
            let newTodo=this.props.newItem;
            this.props.addItem(newTodo);
        }
        else{
            let editedTodo=this.props.change ? this.props.newItem:editing.todo;
            this.props.editItem(editedTodo);
        }
        this.props.todoFormActions.resetForm();
    };
    getItemField=(fieldName)=>{
        let item=((this.props.editing.allowed)&&(!this.props.change))?
            this.props.editing.todo:
            this.props.newItem;
        return (event) => {
            item[fieldName] = event.target.value;
            this.props.todoFormActions.getItemField(item);
        };
    };
    expendForm=()=>{
        let ind=!this.props.extended;
        this.props.todoFormActions.expendForm(ind);
    };


    render () {
        const {newItem,change,extended,editing}= this.props;
        const addButtonMessage = editing.allowed ? "Redact" : "Add";
        const item = (editing.allowed&&!change)? editing.todo : newItem;
        const expendButtonValue=extended ? "-": "+";
        const formBody=(
            <div className = "form-body" hidden={!extended}>
                <textarea
                    value = {item.itemDescription}
                    onChange = {this.getItemField("itemDescription")}
                    placeholder = "Description..."
                    className = "form-description"
                />
                <div>
                    <select  className="form-importance" value={item.itemImportance} onChange={this.getItemField("itemImportance")} >
                        <option>normal</option>
                        <option>important</option>
                        <option>very important</option>
                    </select>
                    <input
                        type = "date"
                        className = "form-date"
                        value = {item.itemDate}
                        onChange = {this.getItemField("itemDate")}
                    />
                    <input
                        type = "time"
                        value = {item.itemTime}
                        onChange = {this.getItemField("itemTime")}
                        className = "form-Time"
                    />
                </div>
            </div>
        );
        let todoForm=(
            <div className="form-inline">
                <div className="form-head">
                    <button className=" expend-button" onClick={this.expendForm}>{expendButtonValue}</button>
                    <input
                        type="text"
                        className="form-name"
                        value={item.itemName}
                        onChange={this.getItemField("itemName")}
                        placeholder="Name a new todo..."
                    />
                    <button className="add-button" onClick={this.addItem}>{addButtonMessage}</button>
                </div>
                {formBody}
            </div>
        );

        return (todoForm);
    }
}
TodoForm.propTypes={
    editItem: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    newItem:PropTypes.object.isRequired,
    change:PropTypes.bool.isRequired,
    extended:PropTypes.bool.isRequired
};
function mapStateToProps (state) {
    return {
        newItem: state.todoForm.newItem,
        change:state.todoForm.change,
        extended:state.todoForm.extended,
        editing: state.app.editing
    }
}
function mapDispatchToProps(dispatch) {
    return {
        todoFormActions: bindActionCreators(todoFormActions, dispatch),
        addItem:bindActionCreators(appActions, dispatch).addItem,
        editItem:bindActionCreators(appActions, dispatch).editItem
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoForm);
