const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressFull = document.getElementById('progressFull');
const game = document.getElementById('game');
const loader = document.getElementById('loader');


let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];
fetch(
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
).then(res => {
  return res.json();
})
.then(loadedQuestions => {
  questions = loadedQuestions.results.map(loadedQuestion => {
    const formattedQuestion = {
      question : loadedQuestion.question
    };

    const answerChoices =[...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random()*3) +1;
    answerChoices.splice(
      formattedQuestion.answer -1,
      0,
      loadedQuestion.correct_answer);

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index +1)] = choice;
      })
      return formattedQuestion;
  });
  game.classList.remove("hidden");
  loader.classList.add("hidden");

  
  startGame();
})

const CurrectBonus = 10;
const MaxQuestions = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    stratNewQuestion();
};
 
stratNewQuestion = () =>{
    
    if (availableQuestion.length == 0 || questionCounter >= MaxQuestions)
    {
        localStorage.setItem("mostRecentScore",score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = 'Questions ' + questionCounter + "/" + MaxQuestions;

    progressFull.style.width = (questionCounter / MaxQuestions)*100 +"%";

    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion['choice' + number]; 
    });
   
    availableQuestion.splice(questionIndex,1);
    acceptingAnswer = true; 
}

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswer) return;
        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        //Ternary Operator
        const classApply = selectedAnswer == currentQuestion.answer? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(classApply);

        if (classApply == "correct") {
          incrementScore(CurrectBonus)
        }

        setTimeout( () => {
          selectedChoice.parentElement.classList.remove(classApply);
          stratNewQuestion();
        },1000);
       
    });
    incrementScore = num => {
      score += num; 
      scoreText.innerText = score;
    }
});