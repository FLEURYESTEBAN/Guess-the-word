var height = 6; // number of guesses
var width = 5; // length of the word

var row = 0; // current guess (attempt #)
var col = 0; // current letter for that attempt

var gameOver = false;
var word = "JOUER"; // Example word with 5 letters

window.onload = function() {
    initialize();
}

function initialize() {
    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        let key = e.key.toUpperCase();
        if (key.match(/[A-Z]/) && key.length === 1) {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = key;
                    col += 1;
                }
            }
        } else if (e.code === "Backspace") {
            if (0 < col && col <= width) {
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        } else if (e.code === "Enter") {
            if (col == width) {
                update();
                row += 1; // start new row
                col = 0; // start at 0 for new row
            }
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    });

    // Listen for on-screen keyboard clicks
    document.querySelectorAll(".key").forEach(key => {
        key.addEventListener("click", () => {
            if (gameOver) return;

            let keyText = key.innerText.toUpperCase();

            if (keyText === "ENTER") {
                if (col == width) {
                    update();
                    row += 1;
                    col = 0;
                }
            } else if (keyText === "BACKSPACE") {
                if (0 < col && col <= width) {
                    col -= 1;
                }
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                currTile.innerText = "";
            } else if (keyText.match(/[A-Z]/) && keyText.length === 1) {
                if (col < width) {
                    let currTile = document.getElementById(row.toString() + '-' + col.toString());
                    if (currTile.innerText == "") {
                        currTile.innerText = keyText;
                        col += 1;
                    }
                }
            }

            if (!gameOver && row == height) {
                gameOver = true;
                document.getElementById("answer").innerText = word;
            }
        });
    });
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } else if (word.includes(letter)) {
            currTile.classList.add("present");
        } else {
            currTile.classList.add("absent");
        }
    }

    if (correct == width) {
        gameOver = true;
        displayVictoryMessage();
    }
}

function displayVictoryMessage() {
    let popup = document.getElementById("popup");
    popup.classList.add("visible");
  }
  
  function closePopup() {
    let popup = document.getElementById("popup");
    popup.classList.remove("visible");
  }
