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


// When 'Begin' is clicked, set turn to true or false, then activate the corresponding funci

var startGame = function () {

    turn = Math.random() < 0.5 ? false : true;

    if (!turn) {
        switchTurn('X', "fa fa-5x fa-times", xDiv);
    } else if (turn) {
        switchTurn('O', "fa fa-5x fa-circle-o", oDiv);
    }

    $('.fa').attr('class', '');

    clickHandler();

    re$et.attr('style', 'display: inline');
    start.attr('style', 'display: none');
    start.closest('.topsquare').attr('onclick', 'reset()');

    $('.square').child().fadeIn('slow');
};

function switchTurn(l, cLass, div) {
    div.fadeToggle('slow');
    letter = l;
    klass = cLass;
    turn = !turn;
}

function clickHandler() {

    $('.square').click(function () {

        if ($(this).data('value') === "") {

            $(this).child().attr('class', klass);
            $(this).data('value', letter);
            if(horWin() || vertWin() || diags()) {
                return
            };

            if (!turn) {
                switchTurn('X', "fa fa-5x fa-times", xDiv);
                oDiv.fadeToggle('slow')
            } else if (turn) {
                switchTurn('O', "fa fa-5x fa-circle-o", oDiv);
                xDiv.fadeToggle('slow')
            }
        }
    })
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


for (i = 1; i < 4; i++) {
    for (j = 1; j < 4; j++) {
        var spaceClass = (i + "-" + j);
        var jqueryArray = ($('#' + spaceClass));
        grid[(i)].push(jqueryArray);
    }
}

function inARow(one, two, three) {
    var won = one.data('value');
    var too = two.data('value');
    var tree = three.data('value');

    all = won + too + tree;

    switch(all) {
        case 'XXX':
            return gameWin();
        case 'OOO':
            return gameWin();
    }

    function gameWin() {
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

        setTimeout(fadeAll, 2000);

        $('.square').unbind('click');
        return true;
    }

    // First iteration of a check for a win:


//    if (won === two.data('value')) {
//        if (two.data('value') === three.data('value') && won === three.data('value')) {
//            if (won !== "") {
//
//            }
//        }
//    }
    
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



