import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Game } from './game/Game.js';
import { url } from './variables.js';

const IP_ADRESS = url.ip;

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export class PlayGame extends Component {
	constructor(props){
		super(props);
		this.state = {
			gameDetail : null
		}
	}

	async getGameDetails(id){
		var data;
    	await axios.get(IP_ADRESS + 'api/game/' + id + '/',
      	{ 'headers': { 'Authorization': ('JWT' + ' ' + this.props.access_token) } })
      	.then(function (response) {
      	 console.log("getGameDetails reponse is ok!");
      	 data = response.data;
    	  }).catch(function (error) {
      	 console.log(error);
    	});
    	return this.setState({gameDetail : data})
  	}

	componentDidMount(){
  		return this.getGameDetails(this.props.match.params.id);
  	}

	render() {
		if(this.state.gameDetail){
    		return (
    			<div>You are playing game {this.state.gameDetail.name}<br/><br/><br/>
    				<Game 
    					access_token={this.props.access_token}
    					gameDetail={this.state.gameDetail}
    					username={this.props.username}
    				/>
    			</div>
    		);
    	}
    	else{
    		return (<div>Loading...</div>);
    	}
  	}
}
