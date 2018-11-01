import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import * as appActions from '../actions/appActions';

export class TodoApp extends React.Component {

    componentDidMount=()=>{
        setInterval(() => this.props.overdueCheck(),60000);
    };
  render() {
      return (
      <div className = "main">
        <TodoForm/>
        <TodoList/>
      </div>
    );
  }
}
TodoApp.propTypes={
    overdueCheck:PropTypes.func.isRequired,
};
function mapStateToProps (state) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        overdueCheck: bindActionCreators(appActions, dispatch).overdueCheck
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TodoApp);
