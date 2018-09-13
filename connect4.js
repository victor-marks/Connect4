/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // let row = Array.from(new Array(WIDTH), function(val) {
  //   val = null;
  //   return val;
  // });
  for (let i = 0; i < HEIGHT; i++) {
    board[i] = [];
    for (let j = 0; j < WIDTH; j++) {
      board[i][j] = null;
    }
  }

  console.log(board);
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"
  let HTMLboard = document.getElementById('board');

  // creating top row by adding cells based on width
  var top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }
  HTMLboard.append(top);

  // adding rest of rows
  for (var y = 0; y < HEIGHT; y++) {
    var row = document.createElement('tr');
    for (var x = 0; x < WIDTH; x++) {
      let td = document.createElement('td');
      td.setAttribute('id', `${y}-${x}`);
      row.append(td);
    }
    HTMLboard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][x] === null) {
      return i;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let cellDiv = document.createElement('div');
  cellDiv.className = `piece p${currPlayer}`;
  document.getElementById(`${y}-${x}`).append(cellDiv);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  console.log(board);
  placeInTable(y, x);

  /** endGame: announce game end */

  function endGame(msg) {
    alert(msg);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  board.every(y => y.every(x => x !== null));

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer++ : currPlayer--;

  console.log(currPlayer);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
