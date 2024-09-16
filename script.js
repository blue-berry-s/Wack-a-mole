const allMoles = document.querySelectorAll(".mole_obj");
const pointText = document.getElementById("score");
const timerText = document.getElementById("timer");
const playBttn = document.getElementById("start");
const bannerBg = document.getElementById("wave_banner");
const bannerText = document.getElementById("banner_text");


let gameTimer = 60;
timerText.innerText = `${gameTimer} sec`


let difficulty = 1;
let waitTime = 2000


let playing;
let currentScore = 0;

let waveCounting = false;
const WAVEWAIT = 20;
let waveTime = WAVEWAIT;
let waveTimer;



/**
 * Blinking display mechanism
 */

function spawnMoles(){
    let chosen = [];
        for (let i = 0; i < difficulty; i++){
            let check = Math.round(Math.random() * (allMoles.length - 1));
            while (chosen.includes(check)){
                check = Math.round(Math.random() * allMoles.length);
            }
            chosen.push(check);
        }

        activeMoles = new Object();

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
            console.log("PLAY ANOTHER WAVE: DIFFICULTY: " + difficulty);
            playWave(diffInc + 1);
        }
    }
    
}



function playGame(){
    playBttn.disabled = true;
     // Sets up the stage
     allMoles.forEach(mole =>{
        mole.addEventListener("click", event =>{
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
        );
        mole.classList.remove("acitve");
        mole.classList.add("deactive");
    })

    playWave(1);
    


}

function decGameTime(){
    gameTimer --;
    timerText.innerText = `${gameTimer} sec`;
    if (gameTimer == 0){
        clearInterval(playing);
        timerText.innerText = `GAME DONE!`;
    }

    playBttn.disabled = false;
    playBttn.setAttribute("onclick", );
    

}



function refresh(){
    location.reload();
}

function restart(){
    
}


