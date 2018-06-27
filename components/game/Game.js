import React from 'react';
import {createField} from './createField.js';
import {GameBoard} from './GameBoard.js';
import {GameInformation} from './GameInformation.js';
import './css/Game.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import qs from 'qs';
import Pusher from 'pusher-js';
import { url } from '../variables.js';

const IP_ADRESS = url.ip;

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
var pusher = new Pusher('eff33873fa92681cdb5e', {
  cluster: 'eu',
  encrypted: true
});

//[] = createField(15, 15, this.numberOfMines)

export class Game extends React.Component {
  constructor(props){
    super(props);
    this.numberOfMines = 51;
    this.state = {
      username : this.props.username,
      mineFieldSetup : this.props.gameDetail.mineFieldSetup,
      turn : this.props.gameDetail.turn,
      scorePlayer1: this.props.gameDetail.player1score,
      scorePlayer2: this.props.gameDetail.player2score,
      player1Name: this.props.gameDetail.player1,
      player2Name: this.props.gameDetail.player2,
      winner : this.props.gameDetail.winner,
    }
    var channel = pusher.subscribe(this.props.gameDetail.id + '_game');
    channel.bind('event', (data) => {
      this.setState({mineFieldSetup: data.mineFieldSetup});
      this.setState({turn: data.turn});
      this.setState({scorePlayer1: data.player1score});
      this.setState({scorePlayer2: data.player2score});
    });
  }

  render(){

    return ([
      <div className="winText"> To win you must find 26 mines<br/>
        You are playing as {this.state.username}<br/>
      </div>,

    // Here we are creating component that has information about the game, player names, score,...
        <div
          key="GameInformation"
          className="GameInformation">
            <GameInformation
              player1Name={this.state.player1Name}
              player2Name={this.state.player2Name}
              turn={this.state.turn}
              scorePlayer1={this.state.scorePlayer1}
              scorePlayer2={this.state.scorePlayer2}
            />
        </div>,

    //Here we are creating component that is creating whole board of the game
        <div
          key="GameBoard"
          className="GameBoard">
            <GameBoard
              username = {this.state.username}
              mineFieldSetup={this.state.mineFieldSetup}
              player1Name={this.state.player1Name}
              player2Name={this.state.player2Name}
              scorePlayer1={this.state.scorePlayer1}
              scorePlayer2={this.state.scorePlayer2}
              changeTurn={(turnChange) => this.changeTurn(turnChange)}
              changeScore={() => this.changeScore()}
              revealCell={(newField) => this.setState({mineFieldSetup: newField})}
              turn={this.state.turn}
              win={() => this.win()}
            />
        </div>
      ]);
  }

  async updateMineFieldChange(){
    var body = this.props.gameDetail;
    body.mineFieldSetup = this.state.mineFieldSetup;
    body.player1score = this.state.scorePlayer1;
    body.player2score = this.state.scorePlayer2;
    body.winner = this.state.winner;
    body.turn = this.state.turn;

    await axios.put(
    IP_ADRESS + 'api/game/' + this.props.gameDetail.id + '/',
    body,
      {
        'headers': { 'Authorization': ('JWT' + ' ' + this.props.access_token) },
      })
      .then(function (response) {
      console.log("changeGameField reponse is ok!");
    }).catch(function (error) {
      console.log(error);
    });

    return ;
  }

  async changeTurn(turnChange){
    await this.setState({turn: turnChange})
    this.updateMineFieldChange();
  }

  //When one one of the players find > 25 mines method is called, that can reset the game
  async win (){
    if(this.state.turn){
      await this.setState({winner: this.state.player1Name});
      this.updateMineFieldChange();
      //Alert who has won and suggestion of restarting the game
      if(window.confirm(this.state.player1Name + ' has won the game, do you wish to restart it?')){
      }
    }
    else{
      await this.setState({winner: this.state.player2Name});
      this.updateMineFieldChange();
      //Alert who has won and suggestion of restarting the game
      if(window.confirm(this.state.player2Name + ' has won the game, do you wish to restart it?')){
      }
    }
    return;
  }

  //Method called, when mine is found
  async changeScore(){
    var tempScore = 0;
    if(this.state.turn){
      tempScore = this.state.scorePlayer1 + 1;
      await this.setState({scorePlayer1: tempScore});
      this.updateMineFieldChange();
    }
    else{
      tempScore = this.state.scorePlayer2 + 1;
      await this.setState({scorePlayer2: tempScore});
      this.updateMineFieldChange();
    }
  }
}
