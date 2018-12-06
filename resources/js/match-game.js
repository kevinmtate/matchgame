var MatchGame = {};
var checkForWin = 0;
const $game = $('#game');
let timer;

MatchGame.eventHandler = function() {
	$('.card').click(function() {
		if ($game.data('flippedCards').length !== 2) {
			MatchGame.flipCard($(this), $game);
		};
	});
};

MatchGame.generateCardValues = function() {
	var initialArray = [];
	for (var i = 1; i < 9; i++) {
		initialArray.push(i);
		initialArray.push(i);
	}
	var randomArray = [];
	while (initialArray.length > 0) {
		var randomIndex = Math.floor(Math.random() * initialArray.length);
		randomArray.push(initialArray[randomIndex]);
		initialArray.splice(randomIndex, 1);
	}
	return randomArray;
};

MatchGame.init = function() {
	MatchGame.renderCards(MatchGame.generateCardValues(), $game);
	$('.timer').data('timer', 0);
	timer = setInterval(function() {
		MatchGame.incrementTimer($('.timer'));
	}, 1000);
};

MatchGame.flipCard = function($card, $game) {
	if ($card.data('flipped')) {
		return;
	} else {
		$card.css({"background-color": $card.data('color')});
		$card.text($card.data('value'));
		$card.data('flipped', true);
		$game.data('flippedCards').push($card);
	}

	if ($game.data('flippedCards').length === 2) {
		if ($game.data('flippedCards')[0].data('value') === $game.data('flippedCards')[1].data('value')) {
			$game.data('flippedCards').forEach(function(card) {
				card.css({"background-color": "rgb(153,153,153)", "color": "rgb(204,204,204)"});
			});
			checkForWin++;
			if (checkForWin === 8) {
				MatchGame.victory();
			}
			$game.data('flippedCards', []); 
		} else {
			$game.data('flippedCards').forEach(function(card) {
				setTimeout(function() {
					card.data('flipped', false);
					card.empty();
					card.css("background-color", "rgb(32, 64, 86");
					$game.data('flippedCards', []);
				}, 1000);
			});
		}
	}
};

MatchGame.victory = function() {
	const $victory = $('.victory');
	clearInterval(timer);
	$('.score').text($('.timer').data('timer') + 's');

	$('.victory-overlay').css('display', 'block');
	$('.victory-wrapper').css('z-index', '1000');
	$victory.css('display', 'block');
	$victory.click(function() {
		location.reload();
	});
};

MatchGame.renderCards = function(cardValues, $game) {
	$game.data('flippedCards', []);
	var flippedColors = [
		'hsl(25, 85%, 65%)', 
		'hsl(55, 85%, 65%)', 
		'hsl(90, 85%, 65%)',
		'hsl(160, 85%, 65%',
		'hsl(220, 85%, 65%',
		'hsl(265, 85%, 65%',
		'hsl(310, 85%, 65%',
		'hsl(360, 85%, 65%'
	];
	$game.empty();
	for (var i = 0; i < cardValues.length; i++) {
		var $card = $('<div class="col-lg-3 card"></div>');
		$card.data('value', cardValues[i]);
		$card.data('flipped', false);
		$card.data('color', flippedColors[cardValues[i]-1]);
		$game.append($card);
	}
};

MatchGame.incrementTimer = function($timer) {
	let currentTime = $timer.data('timer') + 1;
	$timer.text(currentTime + 's');
	$timer.data('timer', currentTime);
};

$(document).ready(function() {
	MatchGame.init();
	MatchGame.eventHandler();
});
