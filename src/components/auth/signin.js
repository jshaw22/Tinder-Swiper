import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';


class Signin extends Component {
	
	handleFormSubmit({ userName, password }){
		this.props.signinUser({userName, password});
	}

	renderAlert() {
		if (this.props.errorMessage){
			return (
				<div className='alert alert-danger'>Oops! {this.props.errorMessage} </div>
				)
		}
	}

	render () {
		const { handleSubmit, fields: {userName, password} } = this.props;

		return (
				<form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className ='form-group'>
					<label>Username:</label>
					<input {...userName} className='form-control' />  
				</fieldset>
				<fieldset className='form-group'>
					<label>Password:</label>
					<input {...password} type='password' className='form-control' /> 
				</fieldset>
				{this.renderAlert()}
				<button action='submit' className='btn btn-primary'>Sign in</button>
				</form>
		)
	}
}

function mapStateToProps(state){
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	form: 'signin',
	fields: ['userName', 'password']

}, mapStateToProps, actions)(Signin); 
//acts similar to connect. first param is mapstatetoprops, second is mapstatetoactions
