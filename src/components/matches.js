//componentdid mount => load matches 


import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Matches extends Component {
	
	componentDidMount() {
		console.log("Matches mounted, here are props", this.props.loginInfo.userName)
		const token = this.props.loginInfo.userInfo.accessToken;
		const userID = this.props.loginInfo.userInfo.userID;
	}


  render() {
    return (
    	<div>
    		Welcome, {this.props.loginInfo.userInfo.userName}
    	</div>
    )
  }
}

function mapStateToProps(state){
	return {loginInfo: state.user};
}

export default connect(mapStateToProps, actions)(Matches);
