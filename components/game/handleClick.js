//This function is called when player reveals cell, it asks if there is
//empty cell or cell with number, if empety recursive function is called
const ROWS = 15
const COLUMNS = 15

export function handleClickOnBoard(x, y, field){
  if(field[x.toString()][y.toString()][(0).toString()] === 0){
    field = revealNeighbourCells(x, y, field);
  }
  else{
    field[x.toString()][y.toString()][(1).toString()] = false;
    }
  return field;
}

//recursive function for revealing all empty cells, when player hits empty cell
function revealNeighbourCells(d, f, field){
    field[d.toString()][f.toString()][(1).toString()] = false;
    if ((f+1 !== COLUMNS) && (field[d.toString()][(f+1).toString()][(1).toString()] === true)){
      field[d.toString()][(f+1).toString()][(1).toString()] = false;
      if(field[d.toString()][(f+1).toString()][(0).toString()] === 0){
        revealNeighbourCells(d, f+1, field);
      }
    }
    if ((f+1 !== COLUMNS) && (d-1 !== -1) && (field[(d-1).toString()][(f+1).toString()][(1).toString()] === true)){
      field[(d-1).toString()][(f+1).toString()][(1).toString()] = false;
      if(field[(d-1).toString()][(f+1).toString()][(0).toString()] === 0){
        revealNeighbourCells(d-1, f+1, field);
      }
    }
    if((d-1 !== -1) && (field[(d-1).toString()][f.toString()][(1).toString()] === true)){
      field[(d-1).toString()][f.toString()][(1).toString()] = false;
      if(field[(d-1).toString()][f.toString()][(0).toString()] === 0){
        revealNeighbourCells(d-1, f, field);
      }
    }
    if((d-1 !== -1) && (f-1 !== -1) && (field[(d-1).toString()][(f-1).toString()][(1).toString()] === true)){
      field[(d-1).toString()][(f-1).toString()][(1).toString()] = false;
      if(field[(d-1).toString()][(f-1).toString()][(0).toString()] === 0){
        revealNeighbourCells(d-1, f-1, field);
      }
    }
    if((f-1 !== -1) && (field[(d).toString()][(f-1).toString()][1] === true)){
      field[(d).toString()][(f-1).toString()][(1).toString()] = false;
      if(field[(d).toString()][(f-1).toString()][(0).toString()] === 0){
        revealNeighbourCells(d, f-1, field);
      }
    }
    if((d+1 !== ROWS) && (f-1 !== -1) && (field[(d+1).toString()][(f-1).toString()][(1).toString()] === true)){
      field[(d+1).toString()][(f-1).toString()][(1).toString()] = false;
      if(field[(d+1).toString()][(f-1).toString()][(0).toString()] === 0){
        revealNeighbourCells(d+1, f-1, field);
      }
    }
    if((d+1 !== ROWS) && (field[(d+1).toString()][(f).toString()][(1).toString()] === true)){
      field[(d+1).toString()][(f).toString()][(1).toString()] = false;
      if(field[(d+1).toString()][(f).toString()][(0).toString()] === 0){
        revealNeighbourCells(d+1, f, field);
      }
    }
    if((d+1 !== ROWS) && (f+1 !== COLUMNS) && (field[(d+1).toString()][(f+1).toString()][(1).toString()] === true)){
      field[(d+1).toString()][(f+1).toString()][(1).toString()] = false;
      if(field[(d+1).toString()][(f+1).toString()][(0).toString()] === 0){
        revealNeighbourCells(d+1, f+1, field);
      }
    }
  return field;
}
