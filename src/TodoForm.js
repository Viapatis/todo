import React from "react";
import './TodoForm.css';
import PropTypes from 'prop-types';
export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            newItem: {
                itemName: "",
                itemDescription:"",
                itemImportance: "normal",
                itemDate: "",
                itemTime: "",
                itemDone:false,
                timeExecuted:"",
                overdue:false
            },
            change:false,
            extended:false
        };
    };
    addItem=()=> {
        if(!this.props.editing.allowed) {
            let newTodo=this.state.newItem;
            this.props.addItem(newTodo);
        }
        else{
            let editedTodo=this.state.change ? this.state.newItem:this.props.editing.todo;
            this.props.redactItem(editedTodo);
        }
        this.setState({
            ...this.state,
            newItem:{
                itemName: "",
                itemDescription:"",
                itemImportance: "normal",
                itemDate: "",
                itemTime: "",
                itemDone:false,
                timeExecuted:"",
                overdue:false
                },
            change: false,
            extended:false
        });

    };
    getItemField=(fieldName)=>{
        let item=((this.props.editing.allowed)&&(!this.state.change))?
            this.props.editing.todo:
            this.state.newItem;
        return (event) => {
            item[fieldName] = event.target.value;
            this.setState({
                ...this.state,
                newItem: item,
                change: true
            });
        };
    };
    expendForm=()=>{
        let ind=!this.state.extended;
        this.setState({extended:ind});
    }


    render () {
        let {newItem,change,extended} = this.state;
        let editing = this.props.editing;
        let addButtonMessage = editing.allowed ? "Redact" : "Add";
        let item = (editing.allowed&&!change)? editing.todo : newItem;
        let [formBody,expendButtonValue]=extended ? [
            <div className = "form-body">
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
            </div>,"-"] : ["","+"];
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
};
TodoForm.propTypes={
    redactItem: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired
};