import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList';
export let todoItems = [];
const mode={phase:"new"};
let storage=localStorage;
if("todoItems" in storage) {
    let data=storage.getItem("todoItems");
    todoItems=JSON.parse(data);
}


export class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.redactItem = this.redactItem.bind(this);
    this.state = {todoItems: todoItems,
                  mode:mode};
  }
  addItem(todoItem) {
    todoItems.unshift(todoItem);
    this.setState({todoItems: todoItems});
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }
  markTodoDone(itemIndex) {
      let date = new Date();
      let optionsDate = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',

      };
      let optionsTime = {
          hour: 'numeric',
          minute: 'numeric',
      };

      let formatDate=((date.toLocaleString("ru",optionsDate).split(".")).reverse()).join("-")+" "+date.toLocaleString("ru",optionsTime);
      todoItems[itemIndex].itemDone = !todoItems[itemIndex].itemDone;
      todoItems[itemIndex].timeExecuted=todoItems[itemIndex].itemDone? formatDate:"";
    this.setState({todoItems: todoItems});  
  }
  redactItem(step,todoItem){
    if(step==="start"){
      mode.phase="redact";
      mode.itemIndex=todoItem.itemIndex;
      this.setState({mode: mode});
    }
    else if( step==="end"){
      todoItems[mode.itemIndex]=todoItem;
      mode.phase="new";
      this.setState({todoItems: todoItems,mode: mode}); 
    }
  }
  render() {
    return (
      <div className="main">
        <TodoForm
            mode={this.state.mode}
            redactItem={this.redactItem}
            addItem={this.addItem}
            items={this.state.todoItems}
        />
        <TodoList
            mode={this.state.mode}
            items={this.state.todoItems}
            redactItem={this.redactItem}
            removeItem={this.removeItem}
            markTodoDone={this.markTodoDone}/>
      </div>
    );
  }
}

export default TodoApp;
