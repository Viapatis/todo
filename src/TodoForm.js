import React from "react";
import './TodoForm.css';
export class TodoForm extends React.Component {
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
    getDate=(event)=>{
        let item=((this.props.editing.allowed)&&(!this.state.change))?
            this.props.editing.todo:
            this.state.newItem;
        item.itemDate=event.target.value;
        this.setState({
            ...this.state,
            newItem:item,
            change:true
        });
    };
    getName=(event)=>{
        let item=((this.props.editing.allowed)&&(!this.state.change))?
            this.props.editing.todo:
            this.state.newItem;
        item.itemName=event.target.value;
        this.setState({
            ...this.state,
            newItem:item,
            change:true
        });
    };
    getDescription=(event)=>{
        let item=((this.props.editing.allowed)&&(!this.state.change))?
            this.props.editing.todo:
            this.state.newItem;
        item.itemDescription=event.target.value;
        this.setState({
            ...this.state,
            newItem:item,
            change:true
        });
    };
    getImportance=(event)=>{
        let item=((this.props.editing.allowed)&&(!this.state.change))?
            this.props.editing.todo:
            this.state.newItem;
        item.itemImportance=event.target.value;
        this.setState({
            ...this.state,
            newItem:item,
            change:true
        });
    };
    getTime=(event)=>{
        let item=((this.props.editing.allowed)&&(!this.state.change))?
            this.props.editing.todo:
            this.state.newItem;
        item.itemTime=event.target.value;
        this.setState({
            ...this.state,
            newItem:item,
            change:true
        });
    };
    expendForm=()=>{
        let ind=!this.state.extended;
        this.setState({extended:ind});
    }


    render () {
        let {newItem,change,extended}=this.state;
        let editing=this.props.editing;
        let addButtonMessage=editing.allowed ? "Redact": "Add";
        let item=(editing.allowed&&!change)? editing.todo:newItem;
        let [formBody,expendButtonValue]=extended?[
            <div className="form-body">
                <textarea
                    value={item.itemDescription}
                    onInput={this.getDescription}
                    placeholder="Description..."
                    className="form-description"
                />
                <div>
                    <select  className="form-importance" value={item.itemImportance} onChange={this.getImportance} >
                        <option>normal</option>
                        <option>important</option>
                        <option>very important</option>
                    </select>
                    <input
                        type="date"
                        className="form-date"
                        value={item.itemDate}
                        onInput={this.getDate}
                    />
                    <input
                        type="time"
                        value={item.itemTime}
                        onInput={this.getTime}
                        className="form-Time"
                    />
                </div>
            </div>,"-"]:["","+"];

        return (
            <div className="form-inline">
                <div className="form-head">
                    <button className=" expend-button" onClick={this.expendForm}>{expendButtonValue}</button>
                    <input type="text" className="form-name"  value={item.itemName} onInput={this.getName} placeholder="Name a new todo..."/>
                    <button className="add-button" onClick={this.addItem}>{addButtonMessage}</button>
                </div>
                {formBody}
            </div>
        );
    }
}
export default TodoForm;