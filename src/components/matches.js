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

	passUser () {
		// write the code for this
		// probably need to write some actions 
	}

	likeUser () {
		// write the code for this
		// will need to write some actions 
	}

	superLikeUser () {
		//hook this up 
		//add some actions dammit 
	}

	renderMatchProfile () {
		//ew this validation is so unclean. pls fix
		if(this.props.match){
			const {bio, name, photos, distance_mi, jobs, _id } = this.props.match;
			console.log("data", _id)

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

			//fix this 
			// const renderJobs = () => {
			// 	let jobTitle = '';
			// 	if(jobs){
			// 		if (jobs[0].title) {
			// 			jobTitle = `${jobs[0].title.name} at ${jobs[0].company.name}`
			// 			return <div className="job"><strong>Work:</strong> {jobTitle}</div>
			// 		} else if (jobs[0].company) {
			// 			jobTitle = `Works at ${jobs[0].company.name}`
			// 			return <div className="job">{jobTitle}</div>
			// 		}
			// 	}
			// }


			return (
				<div>
					<div className="buttons">
						<button onClick={this.passUser} className="btn btn-danger">Pass</button>
						<button onClick={this.likeUser} className="btn btn-success">Like</button>
						<button onClick={this.superLikeUser} className="btn btn-info">Super Like!</button>
					</div>
						
					<div className="matchName"><strong>Match name:</strong> {name}</div>
					<div className="distance"><strong>Distance:</strong> {distance_mi} miles</div>
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
