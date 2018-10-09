import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList';
export let todoItems = [];
let storage=localStorage;
if("todoItems" in storage) {
    let data=storage.getItem("todoItems");
    todoItems=JSON.parse(data);
}

export class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {todoItems: todoItems,
                  editing:{
                            allowed:false,
                            todo:{},
                            itemIndex:0
                  }};
  }
  componentDidMount(){
      setInterval(function () {
          for(let i=0;i<todoItems.length;i++){
              if((todoItems[i].itemDate!=="")&&(todoItems[i].itemTime!=="")&&!todoItems[i].itemDone){
                  let currentTime = new Date();
                  let date = todoItems[i].itemDate + " " + todoItems[i].itemTime;
                  console.log(date);
                  let dateItem = new Date(date);
                  if (currentTime > dateItem) {
                      todoItems[i].overdue = true;
                      localStorage.setItem("todoItems", JSON.stringify(todoItems));
                  }
              }
          }
      },60000);
  };
  addItem=(todoItem)=> {
    todoItems.unshift(todoItem);
    this.setState({todoItems: todoItems});
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }
  removeItem =(itemIndex)=>{
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }
  markTodoDone=(itemIndex)=> {
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
  redactItem=(todoItem)=>{
    if(!this.state.editing.allowed){
      this.setState({
          ...this.state,
          editing:{ allowed: true,todo:todoItem,itemIndex: todoItem.itemIndex }
      });
    }
    else if( this.state.editing.allowed){
      todoItems[todoItem.itemIndex]=todoItem;
        this.setState({
            ...this.state,
            editing:{ allowed: false,todo:{},itemIndex: 0 },
            todoItems:todoItems
        });
    }
  }
  render() {
    return (
      <div className="main">
        <TodoForm
            editing={this.state.editing}
            redactItem={this.redactItem}
            addItem={this.addItem}
            items={this.state.todoItems}
        />
        <TodoList
            editing={this.state.editing}
            items={this.state.todoItems}
            redactItem={this.redactItem}
            removeItem={this.removeItem}
            markTodoDone={this.markTodoDone}/>
      </div>
    );
  }
}

export default TodoApp;
