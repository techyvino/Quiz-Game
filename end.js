const userName = document.getElementById('userName');
const saveScore = document.getElementById('saveScore');
const finalScore = document.getElementById('finalScore');
const mostRecentScore =localStorage.getItem("mostRecentScore");
const MAX_HIGH_SCORES = 5;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores); 

finalScore.innerText= mostRecentScore;

userName.addEventListener("keyup",() =>{
    saveScore.disabled = !userName.value;
    console.log(userName.value);
});

saveHighScores = (e) =>{
    const score ={
        score : mostRecentScore,
        name : userName.value
    };
    
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("Start.html")

    console.log(highScores);
};

