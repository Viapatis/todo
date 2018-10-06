import React from "react";
import './TodoListItem.css';
export class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            extended: false
        };
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
        this.onClickRedact = this.onClickRedact.bind(this);
        this.expendItem = this.expendItem.bind(this);
    }
    onClickClose() {
        let index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    onClickDone() {
        let index = parseInt(this.props.index);
        this.props.markTodoDone(index);
    }
    onClickRedact() {
            let itemIndex = parseInt(this.props.index);
            this.props.redactItem("start", {itemIndex});
    }
    expendItem(){
        let ind=!this.state.extended;
        this.setState({extended:ind});
    }
    render () {
        let expendButtonValue=this.state.extended? "-":"+";
        let todoClass = this.props.item.overdue?"todoOverdue" :(this.props.item.itemDone ?
            "todoDone" : "todoUndone");
        let timeExecuted=(this.props.item.timeExecuted!=="")?
            (<p className="list-group-item-body-other-timeExecuted">Done: {this.props.item.timeExecuted} </p>):"";
        let timeDate=((this.props.item.itemDate!=="")||(this.props.item.itemTime!==""))?
            (<p className="list-group-item-body-other-timeDateToComplete">To complete:
                {this.props.item.itemDate} {this.props.item.itemTime}</p>):"";
        let formBody=this.state.extended?(
            <div className="list-group-item-body">
                <p className="list-group-item-body-description"> {this.props.item.itemDescription}</p>
                <div className="list-group-item-body-other">
                    <p className="list-group-item-body-other-importance">Importance: {this.props.item.itemImportance}</p>
                    <div className="list-group-item-body-other-timeData">
                        {timeDate}
                        {timeExecuted}
                    </div>
                </div>
            </div>):"";
        return(
                <div className={"list-group-item "+todoClass}>
                    <div className="list-group-item-head">
                        <button className="list-group-item-head-expend-button" onClick={this.expendItem}>{expendButtonValue}</button>
                        <div className="list-group-item-head-checkbox" >
                            <input type="checkbox" className="checkbox" onChange={this.onClickDone} />
                        </div>
                        <p className="list-group-item-head-name">{this.props.item.itemName}</p>
                        <button className="close" onClick={this.onClickClose}>&times;</button>
                        <button  className="redact" disabled={this.props.item.itemDone} onClick={this.onClickRedact}>&#9998;</button>
                    </div>
                    {formBody}
                </div>
        );
    }
}
export default TodoListItem;