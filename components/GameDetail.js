import React, { Component } from 'react';
import { Accordion, Icon, Button } from 'semantic-ui-react';

export class GameDetail extends Component {
  constructor(props){
    super(props);
    this.state = { 
      activeIndex: -1,
       };
    this.handleClick = this.handleClick.bind(this);
  }

  title(){
    if (this.props.gameDetail.winner){
      return ( 'Game ' + this.props.gameDetail.name + ' is WON by: ' + this.props.gameDetail.winner);
    }
    else{
      return ( 'Game ' + this.props.gameDetail.name + ': ' + this.props.gameDetail.player1 + ' vs ' + this.props.gameDetail.player2);
    }
  }

  playGame(){
    return this.props.playGame(this.props.gameDetail.id);
  }

  joinGame(){
    return this.props.joinGame(this.props.gameDetail.id);
  }

  joinOrPlayFooter(){
    if (this.props.gameDetail.winner){
      return (<p>Game is won by: {this.props.gameDetail.winner}! </p>);
    }
    else if((this.props.gameDetail.player1 === this.props.username) || (this.props.gameDetail.player2 === this.props.username)){
      return (<Button onClick={() => this.playGame()}>Play game</Button>);
    }
    else if(
      (this.props.gameDetail.player1 !== this.props.username) 
        && 
      (this.props.gameDetail.player2 !== this.props.username)
        &&
      ((!this.props.gameDetail.player1) 
        || 
      (!this.props.gameDetail.player2))
    ){
      return (<Button onClick={() => this.joinGame()}>Join game</Button>);
    }
    else{
      return <p>You cannot join game!</p>;
    }
  }

  details(){
    return(
      <p>
        Created on: {this.props.gameDetail.date}<br/><br/>
        Player 1: {this.props.gameDetail.player1}<br/>
        Score: {this.props.gameDetail.player1score}<br/><br/>
        Player 2: {this.props.gameDetail.player2}<br/>
        Score: {this.props.gameDetail.player2score}<br/><br/>
        {this.joinOrPlayFooter()}
      </p>
    );
  }

  handleClick(e, { index }){
    if(this.state.activeIndex === -1){
      this.setState({ activeIndex: index })
    }
    else{
      this.setState({ activeIndex: -1 })
    }
  }

  render() {
    const { activeIndex } = this.state
    return (
      <div>
        <Accordion fluid styled>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            {this.title()}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
              {this.details()}
            </p>
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}