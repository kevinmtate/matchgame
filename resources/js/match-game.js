var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
	MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
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

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

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


	$('.card').click(function() {
		MatchGame.flipCard($(this), $game);
	});
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

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
		} else {
			$game.data('flippedCards').forEach(function(card) {
				setTimeout(function() {
					card.css("background-color", "rgb(32, 64, 86");
					card.empty();
					card.data('flipped', false);
				}, 1000);
			});
		}
		$game.data('flippedCards', []);
	}
};