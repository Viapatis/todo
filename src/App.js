import React from 'react';
import './App.css';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList';
export default class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {todoItems: [],
                  editing:{
                            allowed:false,
                            todo:{},
                            itemIndex:0
                  }};
  }
  addItem = (todoItem) => {
      this.setState(prevState => ({
          ...prevState,
          todoItems: [...prevState.todoItems, todoItem]
      }));
  };
  removeItem = (itemIndex) => {
      let todoItems=this.state.todoItems;
      todoItems.splice(itemIndex, 1);
      this.setState({
          ...this.state,
          todoItems:todoItems,
          editing:{
              allowed:false,
              todo:{},
              itemIndex:0}
      });
  };
  markTodoDone = (itemIndex) => {
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

      let formatDate = date.toLocaleString("ru",optionsDate)
          .split(".")
          .reverse()
          .join("-")
          +" "+date.toLocaleString("ru",optionsTime);
      let todoItems=this.state.todoItems;
      todoItems[itemIndex].itemDone = !todoItems[itemIndex].itemDone;
      todoItems[itemIndex].timeExecuted = todoItems[itemIndex].itemDone? formatDate:"";
      this.setState({
          ...this.state,
          editing:{ allowed: false,todo:{},itemIndex: 0 },
          todoItems:todoItems
      });
  };
  redactItem = (todoItem) => {
    if(!this.state.editing.allowed){
      this.setState({
          ...this.state,
          editing:{
              allowed: true,
              todo: todoItem,
              itemIndex: todoItem.itemIndex
          }
      });
    }
    else {
      let todoItems=this.state.todoItems;
      todoItems[this.state.editing.itemIndex] = todoItem;
      this.setState({
          ...this.state,
          editing:{
              allowed: false,
              todo:{},
              itemIndex: 0
          },
          todoItems:todoItems
      });
    }
  };
  render() {
    return (
      <div className = "main">
        <TodoForm
            editing = {this.state.editing}
            redactItem = {this.redactItem}
            addItem = {this.addItem}
        />
        <TodoList
            items = {this.state.todoItems}
            redactItem = {this.redactItem}
            removeItem = {this.removeItem}
            markTodoDone = {this.markTodoDone}/>
      </div>
    );
  }
}

