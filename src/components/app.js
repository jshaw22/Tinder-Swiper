import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Matches from './matches';

class App extends Component {


  renderLogin() {
    this.props.login();
  }

  componentWillReceiveProps (nextProps) {
  }

  renderState() {
   if (!this.props.authenticated.loggedIn) {
    return (
      <div>
        <button onClick = {this.renderLogin.bind(this)}>Login with Facebook</button> 
        <div>{this.props.authenticated.loadingStatus}</div>
      </div>
    )
   } else { 
    return <Matches />
    }
  }

  render() {
    return (
    	<div>
        <div>TinderSwiper for Desktop App</div>
        {this.renderState()}
      </div>
    )
  }
}

function mapStateToProps(state){
	return {authenticated: state.user,
          likedBack: state.user.likedBack};
}

export default connect(mapStateToProps, actions)(App);
