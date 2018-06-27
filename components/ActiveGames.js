import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { GameDetail } from './GameDetail.js';
import { url } from './variables.js';

const IP_ADRESS = url.ip;

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export class ActiveGames extends Component {
  constructor(props){
    super(props);
    this.state = {
      access_token: this.props.access_token,
      allGames: null,
      listOfGames: null,
    };
  }

  playGame(id){
    var tempHistory = '/game/' + id;
    return this.props.history.push(tempHistory);
  }


  async getAllGames(){
      var data;
      await axios.get(IP_ADRESS + 'api/games/',
        { 'headers': { 'Authorization': ('JWT' + ' ' + this.state.access_token) } })
        .then(function (response) {
        console.log("getAllGames reponse is ok!");
        data = response.data;
      }).catch(function (error) {
        console.log(error);
      });
      await this.setState({allGames : data})
      return this.createList(data);
    }

    componentDidMount(){
      return this.getAllGames();
    }

    async createList(data){
      var tempArray = [];
      for(var i = 0; i<this.state.allGames.length; i++){
        if(
          ((this.state.allGames[i].player1 === this.props.username) || (this.state.allGames[i].player2 === this.props.username))
           && 
          (!this.state.allGames[i].winner)
        ){
          tempArray.push(<GameDetail 
            username={this.props.username} 
            gameDetail={this.state.allGames[i]}
            playGame={(id) => this.playGame(id)}
            joinGame={(id) => this.joinGame(id)}
          />);
        }
      }
      return this.setState({listOfGames: tempArray});
    }

  render() {
    if (this.state.listOfGames){
        return (
          <div>
            <br/>Here is list of all active games you currently play:<br/><br/>
            {this.state.listOfGames}
          </div>
        );
      }
      else{
        return(<p>Loading...</p>);
      }
  }
}