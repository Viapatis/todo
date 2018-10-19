import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import * as appActions from '../actions/appActions';

export class TodoApp extends React.Component {
  render() {
      let{todoItems,editing}=this.props;
      let { addItem,removeItem,markTodoDone,editItem } = this.props.appActions;
      return (
      <div className = "main">
        <TodoForm
            editing = {editing}
            editItem = {editItem}
            addItem = {addItem}
        />
        <TodoList
            items = {todoItems}
            editItem = {editItem}
            removeItem = {removeItem}
            markTodoDone = {markTodoDone}/>
      </div>
    );
  }
}
TodoApp.propTypes={
    todoItems:PropTypes.array.isRequired,
    editing:PropTypes.object.isRequired
};
function mapStateToProps (state) {
    return {
        todoItems: state.app.todoItems,
        editing: state.app.editing,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoApp);
