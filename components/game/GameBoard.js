import React from 'react';
import {Cell} from './Cell.js';
import {handleClickOnBoard} from './handleClick.js';
import './css/GameBoard.css';
const ROWS = 15
const COLUMNS = 15

export class GameBoard extends React.Component{
  constructor(props) {
    super(props);

    //Creating MineFieldBoard array which has columns that will be filled with rows later
    this.mineFieldBoard = new Array(ROWS).fill(null);
  }

  //Method of creating MineFieldBoard which will render
  createMineFieldBoard(){
    for (var i=0; i<ROWS; i++){
      this.mineFieldBoard[i] = <div key={i.toString()}>{this.createRow(i)}</div>;
    }
    return this.mineFieldBoard;
  }

  //Method for revealing cell when player click, IT ALSO CALL FOR ALL CHANGES in the game state variables
  revealCell (x, y){
    if((this.props.turn) && (this.props.username === this.props.player1Name)){
      //Making a copy of current field which also has revealed cell
      var tempField = {} = handleClickOnBoard(x, y, this.props.mineFieldSetup);
      this.props.revealCell(tempField);

      //Asking if revealed is mine or not, and making changes
      if(this.props.mineFieldSetup[x.toString()][y.toString()][(0).toString()] === 9){

        //Activates when player 1 wins
        if((this.props.turn) && ((this.props.scorePlayer1+1) > 25)){
          this.props.win();
          return;
        }
        return this.props.changeScore();
      }
      else{
        return this.props.changeTurn(!this.props.turn);
      }
    }
    else if((!this.props.turn) && (this.props.username === this.props.player2Name)){
      //Making a copy of current field which also has revealed cell
      var tempField = {} = handleClickOnBoard(x, y, this.props.mineFieldSetup);
      this.props.revealCell(tempField);

      //Asking if revealed is mine or not, and making changes
      if(this.props.mineFieldSetup[x.toString()][y.toString()][(0).toString()] === 9){

        //Activates when player 1 wins
        if((this.props.turn) && ((this.props.scorePlayer2+1) > 25)){
          this.props.win();
          return;
        }
        return this.props.changeScore();
      }
      else{
        return this.props.changeTurn(!this.props.turn);
      }
    }
    else{
      return;
    }
  }

  //Method which creates row and place it on MineFieldBoard array
  createRow(u){
    var tempRow = new Array(COLUMNS).fill(null);
    for (var j=0; j<COLUMNS; j++){
        tempRow[j] = <Cell key={u.toString()+j.toString()}
                          x={u} //we save coordinate x
                          y={j} //we save coordinate y
                          mineFieldCellNumber={this.props.mineFieldSetup[u.toString()][j.toString()][(0).toString()]}
                          mineFieldCellHidden={this.props.mineFieldSetup[u.toString()][j.toString()][(1).toString()]}
                          onClick={(x, y) => this.revealCell(x, y)}
                        />;
    }
    return tempRow;
  }

  render(){
    return this.createMineFieldBoard();
  }
}
