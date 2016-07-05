import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component { 

	renderLinks() {
		console.log("authenication status", this.props.authenticated)
			if (this.props.authenticated) {
				console.log("Render links authenticated")
				return <li className="nav-item"><Link className="nav-link" to="/signout">Sign Out</Link></li>
			} else {
				return (
					<div>
						<li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
						<li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
					</div>
				)
			}
	}

	render () {
		console.log("state of auth", this.props.authenticated)
		return (
			<nav className='navbar navbar-light'>
				<Link to ='/' className="navbar-brand">BingoSmash!</Link> 
				<ul className='nav navbar-nav'>
					{this.renderLinks()}
				</ul>
			</nav>
			)
	}
}

function mapStateToProps(state){
	return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);