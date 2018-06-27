//This function is called when setting up mineField, it returns field
//with random placed mines on it, and fill adjacent cells with numbers
export function createField(rows, columns, mines){
  //creating empty array like mineField
  var field = new Array(rows).fill(null);
  field = field.map(x => new Array(columns).fill(null));

  //filling empty field with mines randomly
  for (var o = 0; o < rows; o++){
    field[o] = field[o].map(x => new Array(0, true));
  }
  field = fillMines(rows, columns, field, mines);

  //placing numbers on adjacent cells
  for (var k = 0; k < rows; k++){
    for (var h = 0; h<columns; h++){
      if(field[k][h][0] !== 9){
        field[k][h][0] = countNeighbourMines(k, h, field);
      }
    }
  }
  return field;
}

//This function will randomly fill mines on field
export function fillMines (rows, columns, field, mineCounter){
  var x, y = 0;
    while (mineCounter !== 0){
    x = Math.floor(Math.random() * Math.floor(rows));
    y = Math.floor(Math.random() * Math.floor(columns));
    if (field[x][y][0] !== 9){
      field[x][y][0] = 9;
      mineCounter -= 1;
    }
  }
  return field;
}

//this function will count mines on cells that are empty and adjacent to mines
export function countNeighbourMines (d, f, field){
  var mineCounter = 0
  if ((f+1 !== field[d].length) && (field[d][f+1][0] === 9)){
    mineCounter += 1;
  }
  if ((f+1 !== field[d].length) && (d-1 !== -1) && (field[d-1][f+1][0] === 9)){
    mineCounter += 1;
  }
  if((d-1 !== -1) && (field[d-1][f][0] === 9)){
    mineCounter += 1;
  }
  if((d-1 !== -1) && (f-1 !== -1) && (field[d-1][f-1][0] === 9)){
    mineCounter += 1;
  }
  if((f-1 !== -1) && (field[d][f-1][0] === 9)){
    mineCounter += 1;
  }
  if((d+1 !== field.length) && (f-1 !== -1) && (field[d+1][f-1][0] === 9)){
    mineCounter += 1;
  }
  if((d+1 !== field.length) && (field[d+1][f][0] === 9)){
    mineCounter += 1;
  }
  if((d+1 !== field.length) && (f+1 !== field[d].length) && (field[d+1][f+1][0] === 9)){
    mineCounter += 1;
  }
  return mineCounter;
}
