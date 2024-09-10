const allMoles = document.querySelectorAll(".mole_obj");
let difficulty = 1;
let waitTime = 1000;

let playing;

/**
 * Blinking display mechanism
 */

function spawnMoles(){
    console.log('a');
    // Sets up the stage
    allMoles.forEach(mole =>{
        mole.classList.remove("acitve");
        mole.classList.add("deactive");
    })

    let chosen = [];
        for (let i = 0; i < difficulty; i++){
            let check = Math.round(Math.random() * (allMoles.length - 1));
            while (chosen.includes(check)){
                check = Math.round(Math.random() * allMoles.length);
            }
            console.log(check);
            chosen.push(check);
        }

        chosen.forEach( i => {
            allMoles[i].classList.remove("deactive");
            allMoles[i].classList.add("active");
            setTimeout(function(index) {
                console.log(index);
                allMoles[index].classList.remove("active");
                allMoles[index].classList.add("deactive");
            }, waitTime, i);
            }
        )
}

function playRounds(){
    if (!playing){
        playing = setInterval(spawnMoles, (difficulty+1)*waitTime);
    }
}


