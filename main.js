

//settings
let currentGen = 1;
let currentInput = "Name";
let soundEnabled = false;
let currentPoke = Math.floor(Math.random()*251)+1;
var currentPokeName = "text";
let score = 0;
let player = "no name";



//wrong answer intialisation
let wrong1= Math.floor(Math.random()*251)+1;
let wrong2= Math.floor(Math.random()*251)+1;
let wrong3= Math.floor(Math.random()*251)+1;

//intial method calls
fetchAndDisplay();
multichoiceGeneration();
generateRandom();
getPokeName();


//reset button
document.getElementById('reset').addEventListener('click', function(ev){
reset();
lost();
});

//reset function
function reset(){
    currentPoke = Math.floor(Math.random()*251)+1;
resetImage();
grayscale();
fetchAndDisplay();
multichoiceGeneration();
generateRandom();
getPokeName();
document.getElementById('feedback_label').textContent = "Take a guess!";

}

//getpokemon name for guess mon
async function getPokeName(){
    let f = await fetch('names.json')
    let t = await f.json()

    for (let poke of t.names) {
        let num = poke.Number;
        let name = poke.Name;

        if(num==currentPoke){
            currentPokeName = name;

            //cheat for developing
            // document.getElementById('pokeNum').textContent = currentPoke + currentPokeName;
        }
       
    }

}

//cheat for developing
// document.getElementById('pokeNum').textContent = currentPoke + currentPokeName;


//button feedback
let buttonfeedback = 'button selected';

document.getElementById('option1').addEventListener('click', multichoiceSelection);

  document.getElementById('option2').addEventListener('click', multichoiceSelection);

  document.getElementById('option3').addEventListener('click', multichoiceSelection);

  document.getElementById('option4').addEventListener('click', multichoiceSelection);

  function multichoiceSelection(ev){
    
    pokeGuess =  ev.target.value;

    if(pokeGuess==currentPokeName){
        document.getElementById('feedback_label').textContent = "Correct!";
        original();
        setTimeout(() => {  reset();
            addScore();
        }, 1000);
    }
    else{
        document.getElementById('feedback_label').textContent = "Incorrect";
        lost();
    }
  }

  
  //function for getting right answer
function addScore(){
score ++;
document.getElementById('current_score').textContent = "Current Score: " + score;

}

//function for reseting or getting wrong answer
function lost(){
    addToScoreBoard();

}

//function for updating json file and highscore board
async function addToScoreBoard(){
    let f = await fetch('stats.json')
    let t = await f.json()

    let new_score = {"name": player, "score": score };

    t.streaks.push(new_score);

    t.streaks.sort(function(a,b){
        
        if(a.score == b.score)
            return 0;
        if(a.score > b.score)
            return -1;
        if(a.score < b.score)
            return 1;
    });
//add to send json file through to php side

var str_json = JSON.stringify(t);

request= new XMLHttpRequest()
request.open("POST", "index.php", true)
request.setRequestHeader("Content-type", "application/json")
request.send(str_json)

document.getElementById('highscore').innerHTML = '';
let highscore_list = document.getElementById('highscore');

let count = 1;
for(let player of t.streaks){
    if(count <=10){
        let li = document.createElement('li');
        li.textContent = player.name + ", Score: " + player.score;

        highscore_list.append(li);

        count++;
    }
}
if(count<10){
    for(let i = count; i <=10; i++){
        let li = document.createElement('li');
        li.textContent = " ";
        highscore_list.append(li);
    }
}

    console.log(t.streaks);
score = 0;
document.getElementById('current_score').textContent = "Current Score: " + score;

}

//setting player name for highscore board submision
document.getElementById('player_submit').addEventListener('click', function(){
    let name = document.getElementById('player_input').value;
    if(name!=null){
        player = name;
        document.getElementById('play_name').textContent = "Player Name: " + name;
    }
    

});


//generate multichoice
async function multichoiceGeneration(){
    let f = await fetch('names.json')
    let t = await f.json()

    //cheat for developing
//   document.getElementById('wrongoption1').textContent = wrong1;
//   document.getElementById('wrongoption2').textContent = wrong2;
//   document.getElementById('wrongoption3').textContent = wrong3;

  let first = false;
  let second = false;
  let third = false;
  let fourth = false;

  for (let poke of t.names) {
    let num = poke.Number;
    let name = poke.Name;

  if(num==currentPoke){
    let rand = Math.floor(Math.random()*4)+1;
    document.getElementById('option' + rand).value = name;
    if(rand==1) first = true;
    else if(rand==2) second = true;
    else if(rand==3) third = true;
    else if(rand==4) fourth = true;
}}

    for (let poke of t.names) {
        let num = poke.Number;
        let name = poke.Name;

        if(num==wrong1){
            if(!first){ document.getElementById('option1').value = name;
        first = true; }
            else if(!second) {document.getElementById('option2').value = name;
        second = true;}
            else if(!third) {document.getElementById('option3').value = name;
            third = true;}
            else if(!fourth) {document.getElementById('option4').value = name;
            fourth = true;}
        }
        else if(num==wrong2){
            if(!first){ document.getElementById('option1').value = name;
        first = true; }
            else if(!second) {document.getElementById('option2').value = name;
        second = true;}
            else if(!third) {document.getElementById('option3').value = name;
            third = true;}
            else if(!fourth) {document.getElementById('option4').value = name;
            fourth = true;}
        }
        else if(num==wrong3){
            if(!first){ document.getElementById('option1').value = name;
            first = true; }
                else if(!second) {document.getElementById('option2').value = name;
            second = true;}
                else if(!third) {document.getElementById('option3').value = name;
                third = true;}
                else if(!fourth) {document.getElementById('option4').value = name;
                fourth = true;}
        }
        
    }

    
}

//generating random guesses that aren't the same and also aren't
//the same as the pokemon to guess
function generateRandom(){
    wrong1 = Math.floor(Math.random()*251)+1;
    wrong2 = Math.floor(Math.random()*251)+1;
    wrong3 = Math.floor(Math.random()*251)+1;
    if(wrong1 == wrong2 || wrong2 == wrong3 || wrong3 == wrong1){
        generateRandom(wrong1, wrong2, wrong3);
    }
    if(wrong1 == currentPoke || wrong2 == currentPoke || wrong3 == currentPoke){
        generateRandom(wrong1, wrong2, wrong3);
    }
}

//handle pokemon name from json file

async function fetchAndDisplay() {

    let f = await fetch('names.json')
    let t = await f.json()

    let fc = document.getElementById('pokeName')

    for (let poke of t.names) {
        let num = poke.Number;
        let name = poke.Name;

        if(num==currentPoke){
            // document.getElementById('pokeName').textContent = name;
        }
       
    }

}


//code to handle the pokemon image and audio

//initialisation of image and audio objects
var img = new Image();
img.crossOrigin = 'anonymous';

let string = "./front/" + currentPoke + ".png";

img.src = string;

var canvas = document.getElementById('canvas');

let audio = document.getElementById('cry')

audio.src = "audio/" + currentPoke + ".ogg"

var ctx = canvas.getContext('2d');

//function to reset image, also resets audio
//got code https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
function resetImage(){
clearCanvas();
    
let string = "./front/" + currentPoke + ".png";

img.src = string;

canvas = document.getElementById('canvas');


ctx = canvas.getContext('2d');

let audio = document.getElementById('cry')

audio.src = "audio/" + currentPoke + ".ogg"

if(soundEnabled){
document.getElementById('cry').play();
}
}

//clear previous image
function clearCanvas (){
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//image onload function
img.onload = function() {
    // ctx.drawImage(img, 0, 0);
    grayscale();
    
};

//draws color image
var original = function() {
    ctx.drawImage(img, 0, 0);
};
//creates greyscale image
var grayscale = function() {
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        if(data[i]==255 && data[i +1]==255 && data[i +2]==255){
        }
        else{
            data[i]     = 0; // red
        data[i + 1] = 0; // green
        data[i + 2] = 0; // blue
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
};

//listner for speaker button
document.getElementById('speaker').addEventListener('click', function(ev){
if(soundEnabled){
soundEnabled = false;
document.getElementById('speaker_img').src = "speaker off.png";
}
else{
soundEnabled = true;
document.getElementById('speaker_img').src = "speaker.png";
}
});

//listner for play button
document.getElementById('play').addEventListener('click', function(ev){
    if(soundEnabled){
        document.getElementById('cry').play();
        }
});