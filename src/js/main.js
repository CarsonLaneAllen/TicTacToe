/* Tic tac toe is a game where if three of a players's decisions are in a line, they win the game

 In order to achieve a data type that can render html as the current state of the game board,
 declare a new array that is a matrix with the numbers and classnames of each space on the board
 */

var grid = [[], [''], [''], ['']];

var firebaseRef = new Firebase("https://blistering-fire-8275.firebaseio.com/");

var usersRef = firebaseRef.child("users");

var scoreRef = firebaseRef.child('leaderboard');

var winsRef = firebaseRef.child('wins');





usersRef.set({
    alanisawesome: {
        date_of_birth: "June 23, 1912",
        full_name: "Alan Turing"
    },
    gracehop: {
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper"
    },
    grahamIsTheBeast: {
        date_of_birth: 'June 22, 1994'
    }
});


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
            var spaceClass = (i + '-' + j);
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
    getOtherDiv().fadeOut('slow');
    letter = getSymbol();
    klass = getIconClass();
    turn = !turn;
}

function getSymbol() {
    return turn ? 'O' : 'X'
}

function getIconClass() {
    return turn ? 'fa fa-5x fa-circle-o' : 'fa fa-5x fa-times'
}

function getDiv() {
    return turn ? oDiv : xDiv
}

function getOtherDiv() {
    return !turn ? oDiv : xDiv
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
    return $(square).data('value') === '';
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
    var sequence = winLetters.join('');
    var threeX = (sequence === 'XXX');
    var threeO = (sequence === 'OOO');

    if (threeX) return winDivs;
    else if (threeO) return winDivs.reverse();
    else return false
}

function gameWin(winDivs) {
    setStorage(winDivs[0].data('value'));
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
    if (a === 'X') {
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




function potentialWin(one, two, three) {

    var leftWin = [one, two];
    var rightWin = [two, three];
    var centerWin = [one, three];
    var all = [leftWin, rightWin, centerWin];
    for (i = 0; i < 3; i++) {
        if (returnIfSame(all[i])) {
            all[i] = returnIfSame(all[i]);
        }
    }

    return all

}

function returnIfSame(array) {
    if (array[0].data('value') === array[1].data('value') && array[1].data('value') !== '') {
        return array
    } else {
        return false
    }
}

function potentialHor() {
    return [potentialWin(grid[1][1], grid[1][2], grid[1][3]),
        potentialWin(grid[2][1], grid[2][2], grid[2][3]),
        potentialWin(grid[3][1], grid[3][2], grid[3][3])]
}

// using Firebase

var winnerHtml;

var xImg = "<img id='o' src='skull.png' width='100%' height='100%'>";
var oImg = "<img id='o' src='XSkullFrame.png' width='100%' height='100%'>";


// Get the number of rounds that have been played in this session

var roundIterator;
var leaderboard;
var xWins;
var oWins;

firebaseRef.once('value', function (snapshot) {
    xWins = snapshot.val().wins.xWins;
    oWins = snapshot.val().wins.oWins;
});

firebaseRef.on("value", function(snapshot) {
        roundIterator = snapshot.val().leaderboard.length;
        leaderboard = snapshot.val().leaderboard;
        getLeaderBoard();
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});





function setStorage(winner) {
    leaderboard.push(winner);

    // Display the winner at the top of the page

    if (leaderboard[leaderboard.length - 1] === "X"){
        winnerHtml = xImg;
        ++xWins;
        xWins = xWins;
        console.log(xWins);
        appendWinner();
    } else {
        winnerHtml = oImg;
        ++oWins;
        oWins = oWins;
        console.log(oWins);
        appendWinner();
    }

    updateStorage();

    // Update the Leaderboard

    getLeaderBoard();
}

function updateStorage() {
    scoreRef.set(leaderboard);
    winsRef.set({
        "xWins": xWins,
        "oWins": oWins
    })
}



function getLeaderBoard() {
        console.log(xWins);
        $('#xWins').text(xWins);
        $('#oWins').text(oWins);
}

function appendWinner() {
    $('#round').fadeIn('slow');
    $('#victor').fadeIn('slow');
    $('#leaderboard').append(winnerRow());
    var arr = $('#leaderboard').child();
    $(arr).last().fadeIn('slow');
    $(arr).last().fadeIn('slow')

}


var winnerRow = function() {
    return $("\
        <div style='display: none;'class='container'>\
        <div class='row vertical' align='center'>\
        <div class='col-md-3'>\
        </div>\
        <div class='topsquare col-md-2 text-md-center'>\
        <h3>"
        + roundIterator +
        "<div>\
        </div>\
        </div>\
        <div class='click topsquare hover col-md-2 text-md-center'>\
        <div style='display: inline'>\
        </div>\
        </div>\
        <div class='topsquare col-md-2 text-md-center'>"
        + winnerHtml +
        "<div>\
        </div>\
        </div>\
        <div class='col-md-3'></div>\
        </div>\
        </div>\
    ");
};

var winerRow = function() {
    return $(
        "<div id='r1' class='row vertical' align='center'> \
            <div class='col-md-4'>\
            </div>\
            <div id='1-1' class='square winleft hover col-md-2 text-md-center game' data-value=''>\
            <div style='display: inline'>\
                <h2>"
        + roundIterator +
        "</h2>\
        </div>\
    </div>\
    <div id='1-3' class='square winright hover col-md-2 text-md-center game' data-value=''>"
        + winnerHtml +
        "</div>\
        <div class='col-md-4'>\
        </div>\
    </div>"
    );
};

// using sessionStorage

/*

var winnerHtml;

var xImg = "<img id='o' src='skull.png' width='100%' height='100%'>";
var oImg = "<img id='o' src='XSkullFrame.png' width='100%' height='100%'>";


// Get the number of rounds that have been played in this session

var roundIterator = sessionStorage.length;

// Add winner & round to the session storage

function setStorage(winner) {
    roundIterator++;
    sessionStorage.setItem(roundIterator, winner);

    // Display the winner at the top of the page

    if (sessionStorage.getItem(roundIterator) === "X"){
        winnerHtml = xImg;
        appendWinner();
    } else {
        winnerHtml = oImg;
        appendWinner();
    }

    // Update the Leaderboard

    getLeaderBoard();
}


function getLeaderBoard() {
    var xWins = 0;
    var oWins = 0;
    for (i = 1; i <= sessionStorage.length; i++) {
        if (sessionStorage.getItem(i) === "X") {
            xWins++;
            $('#xWins').text(xWins);
        } else {
            oWins++;
            $('#oWins').text(oWins);
        }
    }

}

function appendWinner() {
    $('#round').fadeIn('slow');
    $('#victor').fadeIn('slow');
    $('#leaderboard').append(winnerRow());
    var arr = $('#leaderboard').child();
    $(arr).last().fadeIn('slow');
    $(arr).last().fadeIn('slow')

}


*/

