
var buttonColours=["red", "blue", "green", "yellow", "purple", "white"];
var gamePattern=[];
var userPattern=[];
var highestLevel=0;
var started= false;
var level=0;
var sequenceCheckCounter=0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      setTimeout(nextSequence,200);
      started = true;
    } 
});


$('.btn').click(function () { 

    var userChosenColour=$(this).attr('id');
    animatePress(userChosenColour);
    playSound(userChosenColour);
    
    if(started){

        userPattern.push(userChosenColour);
        
        checkAnswer(userPattern.length-1);
        
    }
})


function startOver() {

    gamePattern=[];
    level=0;
    started=false;
    sequenceCheckCounter=0;

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function playSound(name){
    buttonSound=new Audio('./sounds/'+name+'.mp3');
    buttonSound.play();
}

function checkAnswer(counter){
    if(gamePattern[counter] === userPattern[counter]){
        if (userPattern.length === gamePattern.length){
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $(document.body).addClass('game-over');
        setTimeout(function(){$(document.body).removeClass('game-over')},200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        if(level>highestLevel){
            highestLevel=level;
            $("#level-record").text("Your Highest Level : " + highestLevel);
        }
        startOver();
    }
}

function nextSequence(){

    userPattern=[];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random() * 6);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}


