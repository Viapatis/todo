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
                timeExecuted:""
            },
            change:false,
            extended:false
        };
        this.addItem = this.addItem.bind(this);
        this.getDate=this.getDate.bind(this);
        this.getName=this.getName.bind(this);
        this.getDescription=this.getDescription.bind(this);
        this.getImportance=this.getImportance.bind(this);
        this.getTime=this.getTime.bind(this);
        this.expendForm=this.expendForm.bind(this);
    };
    addItem() {
        let newTodo=this.state.newItem;
        if(this.props.mode.phase === "new") {
            this.props.addItem(newTodo);
        }
        else{
            if(this.state.change)
                this.props.redactItem("end",newTodo);
            else {
                let oldTodo = this.props.items[this.props.mode.itemIndex];
                this.props.redactItem("end", oldTodo);
            }
        }
        this.setState({
            newItem:{
                itemName: "",
                itemDescription:"",
                itemImportance: "normal",
                itemDate: "",
                itemTime: "",
                itemDone:false,
                timeExecuted:""
                },
            change: false,
            extended:false
        });

    };
    getDate(event){
        if((this.props.mode.phase === "redact")&&(!this.state.change)){
            let redactItem=this.props.items[this.props.mode.itemIndex];
            redactItem.itemDate=event.target.value;
            this.setState({newItem:redactItem,change:true});
        }
        else{
            let item=this.state.newItem;
            item.itemDate=event.target.value;
            this.setState({newItem:item,change:true});
        };
    };
    getName(event){
        if((this.props.mode.phase === "redact")&&(!this.state.change)){
            let redactItem=this.props.items[this.props.mode.itemIndex];
            redactItem.itemName=event.target.value;
            this.setState({newItem:redactItem,change:true});
        }
        else{
            let item=this.state.newItem;
            item.itemName=event.target.value;
            this.setState({newItem:item,change:true});
        };
    };
    getDescription(event){
        if((this.props.mode.phase === "redact")&&(!this.state.change)){
            let redactItem=this.props.items[this.props.mode.itemIndex];
            redactItem.itemDescription=event.target.value;
            this.setState({newItem:redactItem,change:true});
        }
        else{
            let item=this.state.newItem;
            item.itemDescription=event.target.value;
            this.setState({newItem:item,change:true});
        };
    };
    getImportance(event){
        if((this.props.mode.phase === "redact")&&(!this.state.change)){
            let redactItem=this.props.items[this.props.mode.itemIndex];
            redactItem.itemImportance=event.target.value;
            this.setState({newItem:redactItem,change:true});
        }
        else{
            let item=this.state.newItem;
            item.itemImportance=event.target.value;
            this.setState({newItem:item,change:true});
        };
    };
    getTime(event){

        if((this.props.mode.phase === "redact")&&(!this.state.change)){
            let redactItem=this.props.items[this.props.mode.itemIndex];
            redactItem.itemTime=event.target.value;
            this.setState({newItem:redactItem,change:true});
        }
        else{
            let item=this.state.newItem;
            item.itemTime=event.target.value;
            this.setState({newItem:item,change:true});
        };
    };
    expendForm(){
        let ind=!this.state.extended;
        this.setState({extended:ind});
    }


    render () {
        let addButtonValue=(this.props.mode.phase === "new")? "Add": "Redact";
        let expendButtonValue=this.state.extended? "-":"+";
        let item=(this.props.mode.phase === "new") ? this.state.newItem:
            (this.state.change?this.state.newItem:this.props.items[this.props.mode.itemIndex]);
        let formBody=this.state.extended?(
            <div className="form-body">
                <textarea value={item.itemDescription} onInput={this.getDescription}placeholder="Description..."className="form-description"  > </textarea>
                <div>
                    <select  className="form-importance" value={item.itemImportance} onChange={this.getImportance} >
                        <option>normal</option>
                        <option>important</option>
                        <option>very important</option>
                    </select>
                    <input type="date"  className="form-date" value={item.itemDate}onInput={this.getDate}/>
                    <input type="time" value={item.itemTime} onInput={this.getTime} className="form-Time" />
                </div>
            </div>):"";

        return (
            <div className="form-inline">
                <div className="form-head">
                    <button className=" expend-button" onClick={this.expendForm}>{expendButtonValue}</button>
                    <input type="text" className="form-name"  value={item.itemName} onInput={this.getName} placeholder="Name a new todo..."/>
                    <button className="add-button" onClick={this.addItem}>{addButtonValue}</button>
                </div>
                {formBody}
            </div>
        );
    }
}
export default TodoForm;