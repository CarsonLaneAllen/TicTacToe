/* Tic tac toe is a game where if three of a players's decisions are in a line, they win the game

 In order to achieve a data type that can render html as the current state of the game board,
 declare a new array that is a matrix with the numbers and classnames of each space on the board
 */

var grid = [[], [""], [""], [""]];



$.fn.child = function (s) {
    return $(this).children(s);
};


// To add a listener to check the score, just define the function somewhere else and add it to the #whole listneer

var startGame = function () {
    turn = Math.random() < 0.5 ? false : true;
    if (!turn) {
        xTurn();
    } else if (turn) {
        $('.target0').removeAttr('style');
        oTurn();
    }
    clickHandler();
    $('#reset').attr('style', 'display: inline');
    $('#startGame').attr('style', 'display: none');
    $('#startGame').closest('.topsquare').attr('onclick', 'reset()');
};


var turn;
var letter, klass;


function oTurn() {
    $(".targetO").fadeIn('slow');
    $(".targetX").fadeOut('slow');
    letter = "O";
    klass = 'fa fa-5x fa-circle-o';
    turn = !turn;
}
function xTurn() {
    $(".targetX").fadeIn('slow');
    $(".targetO").fadeOut('slow');
    letter = "X";
    klass = 'fa fa-5x fa-times';
    turn = !turn;
}

for (i = 1; i < 4; i++) {
    for (j = 1; j < 4; j++) {
        var spaceClass = (i + "-" + j);
        var jqueryArray = ($('#' + spaceClass));
        grid[(i)].push(jqueryArray);
    }
}

function clickHandler() {
    $('.square').click(function () {
        if ($(this).data('value') === "") {
            $(this).child().attr('class', klass);
            $(this).data('value', letter);
            if (!turn) {
                xTurn();
            } else if (turn) {
                oTurn();
            }
        } else {
            console.log('taken');
        }
        horWin();
        vertWin();
        fullBoard();
    })
}

// Reset the board

function reset() {
    for (i = 1; i < 4; i++) {
        for (j = 1; j < 4; j++) {
            grid[i][j].child().attr('class', '');
            grid[i][j].data('value', '')
        }
    }
    $('#startGame').attr('style', 'display: inline');
    $('#reset').attr('style', 'display: none');
    $(".targetX").fadeOut('fast');
    $(".targetO").fadeOut('fast');
    $('#startGame').closest('.topsquare').attr('onclick', 'startGame()');
}


// Create a function that checks for a win

function inARow(one, two, three) {
    if (one.data('value') === two.data('value')) {
        if (two.data('value') === three.data('value') && one.data('value') === three.data('value')) {
            if (one.data('value') !== "") {
                $('.fa').fadeOut('slow');
                function fadeOne() {
                    one.find('.fa').fadeIn('slow');
                }
                function fadeTwo() {
                    two.find('.fa').fadeIn('slow')
                }
                function fadeThree() {
                    three.find('.fa').fadeIn('slow')
                }
                winner(one);
                setTimeout(fadeOne, 200);
                setTimeout(fadeTwo, 800);
                setTimeout(fadeThree, 1200);
                function fadeAll() {
                    $('.fa').fadeIn('slow');
                }
                setTimeout(fadeAll, 2000)
            }
        }
    }
}

function winner(a) {
    $('.targetX').fadeOut('fast');
    $('.targetO').fadeOut('fast');
    if (a.data('value') === "X") {
        $('.targetX').fadeIn('slow')
    } else {
        $('.targetO').fadeIn('slow')
    }
}



// Horizontal Wins

// create a filter that gets all of the values of a row

// inARow(grid[1][1], grid[2][1], grid[3][1])

function horWin() {
    inARow(grid[1][1], grid[1][2], grid[1][3]);
    inARow(grid[2][1], grid[2][2], grid[2][3]);
    inARow(grid[3][1], grid[3][2], grid[3][3])
}

function vertWin() {
    inARow(grid[1][1], grid[2][1], grid[3][1]);
    inARow(grid[1][2], grid[2][2], grid[3][2]);
    inARow(grid[1][3], grid[2][3], grid[3][3])
}

// Check if the board is full

var fullBoard = function() {
//    for (i = 1; i < 4; i++) {
//        for (j = 1; j < 4; j++) {
//            if (grid[i][j].data('value') === "") {
//                return;
//            } else {
//                console.log('gameover')
//            }
//        }
//    }
};