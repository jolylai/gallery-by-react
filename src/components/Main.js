require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Login from './Login';
import Stage from './Stage';
import ReactDOM from 'react-dom';
import { Input,Button,Form,Icon } from 'antd';

var AppComponent = React.createClass({
  getInitialState:function(){
    return {
      imgsRangeArr:[],
      userName:''
    }
  },
  login: function (){
    //return function (){
      this.setState({
        userName: '林月丹'
      })
    //}.bind(this)
  },
  render: function() {
    if(this.state.userName == '林月丹'){
      return (
        <Stage/>
      )
    }else {
      return (
        <Login login={this.login}/>
      )
    }

  }
});

AppComponent.defaultProps = {
  userName:null
};

export default AppComponent;
