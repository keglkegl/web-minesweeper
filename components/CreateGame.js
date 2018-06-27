import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { url } from './variables.js';

const IP_ADRESS = url.ip;

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export class CreateGame extends Component {
	constructor(props){
		super(props);
		this.state = {
			access_token : this.props.access_token,
			username : this.props.username,
			name : '',
			newGame: null
		}
		this.gameTemplate = {
      		name: "",
      		player1: null,
      		player2: null,
      		turn: false,
      		player1score: 0,
      		player2score: 0,
      		winner: null
    	}
		this.handleChangeName = this.handleChangeName.bind(this);
	}

	handleChangeName (e, { name, value }){
    	return this.setState({ name : value });
 	}

 	async submitCreateGame(){
    	var body = this.gameTemplate;
    	body.name = this.state.name;
    	body.player1 = this.props.username;
    	var gameCreated = false;

    	await axios.post(IP_ADRESS + 'api/games/',
    	body,
      	{
        	'headers': { 'Authorization': ('JWT' + ' ' + this.props.access_token) },
       	})
      	.then(function (response) {
      		gameCreated = true;
      		console.log("createNewGame reponse is ok!");
    	}).catch(function (error) {
      		console.log(error);
    	});
    	if(gameCreated){
    		return this.setState({ newGame : "GAME " + this.state.name + ' WAS CREATED!' });
    	}
    	else{
    		return this.setState({ newGame : "ERROR, GAME " + this.state.name + " WAS NOT CREATED" });
    	}
 	}

 	render() {
    	return (
      		<div>
      			Please enter name of the game:
      			<Input type='text' value={this.state.name} name='name' onChange={this.handleChangeName}/><br/>
      			<Button onClick={() => this.submitCreateGame()}>Create</Button><br/><br/>

      			{this.state.newGame}
      		</div>
    	);
  	}
}