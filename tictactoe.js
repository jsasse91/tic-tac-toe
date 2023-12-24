// Using any of the tools you've worked with so far, create a game of
//  Tic-Tac-Toe.
// Create a Tic-Tac-Toe game grid using your HTML element of choice.
// When a cell in the grid is clicked, an X or O should appear in that
//  spot depending on whose turn it is.
// A heading should say whether it is X's or O's turn and change with each
//  move made.
// A button should be available to clear the grid and restart the game.
// When a player has won, or the board is full and the game results in a draw,
//  a Bootstrap alert or similar Bootstrap component should appear across the
//  screen announcing the winner.

//creating a variable to target the divs with a class of cell
const cells = document.querySelectorAll(".cell");
//creating a variable to target the h2 with an id of summary which holds the turns and
// result of the end of the game
const summary = document.querySelector("#summary");
//creating a variable to hold the button the clears the board and resets the game
const restartBtn = document.querySelector(".reset-button");
//declaring a variable that holds an array of arrays that define the win conditions
const winScenario = [
  [0, 1, 2], //top row
  [3, 4, 5], //middle row
  [6, 7, 8], //bottom row
  [0, 3, 6], //left column
  [1, 4, 7], //middle column
  [2, 5, 8], //right column
  [0, 4, 8], //left to right diagonal
  [2, 4, 6], //right to left diagonal
];
//creating a variable to hold the default values of each cell
let cellValue = ["", "", "", "", "", "", "", "", ""];
//creating a variable to hold the starting player, in this case X always goes first
let currentPlayer = "X";
//creating a variable that holds whether the game is still running or not
let running = false;

//invoking the start function that kicks off the game which is defined below
start();

//defining the start function
function start() {
  //loops through each div with a class of cell and adds a click event listener and invokes
  // the clickedCell function which is defined below
  cells.forEach((cell) => cell.addEventListener("click", clickedCell));
  //adding a click event listener and invokes the newGame function which is defined below
  restartBtn.addEventListener("click", newGame);
  //set the text within the h2 summary section to show who's turn it is
  summary.textContent = `${currentPlayer}'s turn`;
  //set the flag for if the game is running to true
  running = true;
}

//defining the clickedCell function
function clickedCell() {
  //creating a variable of cellIndex to hold which cell is being clicked by pulling it's id
  const cellIndex = this.getAttribute("id");
  //if the cellvalue isn't set or the game isn't running the cell is no longer clickable
  if (cellValue[cellIndex] != "" || !running) {
    return;
  }
  //invoke the update function passing 2 variables which defined below
  update(this, cellIndex);
  //invoke the winner function that is defined below
  winner();
}

//defining the update function which takes 2 variables
function update(x, y) {
  //set the value from the array at cellIndex from the clickedCell function
  cellValue[y] = currentPlayer;
  x.textContent = currentPlayer;
}

//defining the playerUpdate function which updates the who's turn it is
function playerUpdate() {
  //checks who the current player is and if it's already x it updates to o if not it updates to x
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  //updates the summary section to declare the current persons turn
  summary.textContent = `${currentPlayer}'s turn`;
}

//defining the winner function which evaluates the winner of the round
function winner() {
  //create a variable to hold if the round is won
  let roundWon = false;
  //use a for loop to go through the winScenarios array and determine if the values match a win condition
  for (let i = 0; i < winScenario.length; i++) {
    //declare what scenario we are evaluating for this particular instance of the loop
    const scenario = winScenario[i];
    //map each value from the array for evaluation
    const cellA = cellValue[scenario[0]];
    const cellB = cellValue[scenario[1]];
    const cellC = cellValue[scenario[2]];
    //evaluate if any of the cells are unclicked, if so keep going
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    //evaluate if the cells all contain the same value, if so update the roundWon to true and end the loop
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  //if the roundWon flag is true do this
  if (roundWon) {
    //update the summary to the winner and show as an alert in green
    summary.setAttribute("class", "text-center alert alert-success");
    summary.textContent = `${currentPlayer} wins!`;
    //updates the flag of running to false
    running = false;
    //if all of the cells are clicked and a winner isn't declared then do this
  } else if (!cellValue.includes("")) {
    //declare a draw in the summary section and show as an alert in red
    summary.setAttribute("class", "text-center alert alert-danger");
    summary.textContent = `Draw!`;
    //update running flag to false
    running = false;
    //if no winner and no draw change players
  } else {
    playerUpdate();
  }
}
//creating the function for a new game which is invoked when the Reset Game button is clicked
function newGame() {
  //creating a variable to hold the count down timer
  let seconds = 3;
  //creating a variable for the timer
  const timer = setInterval(() => {
    //declare that the game is staring over that will update every second
    // counting down from the seconds variable using a loop defined below and sets the summary class back to standard
    summary.setAttribute("class", "text-center");
    summary.textContent = `Game starting over in ${seconds}`;
    seconds--;
    //if seconds is less than 0 do this
    if (seconds < 0) {
      //clear the timer
      clearInterval(timer);
      //reset current player to X since X goes first
      currentPlayer = "X";
      //reset default cell values to blank
      cellValue = ["", "", "", "", "", "", "", "", ""];
      //reset default summary to announce player x's turn
      summary.textContent = `${currentPlayer}'s turn`;
      //the loop that updates each cell
      cells.forEach((cell) => (cell.textContent = ""));
      //sets the running flag back to true since it's a new round
      running = true;
    }
    //every 1000 milliseconds or 1 second
  }, 1000);
}
