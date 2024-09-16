const allMoles = document.querySelectorAll(".mole_obj");
const pointText = document.getElementById("score");
const timerText = document.getElementById("timer");
const playBttn = document.getElementById("start");
const bannerBg = document.getElementById("wave_banner");
const bannerText = document.getElementById("banner_text");
const highScoreText = document.getElementById("high_score");

let highScore = null;

if (localStorage.getItem("storedHighScore") == null){
    highScore = {
        score: 0,
    }
    localStorage.setItem("storedHighScore", JSON.stringify(highScore));
}
else{
    highScore = JSON.parse(localStorage.getItem("storedHighScore"));
    setScoreTexts();
}

const TOTALGAMETIME = 60;
let gameTimer = TOTALGAMETIME;
timerText.innerText = `${gameTimer} sec`


let difficulty = 1;
let waitTime = 2000


let playing;
let currentScore = 0;

let waveCounting = false;
//Always have 4 rounds
const WAVEWAIT = Math.ceil(gameTimer/4);
let waveTime = WAVEWAIT;
let waveTimer;
let activeMoles = [];

/**
 * Blinking display mechanism
 */

function spawnMoles(){
    let chosen = [];
        for (let i = 0; i < difficulty; i++){
            let check = Math.round(Math.random() * (allMoles.length - 1));
            while (chosen.includes(check)){
                check = Math.round(Math.random() * (allMoles.length - 1));
            }
            chosen.push(check);
        }
        

        activeMoles = [];

        chosen.forEach( i => {
            allMoles[i].classList.remove("deactive");
            allMoles[i].classList.add("active");

            
            activeMoles[i] = setTimeout(function(index) {
                allMoles[index].classList.add("deactive");
                allMoles[index].classList.remove("active");
            }, waitTime, i);
            
            }
        )
}

function playRounds(){
    spawnMoles();
    playing = setInterval(spawnMoles, (difficulty+1)*waitTime);
}

function playWave(diffInc){
    if (!playing){
        playRounds();
    }
    if (!waveCounting){
        waveCounting = true;
        waveTimer = setInterval(function () {decWaveTimer(diffInc)}, 1000);
    }

}


function decWaveTimer(diffInc){   
    waveTime --;
    decGameTime()
    if (waveTime == 0){
        difficulty = difficulty + diffInc;
        waveTime = WAVEWAIT;
        waveCounting = false;
        clearInterval(waveTimer);
        if (gameTimer != 0){
            playWave(diffInc + 1);
        }
    }
    
}



function playGame(){
    
    playBttn.disabled = true;
     // Sets up the stage
    allMoles.forEach(mole =>{
        mole.addEventListener("click", incScore
        );
        mole.classList.remove("acitve");
        mole.classList.add("deactive");
    })
   
    playWave(1);

}

function decGameTime(){
    gameTimer --;
    setTimerText()
    if (gameTimer <= 0){
        clearInterval(playing);
        
        if (activeMoles.length > 0){
            activeMoles.forEach( timeOut => 
                clearTimeout(timeOut)
            );
        }
        allMoles.forEach(mole => {
            mole.classList.remove("deactive");
            mole.classList.add("active");
            mole.removeEventListener("click", incScore);
        })
        if (currentScore > highScore.score){
            highScore.score = currentScore;
            localStorage.setItem("storedHighScore", JSON.stringify(highScore));
            timerText.innerText = "NEW HIGHSCORE \n GAME DONE!";
            setScoreTexts();
        }
        else{
            timerText.innerText = `GAME DONE!`;
        }

        playBttn.disabled = false;
        playBttn.innerText = "Play again?";
        playBttn.removeAttribute("onclick");
        playBttn.setAttribute("onclick", "restart()");
    }
}



function refresh(){
    location.reload();
}

function restart(){
    clearInterval(waveTimer);
    playBttn.innerHTML = "Play Game";
    playing = null;
    waveCounting = false;
    waveTimer = null;
    currentScore = 0;
    waitTime = 2000;
    difficulty = 1;
    gameTimer = TOTALGAMETIME;
    setTimerText();
    playBttn.removeAttribute("onclick");
    playBttn.setAttribute("onclick", "playGame()");

    playGame();
    
}


function setScoreTexts(){
    highScoreText.innerText = `High Score: ${highScore.score}`;
}


function setTimerText(){
    timerText.innerText = `${gameTimer} sec`;
}

function incScore(event){
        currentScore++;
        pointText.innerText = `Score:${currentScore}`;
        const index = Array.prototype.indexOf.call(allMoles, event.currentTarget);
        event.currentTarget.classList.remove("active");
        event.currentTarget.classList.add("dead");
        event.currentTarget.classList.add("deactive");
        setTimeout(function(obj) {
            obj.classList.remove("dead");},400, allMoles[index]);
        clearTimeout(activeMoles[index]);
}