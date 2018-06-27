import React from 'react';
import './css/Cell.css';

//This module only load pictures on certain cells, and connects hidden cells when clicked with GameBoard

export function Cell(props){
    if (!props.mineFieldCellHidden){
      if(props.mineFieldCellNumber === 0){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/nula.png")} /></button>);
      }
      else if (props.mineFieldCellNumber === 1){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/ena.png")} /></button>);
      }
      else if (props.mineFieldCellNumber === 2){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/dva.png")} /></button>);
      }
      else if (props.mineFieldCellNumber === 3){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/tri.png")} /></button>);
      }
      else if (props.mineFieldCellNumber === 4){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/stiri.png")} /></button>);
      }
      else if (props.mineFieldCellNumber === 5){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/pet.png")} /></button>);
      }
      else if (props.mineFieldCellNumber === 6){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/sest.png")} /></button>);
      }
      else if (props.mineFieldCellNumber === 7){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/sedem.png")} /></button>);
      }
      else if (props.mineFieldCellNumber === 8){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/osem.png")} /></button>);
      }
      else if (props.mineFieldCellNumber === 9){
        return(<button className="Gumb"><img className="Gumb" src={require("./imgs/mina.png")} /></button>);
      }
    }
    else{
      return(<button className="Gumb" onClick={() => props.onClick(props.x, props.y)}><img className="Gumb" src={require("./imgs/hidden.png")} /></button>);
    }
}
