/* Tic tac toe is a game where if three of a players's decisions are in a line, they win the game

 In order to achieve a data type that can render html as the current state of the game board,
 declare a new array that is a matrix with the numbers and classnames of each space on the board
 */

var grid = [[], [""], [""], [""]];


$.fn.child = function (s) {
    return $(this).children(s);
};

var re$et = $('#reset');
var start = $('#startGame');
var xDiv = $('.targetX');
var oDiv = $('.targetO');
var turn;
var letter, klass;
var all;

$(document).ready(init);

function init() {
    for (i = 1; i < 4; i++) {
        for (j = 1; j < 4; j++) {
            var spaceClass = (i + "-" + j);
            var jqueryArray = ($('#' + spaceClass));
            grid[(i)].push(jqueryArray);
        }
    }
}

// When 'Begin' is clicked, set turn to true or false, then activate the corresponding funci

var startGame = function () {

    turn = Math.random() < 0.5;

    switchTurn();

    $('.fa').attr('class', '');

    clickHandler();

    re$et.attr('style', 'display: inline');
    start.attr('style', 'display: none');
    start.closest('.topsquare').attr('onclick', 'reset()');

    $('.square').child().fadeIn('slow');
};

function switchTurn() {
    getDiv().fadeToggle('slow');
    letter = getSymbol();
    klass = getIconClass();
    turn = !turn;
}

function getSymbol() {
    return turn ? "O" : "X"
}

function getIconClass() {
    return turn ? "fa fa-5x fa-circle-o" : "fa fa-5x fa-times"
}

function getDiv() {
    return turn ? oDiv : xDiv
}

function clickHandler() {

    $('.square').click(function () {

        if (!isEmpty(this)) return;

        storeMove(this);
        console.log(getWin());

        if (!getWin()) switchTurn();
        else (gameWin(getWin()))

    })
}

function isEmpty(square) {
    return $(square).data('value') === "";
}

function storeMove(square) {
    $(square).child().attr('class', klass);
    $(square).data('value', letter)
}

function getWin() {
    return horWin() || vertWin() || diags()
}

// Reset the board

function reset() {
    $('.fa').fadeOut('slow');
    $('.square').data('value', '');
    start.attr('style', 'display: inline');
    re$et.attr('style', 'display: none');
    xDiv.fadeOut('fast');
    oDiv.fadeOut('fast');
    start.closest('.topsquare').attr('onclick', 'startGame()');
}


// Create a function that checks for a win



function inARow(one, two, three) {
    var winDivs = [one, two, three];
    var winLetters = [one.data('value'), two.data('value'), three.data('value')];
    var sequence = winLetters.join("");
    var threeX = (sequence === 'XXX');
    var threeO = (sequence === 'OOO');

    if (threeX) return winDivs;
    else if (threeO) return winDivs.reverse();
    else return false
}

function gameWin(winDivs) {
    $('.fa').fadeOut('slow');
    function fadeOne() {
        winDivs[0].find('.fa').fadeIn('slow');
    }
    function fadeTwo() {
        winDivs[1].find('.fa').fadeIn('slow')
    }

    function fadeThree() {
        winDivs[2].find('.fa').fadeIn('slow')
    }

    displayWinningTurnIndicator(winDivs[0].data('value'));
    setTimeout(fadeOne, 200);
    setTimeout(fadeTwo, 800);
    setTimeout(fadeThree, 1200);
    function fadeAll() {
        $('.fa').fadeIn('slow');
    }

    setTimeout(fadeAll, 2000);

    $('.square').unbind('click');
    return true;
}

function displayWinningTurnIndicator(a) {
    xDiv.fadeOut('fast');
    oDiv.fadeOut('fast');
    if (a === "X") {
        xDiv.fadeIn('slow')
    } else {
        oDiv.fadeIn('slow')
    }
}
// Horizontal Wins


function horWin() {
    return inARow(grid[1][1], grid[1][2], grid[1][3]) ||
        inARow(grid[2][1], grid[2][2], grid[2][3]) ||
        inARow(grid[3][1], grid[3][2], grid[3][3])
}

function vertWin() {
    return inARow(grid[1][1], grid[2][1], grid[3][1]) ||
        inARow(grid[1][2], grid[2][2], grid[3][2]) ||
        inARow(grid[1][3], grid[2][3], grid[3][3])
}

function diags() {
    return inARow(grid[1][1], grid[2][2], grid[3][3]) ||
        inARow(grid[1][3], grid[2][2], grid[3][1])
}



