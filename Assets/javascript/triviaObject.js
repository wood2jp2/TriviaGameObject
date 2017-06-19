$(window).ready(function() {
	var timerRunning = false;
	var	intervalId;
	var timeoutId;
	var	timeoutInteger;
	var gameClock;
		userScore = 0;
		incorrectGuesses = 0;
		questionArray = ["Which character is based off the real-life personality of Seinfeld producer, Larry David?",
		"All four main characters played in the show are followers of which faith?", 
		"Which character, who also lives in Jerry's building, is Jerry's nemesis?",
		"Jerry infamously fights with Newman over which sweet snack?", 
		"Which famous Breaking Bad actor played Jerry's dentist in Seinfeld?", 
		"Curb Your Enthusiasm takes place in which U.S. city?",
		"In Curb, Larry accidentally switches his wine with Susan and Jeff's child's drink. Which drink causes the mix-up?", 
		"Larry is asked to wear which women's article of clothing, to prove to Susan that Jeff isn't cheating on her?",
		"Which sacred animal attacks Larry on a golf course, resulting in Larry's expulsion from the country club?", 
		"Larry has a run-in with which fictional rapper?"];
		correctAnswerArray = ["George", "Judaism", "Newman", "Drake's Coffee Cake", "Bryan Cranston", "Los Angeles", "Grape Juice", "Women's underwear", "black swan", "Krayzee Eyez Killa"];
		option2Array = ["Jerry", "Islam", "Kramer", "Ho-Hos", "Bob Odenkirk", "San Francisco", "Apple Juice", "a bra", "gopher", "Young Masta"];
		option3Array = ["Kramer", "Christianity", "The Landlord", "Snickers Bar", "Aaron Paul", "Chicago", "Ginger Ale", "A blouse", "golden retriever", "Lil Glock"];
		option4Array = ["Newman", "Hinduism", "Bizarro Jerry", "Jelly Doughnuts", "Vince Gilligan", "New York City", "Grape Soda", "Heels", "flamingo", "Soda Poppa"];
	var i = 0;

	var triviaGame = {
		timeConverter: function(t) {

		    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
		    var minutes = Math.floor(t / 60);
		    var seconds = t - (minutes * 60);

		    if (seconds < 10) {
		      seconds = "0" + seconds;
		    }

		    if (minutes === 0) {
		      minutes = "00";
		    }

		    else if (minutes < 10) {
		      minutes = "0" + minutes;
		    }

		    return minutes + ":" + seconds;
		},

		startGame: function() {
			triviaGame.setClickHandler();
		},

		setClickHandler: function () {
			$("#start").on('click', function() {
				$('#start').css("display", "none");
				$('#directions').css("display", "none");
				triviaGame.startInterval();
			});
		},

		startInterval: function () {
			gameClock=15;
			timerRunning = true;
			var intervalId = setInterval(function() {
				gameClock-=1;
				$('#timerDisplay').text(triviaGame.timeConverter(gameClock));
				if (gameClock<=0) {
					timerRunning = false;
					incorrectGuesses++;
					clearInterval(intervalId);
					gameClock = 90;
					alert("You ran out of time!");
					console.log("Incorrect guesses: " + incorrectGuesses);
					i++;
					triviaGame.startInterval();
				};
			}, 1000);
			triviaGame.questionArrayLoop();
			triviaGame.answerSelected();
			},

		questionArrayLoop: function() {
			if (i<questionArray.length) {
				$('#question').text(questionArray[i]);
				$('#option1').text(correctAnswerArray[i]);
				$('#option2').text(option2Array[i]);
				$('#option3').text(option3Array[i]);
				$('#option4').text(option4Array[i]);
				console.log("The value of i is: " + i);
			} else {
				timerRunning=false;
				console.log("Game over");
				clearInterval(this.intervalId);
				$('#timer').css("display", "none");
				$('#allOptions').css("display", "none");
				$('#question').css("display", "none");
				$('.option').css("display", "none");
				$('#gameDone').css("display", "initial");
				$('#correctCount').text(userScore);
				$('#incorrectCount').text(incorrectGuesses);
				$('#resetGame').css("display", 'initial');
				triviaGame.restartGame();
			};
			
		},

		answerSelected: function() {
			$('.correct').on('click', function () {
				timerRunning = false;
				userScore++;
				console.log("User score is: " + userScore);
				$('#allOptions').css("display", "none");
				$('#correctDiv').css("display", "initial")
				function timeoutId() {
					$('#correctDiv').css("display", "none");
					$('#allOptions').css("display", "initial");
				};
				var timeoutInteger = setTimeout(timeoutId, 3000);
				i++;
				gameClock = 18;
				triviaGame.questionArrayLoop();
			});

			$('.incorrect').on('click', function() {
				timerRunning = false;
				incorrectGuesses++;
				console.log("Incorrect guesses are: " + incorrectGuesses);
				$('#correctAnswer').text(correctAnswerArray[i]);
				$('#allOptions').css("display", "none");
				$('#incorrectDiv').css("display", "initial");
				function timeoutId() {
					$('#incorrectDiv').css("display", "none");
					$('#allOptions').css("display", "initial");
				};
				var timeoutInteger = setTimeout(timeoutId, 3000);
				i++;
				gameClock = 18;
				triviaGame.questionArrayLoop();
			});
		},

		restartGame: function() {
			$('#resetGame').on('click', function() {
				gameClock = 15;
				timerRunning = true;
				userScore = 0;
				incorrectGuesses = 0;
				i=0;
				$('#resetGame').css("display", "none");
				$('#correctCount').css("display", "none");
				$('#incorrectCount').css("display", "none");
				$('#gameDone').css("display", "none");
				$('#timer').css("display", "initial");
				$('#question').css("display", "initial");
				$('#option1').css("display", "initial");
				$('#option2').css("display", "initial");
				$('#option3').css("display", "initial");
				$('#option4').css("display", "initial");
				// triviaGame.answerSelected();
				// triviaGame.questionArrayLoop();
			})
		}
	};
triviaGame.startGame();
});