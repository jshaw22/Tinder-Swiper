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

	renderMatchProfile () {
		//ew this validation is so unclean. pls fix
		if(this.props.match){
			const {bio, name, photos} = this.props.match;
			console.log(bio, name, photos)

			const renderPictures = () => {
				return photos.map((pic, idx) => {
					const pictureThumbnailLink = pic.processedFiles[1].url;
					return (
						<div key={idx} className="col-sm-6 col-xs-12">
							<div className="col-sm-12 col-xs-12">
								<img src={pictureThumbnailLink} />
							</div>
						</div>
						)
				})
			}

			return (
				<div>
					<div className="matchName"><strong>Match name:</strong> {name}</div>
					<div className="bio"><strong>Bio:</strong> {bio}</div>
					<div className="row">
						{renderPictures()}
					</div>
				</div>
			)
		}
	}

  render() {
    return (
    	<div>
    		<div className="welcomeName">Welcome, {this.props.loginInfo.userInfo.userName}</div>
    		{this.renderMatchProfile()}
    	</div>
    )
  }
}

function mapStateToProps(state){
	return {
		loginInfo: state.user,
		match: state.user.recs
	};
}

export default connect(mapStateToProps, actions)(Matches);
