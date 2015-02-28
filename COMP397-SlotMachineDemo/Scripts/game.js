/// <reference path="objects/button.ts" />
/// <reference path="text/text.ts" />
// CreateJS Boilerplate for COMP397
// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas;
var stage;
var tiles = [];
var reelContainers = [];
var screenContainers = [];

// GAME VARIABLES
var playerMoney = constants.startingCredit;
var winnings = 0;
var jackpot = constants.startingJackpot;
var turn = 0;
var playerBet = 0;
var spinResult;
var fruits = "";
var currentCredit = 0;

/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

// GAME OBJECTS
var game;
var background;
var spinButton;
var betMaxButton;
var betOneButton;
var resetButton;
var powerButton;

// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

// GAMELOOP
function gameLoop() {
    stage.update();
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

function checkJackPot() {
    /* compare two random values */
    text.txtJackpot = new createjs.Text("5000", "20px play", "#FFFF00");
    text.txtJackpot.x = 246;
    text.txtJackpot.y = 126;
    game.addChild(text.txtJackpot);

    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

function winGame() {
    resetFruitTally();
    playerMoney += winnings;
}

function loseGame() {
    resetFruitTally();
    playerMoney -= playerBet;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = constants.startingCredit;
    winnings = 0;
    jackpot = constants.startingJackpot;
    turn = 0;
    playerBet = 0;
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        } else if (bananas == 3) {
            winnings = playerBet * 20;
        } else if (oranges == 3) {
            winnings = playerBet * 30;
        } else if (cherries == 3) {
            winnings = playerBet * 40;
        } else if (bars == 3) {
            winnings = playerBet * 50;
        } else if (bells == 3) {
            winnings = playerBet * 75;
        } else if (sevens == 3) {
            winnings = playerBet * 100;
        } else if (grapes == 2) {
            winnings = playerBet * 2;
        } else if (bananas == 2) {
            winnings = playerBet * 2;
        } else if (oranges == 2) {
            winnings = playerBet * 3;
        } else if (cherries == 2) {
            winnings = playerBet * 4;
        } else if (bars == 2) {
            winnings = playerBet * 5;
        } else if (bells == 2) {
            winnings = playerBet * 10;
        } else if (sevens == 2) {
            winnings = playerBet * 20;
        } else {
            winnings = playerBet * 1;
        }

        if (sevens == 1) {
            winnings = playerBet * 5;
        }
        winGame();
    } else {
        loseGame();
    }
}

function spinButtonClicked(event) {
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
    determineWinnings();
    winGame();
    loseGame();
    checkJackPot();

    game.removeChild(text.txtWinning);
    game.removeChild(text.txtCredit);
    game.removeChild(text.txtBet);
    game.removeChild(text.txtJackpot);

    text.txtCredit = new createjs.Text(playerMoney.toString(), "20px play", "#FFFF00");
    text.txtCredit.x = 130;
    text.txtCredit.y = 407;
    game.addChild(text.txtCredit);

    text.txtBet = new createjs.Text(playerBet.toString(), "20px play", "#FFFF00");
    text.txtBet.x = 245;
    text.txtBet.y = 407;
    game.addChild(text.txtBet);

    text.txtWinning = new createjs.Text(winnings.toString(), "20px play", "#FFFF00");
    text.txtWinning.x = 370;
    text.txtWinning.y = 407;
    game.addChild(text.txtWinning);

    if (playerMoney == 0) {
        alert("You dont have anymore credits!");
        resetAll();
    }

    for (var index = 0; index < constants.NUM_REELS; index++) {
        reelContainers[index].removeAllChildren();
        tiles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelContainers[index].addChild(tiles[index]);
    }
}

function createUI() {
    background = new createjs.Bitmap("assets/images/background.png");
    game.addChild(background); // Add the background to the game container

    for (var index = 0; index < constants.NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }
    reelContainers[0].x = 128;
    reelContainers[0].y = 296;
    reelContainers[1].x = 248;
    reelContainers[1].y = 296;
    reelContainers[2].x = 374;
    reelContainers[2].y = 296;

    // Spin Button
    spinButton = new objects.Button("assets/images/spinButton.png", 410, 545);
    game.addChild(spinButton.getImage());

    // Spin Button Event Listeners
    spinButton.getImage().addEventListener("click", spinButtonClicked);

    // Bet Max Button
    betMaxButton = new objects.Button("assets/images/betMaxButton.png", 325, 560);
    game.addChild(betMaxButton.getImage());
    betMaxButton.getImage().addEventListener("click", function () {
        playerBet = playerMoney;
    });

    // Bet One Button
    betOneButton = new objects.Button("assets/images/betOneButton.png", 235, 560);
    game.addChild(betOneButton.getImage());
    betOneButton.getImage().addEventListener("click", function () {
        playerBet = 1;
    });

    // Reset Button
    resetButton = new objects.Button("assets/images/resetButton.png", 150, 560);
    game.addChild(resetButton.getImage());
    resetButton.getImage().addEventListener("click", function () {
        resetAll();
        alert("Game reset");
    });

    // Power Button
    powerButton = new objects.Button("assets/images/powerButton.png", 55, 560);
    game.addChild(powerButton.getImage());
    powerButton.getImage().addEventListener("click", function () {
        resetAll();
        alert("Machine off. Resets game!");
    });
}

function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI();

    stage.addChild(game); // Adds the Game Container to the Stage
}
//# sourceMappingURL=game.js.map
