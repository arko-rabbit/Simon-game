var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern=[];


var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){

        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;

    }
});

$(".btn").click(function(){

    //new handler to store the id of the button.
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);


    //playing the playsound function to play the user chosen colour

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    
    else{

        playSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game over, press any key to Restart");

        startOver();
    }


}


function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    



    //using JQuery to select button flash
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

//calling the playsound function to play a randomChosen Colour
    playSound(randomChosenColour);
    //checkAnswer(randomChosenColour);   
}




function playSound(name){

    

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

    
    
    
}

function animatePress(currentColour){

    $("#"+ currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    },100);
}



function startOver(){

    level = 0;
    gamePattern = [];
    started = false;

}