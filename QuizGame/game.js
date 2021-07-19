const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressFull = document.getElementById('progressFull');

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
        {
          "question": "Inside which HTML element do we put the JavaScript??",
          "choice1": "<script>",
          "choice2": "<javascript>",
          "choice3": "<js>",
          "choice4": "<scripting>",
          "answer": 1
        },
        {
          "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
          "choice1": "<script href='xxx.js'>",
          "choice2": "<script name='xxx.js'>",
          "choice3": "<script src='xxx.js'>",
          "choice4": "<script file='xxx.js'>",
          "answer": 3
        },
        {
          "question": " How do you write 'Hello World' in an alert box?",
          "choice1": "msgBox('Hello World');",
          "choice2": "alertBox('Hello World');",
          "choice3": "msg('Hello World');",
          "choice4": "alert('Hello World');",
          "answer": 4
        }
]

const CurrectBonus = 10;
const MaxQuestions = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    stratNewQuestion();
};
 
stratNewQuestion = () =>{
    
    if (availableQuestion == 0 || availableQuestion >= MaxQuestions)
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

startGame()