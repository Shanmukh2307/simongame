
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level=0;
var started=false;

var myScore=0;
var highScore = 0;

$(".btn").click(function(){
      var userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);

      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
    }
})

$("button").click(function(){
    animatePress("start");
    if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
    }
})


function nextSequence()
{
    userClickedPattern=[];
   
    level++;
    scoreCounter(level);
    $("#level-title").text("Level "+level);
    

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);  
    playSound(randomChosenColour);
}


function scoreCounter(currentLevel){
    myScore=5+Math.pow((currentLevel-1)*2,2);
    $("#my").text(myScore);
    
    if (myScore > highScore) {
        highScore = myScore;
        $("#high").text(highScore);
    }
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                
                nextSequence();  
            },1000)
        }
    }
    else{
         playSound("wrong");
         $("body").addClass("game-over");
         $("#level-title").text("Game Over, Press Any Key to Restart");
         setTimeout(function(){
            $("body").removeClass("game-over");
         },200);
         startOver();
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    var delayInMilliseconds = 100; //1 second

    setTimeout(function() {
         $("#"+currentColour).removeClass("pressed");
    }, delayInMilliseconds);
}

function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    myScore=0;
    $("#my").text(myScore);
}

