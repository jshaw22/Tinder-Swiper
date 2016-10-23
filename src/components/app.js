import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Matches from './matches';

class App extends Component {


  renderLogin() {
    this.props.login();
  }

  renderState() {
   if(this.props.authenticated.loggedIn){
    return <Matches />
   }
  }

  render() {
    return (
    	<div>
        <div>TinderSwiper for Desktop App</div>
        <button onClick = {this.renderLogin.bind(this)}>Login with Facebook</button>
        {this.renderState()}
        
      </div>
    )
  }
}

function mapStateToProps(state){
	return {authenticated: state.user};
}

export default connect(mapStateToProps, actions)(App);
