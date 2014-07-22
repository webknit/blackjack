/* - BASE HTML TEMPLATE
------------------------------------------------- 
	Description: JS Scripts
	Author:Shane Prendergast
	Author URL:http://www.webknit.co.uk
	Template URL:http://base.webknit.co.uk/
*/

// JS EXAMPLE

var Webknit = Webknit || {};

Webknit.Blackjack = function() {

	// Cards
	var cardsHeart = ["Ace Heart", "2 Heart","3 Heart", "4 Heart", "5 Heart", "6 Heart", "4 Heart", "5 Heart", "6 Hearts", "7 Heart", "8 Heart", "9 Hearts", "10 Heart", "Jack Heart", "Queen Hearts", "King Heart"];
	var cardsDiamond = ["Ace Diamond", "2 Diamond","3 Diamond", "4 Diamond", "5 Diamond", "6 Diamond", "4 Diamond", "5 Diamond", "6 Diamond", "7 Diamond", "8 Diamond", "9 Diamond", "10 Diamond", "Jack Diamond", "Queen Diamond", "King Diamond"];
	var cardsSpade = ["Ace Spade", "2 Spade","3 Spade", "4 Spade", "5 Spade", "6 Spade", "4 Spade", "5 Spade", "6 Spade", "7 Spade", "8 Spade", "9 Spade", "10 Spade", "Jack Spade", "Queen Spade", "King Spade"];
	var cardsClub = ["Ace Club", "2 Club","3 Club", "4 Club", "5 Club", "6 Club", "4 Club", "5 Club", "6 Club", "7 Club", "8 Club", "9 Club", "10 Club", "Jack Club", "Queen Club", "King Club"]; 

	var packCards = cardsHeart.concat(cardsDiamond,cardsSpade,cardsClub);

	//var cardsShuffled = shuffleArray(packCards);
	var cardsShuffled = packCards;

	// Buttons, variables
	var balance = $('#balance');
	var balanceAmount = 1000;
	var amountBox = $('.amount-box');
	var amount = $('.amount');
	var amountStaked = 0;
	var gameCommentry = $('.game-commentry');

	// Cards
	var cards = $('.cards');
	var playerCards = $('.player-cards');
	var dealerCards = $('.dealer-cards');
	var playerCardsUL = $('.player-cards__ul');
	var dealerCardsUL = $('.dealer-cards__ul');
	var scoresBox = $('.scores-box');
	var yourScore = $('#your-score');
	var dealerScore = $('#dealer-score');
	var yourScoreValue = 0;
	var dealerScoreValue = 0;
	var cardValue = 0;
	var gotAnAce = false;
	var stopDealing = 9999999;
	var playersTurn = true;
	var yourScoreValueAce = 0;

	// Deal box
	var dealBox = $('.deal-box');
	var dealBtn = $('.dealBtn');
	var standBtn = $('.standBtn');

	function init() {

		console.log(cardsShuffled);

		// Load the balance up
		balance.html(balanceAmount);

		amount.click(letsPlay);

		standBtn.click(standPlayAction);

		dealBtn.click(dealPlayAction);

	}
	
	function checkMoney() {
	
		if (balanceAmount < 501) {
			
			$('.fivehundred-button').hide();
			
		}
		
		if (balanceAmount < 101) {
			
			$('.onehundred-button').hide();
			
		}
		
		if (balanceAmount < 11) {
			
			$('.ten-button').hide();
			
		}
		
		if (balanceAmount < 1) {
			
			$('.one-button').hide();
			gameCommentry.empty().html('Youve no money left.');
			
		}
	
	}

	function updateScoreValues() {

		yourScore.html(yourScoreValue);
		dealerScore.html(dealerScoreValue);

	}

	function checkScores() {

		if (yourScoreValue > 21) {

			stopDealing = 0;

			gameCommentry.empty().html('Youre bust. You lost £' + amountStaked);

			dealBox.hide();
			amountBox.show();
			
			checkMoney();

		}

		if (dealerScoreValue > 21) {

			stopDealing = 0;

			gameCommentry.empty().html('Dealer bust. You won £' + amountStaked);
			var multiply = amountStaked * 2;
			balanceAmount = balanceAmount + multiply;

			// Add new balance
			balance.html(balanceAmount);

			dealBox.hide();
			amountBox.show();

		}

		if (dealerScoreValue > 16 && dealerScoreValue < 22) {

			stopDealing = 0;

			if (yourScoreValue > dealerScoreValue) {

				var multiply = amountStaked * 2;
				balanceAmount = balanceAmount + multiply;

				// Add new balance
				balance.html(balanceAmount);

				gameCommentry.empty().html('Dealer Lost. You won £' + amountStaked);

			}

			else {

				gameCommentry.empty().html('Dealer Won. You lost £' + amountStaked);
				
				checkMoney();

			}		

			dealBox.hide();
			amountBox.show();

		}

		updateScoreValues();	

	}

	function standPlayAction () {

		$(".dealer-cards__ul li:nth-child(2)").show();

		for (var i = 0; i < stopDealing; i++) {

			// This pushes to the dealers pile.
			// Take the first card and output it
			dealerCardsUL.append('<li>'+ cardsShuffled[0] + '</li>');

			// Take this to external function to determine the score
			cardScore(cardsShuffled[0]);

			dealerScoreValue = dealerScoreValue + cardValue;

			updateScoreValues();

			checkScores();

		}

	}

	function dealPlayAction () {

		for (var i = 0; i < 1; i++) {

			// Take the first card and output it
			playerCardsUL.append('<li>'+ cardsShuffled[0] + '</li>');

			// Take this to external function to determine the score
			cardScore(cardsShuffled[0]);

			yourScoreValue = yourScoreValue + cardValue;

			updateScoreValues();

			checkScores();

		}

	}

	function cardScore(cardDrawn) {

		// Remove the first number
		var cardDrawnFirst = cardDrawn.split(' ')[0];

		console.log("cardDrawn is " + cardDrawnFirst);

		if(isNaN(cardDrawnFirst)) {

			console.log("not a number");

			if(cardDrawnFirst == "Ace") {

				console.log("its an ace");

				// Card value
				cardValue = 1;

				// Switch to true with ace in pile
				gotAnAce = true;

			}

			if(cardDrawnFirst == "Jack" || cardDrawnFirst == "Queen" || cardDrawnFirst == "King") {

				console.log("its an 10");

				cardValue = 10;

			}

		}

		else {

			console.log("is a number");

			cardValue = parseInt(cardDrawnFirst);

			console.log("cardValue is number " +  cardValue);
			
		}

		// Remove the card from the pack
		packCards.splice(0, 1);

		console.log(cardValue);

	}

	// Array shuffler
	function shuffleArray(o) {

		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;

	};

	function letsPlay() {

		cards.show();

		amountBox.hide();

		scoresBox.show();

		gameCommentry.empty();
		
		// Find out how much has been staked
		amountStaked = $(this).data("amount");

		// Take off what's being staked
		balanceAmount = balanceAmount - amountStaked

		// Add new balance
		balance.html(balanceAmount);

		playerCardsUL.empty();
		dealerCardsUL.empty();

		// reset the card scores
		yourScoreValue = 0;
		dealerScoreValue = 0;

		// Add the reset card scores
		updateScoreValues();

		firstVal = false;
		
		stopDealing = 999999;

		for (var i=0; i<2; i++) {

			// Take the first card and output it
			playerCardsUL.append('<li>'+ cardsShuffled[0] + '</li>');

			// Take this to external function to determine the score
			cardScore(cardsShuffled[0]);

			yourScoreValue = yourScoreValue + cardValue;
			
			yourScore.html(yourScoreValue);

			// This pushes to the dealers pile.
			// Take the first card and output it
			dealerCardsUL.append('<li>'+ cardsShuffled[0] + '</li>');

			// Take this to external function to determine the score
			cardScore(cardsShuffled[0]);

			dealerScoreValue = dealerScoreValue + cardValue;

			console.log("firstVal is " + firstVal);

			if (firstVal == false) {
				dealerScore.html(dealerScoreValue);
				firstVal = true;
			}
			
			if (playersTurn == false && gotAnAce == true) {
			
				alert('Dealer has an ace');
			
			}
			
			gotAnAce = false;

		}

		dealBox.show();

	}

	init();

};

// ON DOC READY
$(function() {	

	new Webknit.Blackjack();
	
});

