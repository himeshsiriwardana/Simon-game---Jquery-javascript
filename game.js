//alert("hello")

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var clicks = 0;

function nextSequence(){
	let buttonColors = ["red","blue","green","yellow"];
	let randomNumber = Math.round(Math.random() * 3);
	let randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
}



function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor){
	$("#" + currentColor).addClass("pressed");
	setTimeout(function(){$("#" + currentColor).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel){
	console.log("user= " + userClickedPattern);
	console.log("computer= " + gamePattern);

	if(gamePattern[currentLevel-1] == userClickedPattern[currentLevel-1]){
		userClickedPattern.length = 0;
		setTimeout(function(){
			level+=1;
			$("#level-title").text("level " + level);
			nextSequence(); 
			clicks = 0; 
		}, 1000);
		
	}

	else if(gamePattern[clicks] == userClickedPattern[clicks]){
		clicks += 1;
	}


	else {
		reset();

	}
}
	

	function reset(){
		gamePattern.length = 0;
		userClickedPattern.length = 0;
		level = 0;
		playSound("wrong");
		$("body").addClass("game-over");
		$("h1").text("Game Over, Press Any Key to Restart ");
	}

$(document).keypress(function(){
	if(level==0){
		$("body").removeClass("game-over");
		$("#level-title").text("level " + (level+1));
		nextSequence();
		level+=1;
	}

}
);


$(".btn").click(function(){
	if(level!=0){
		animatePress($(this).attr("id"));
		let userChosenColor = $(this).attr("id");
		playSound(userChosenColor);
		userClickedPattern.push(userChosenColor);
		checkAnswer(level);
	}
	
});



