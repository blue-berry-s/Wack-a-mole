const allMoles = document.querySelectorAll(".mole_obj");
const pointText = document.getElementById("score");
let difficulty = 1;
let waitTime = 2000;

let playing;
let activeMoles;

let currentScore = 0;


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
                console.log(index);
                allMoles[index].classList.add("deactive");
                allMoles[index].classList.remove("active");
            }, waitTime, i);
            
            }
        )
}

function playRounds(){
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

    if (!playing){
        playing = setInterval(spawnMoles, (difficulty+1)*waitTime);
    }
    
}
