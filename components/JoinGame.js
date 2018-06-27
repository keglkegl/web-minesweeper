import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Game } from './game/Game.js';
import { url } from './variables.js';
import { GameDetail } from './GameDetail.js';

const IP_ADRESS = url.ip;

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export class JoinGame extends Component {
	constructor(props){
		super(props);
		this.state = {
			gameDetail : null
		}
    this.id = this.props.match.params.id
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
    	await this.setState({gameDetail : data});
      return this.joinGame(id);
  	}

  async joinGame(id){
    var temp_response = false;
    var body = this.state.gameDetail;
    if((body.player1 !== this.props.username) && (body.player2 !== this.props.username)){
      if (body.player1 === null){
        body.player1 = this.props.username;
      }
      else{
        body.player2 = this.props.username;
      }
    }
    await axios.put(
    IP_ADRESS + 'api/game/' + id + '/',
    body,
      {
        'headers': { 'Authorization': ('JWT' + ' ' + this.props.access_token) },
       })
      .then(function (response) {
      temp_response = true;
      console.log("joinGame reponse is ok!");
    }).catch(function (error) {
      console.log(error);
    });
    if(temp_response){
      return this.setState({gameDetail : body});
    }
    else{
      return this.setState({gameDetail : null})
    }
  }

	componentDidMount(){
  	return this.getGameDetails(this.id);
  }

	render() {
		if(this.state.gameDetail){
    	return (
    		<div>You have joined game: <br/><br/><br/>
          <GameDetail 
            username={this.props.username} 
            gameDetail={this.state.gameDetail}
            playGame={(id) => this.playGame(this.id)}
            joinGame={(id) => this.joinGame(this.id)}
          />
    		</div>
      );
    }
    else{
    	return (<div>Loading...</div>);
  	}
  }
}
