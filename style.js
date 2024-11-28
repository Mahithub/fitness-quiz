const questions = [
    {
        question: "Why is warming up important before a workout?",
        answers: [
            { text: "To burn more calories", correct: false },
            { text: "To reduce the risk of injury and improve performance", correct: true },
            { text: "To save time during the workout", correct: false },
            { text: "To build muscle faster", correct: false }
        ]
    },
    {
        question: "What is a good starting frequency for beginners to exercise?",
        answers: [
            { text: "Once a month", correct: false },
            { text: "7 days a week", correct: false },
            { text: "3-4 days a week", correct: true },
            { text: "Twice a day", correct: false }
        ]
    },
    {
        question: "Which of the following is an example of a compound exercise?",
        answers: [
            { text: "Bicep curls", correct: false },
            { text: "Push-ups", correct: true },
            { text: "Calf raises", correct: false },
            { text: "Side planks", correct: false }
        ]
    },
    {
        question: "What does 'progressive overload' mean in strength training?",
        answers: [
            { text: "Using lighter weights over time", correct: false },
            { text: "Gradually increasing weight, reps, or intensity over time", correct: true },
            { text: "Doing the same workout every session", correct: false },
            { text: "Skipping rest days", correct: false }
        ]
    },
    {
        question: "Why is hydration important during exercise?",
        answers: [
            { text: "It helps maintain energy and prevents dehydration", correct: true },
            { text: "It makes you sweat more", correct: false },
            { text: "It burns calories", correct: false },
            { text: "It replaces electrolytes instantly", correct: false }
        ]
    },
    {
        question: "How long should you rest between sets when strength training as a beginner?",
        answers: [
            { text: "10 seconds", correct: false },
            { text: "30 seconds to 1 minute", correct: true },
            { text: "5 minutes", correct: false },
            { text: "No rest at all", correct: false }
        ]
    },
    {
        question: "Which macronutrient is essential for muscle repair and recovery?",
        answers: [
            { text: "Carbohydrates", correct: false },
            { text: "Protein", correct: true },
            { text: "Fats", correct: false },
            { text: "Vitamins", correct: false }
        ]
    },
    {
        question: "What is the most effective way to lose weight through exercise?",
        answers: [
            { text: "Focusing only on cardio", correct: false },
            { text: "Combining strength training and cardio", correct: true },
            { text: "Skipping meals before workouts", correct: false },
            { text: "Doing long, slow walks only", correct: false }
        ]
    },
    {
        question: "Which type of stretching is best after a workout?",
        answers: [
            { text: "Dynamic stretching", correct: false },
            { text: "Ballistic stretching", correct: false },
            { text: "Static stretching", correct: true },
            { text: "Active stretching", correct: false }
        ]
    },
    {
        question: "What is the recommended minimum duration for physical activity per week for health benefits, according to the WHO?",
        answers: [
            { text: "75 minutes", correct: false },
            { text: "150 minutes of moderate-intensity exercise", correct: true },
            { text: "300 minutes", correct: false },
            { text: "30 minutes", correct: false }
        ]
    },
    {
        question: "Why is it important to include rest days in your fitness routine?",
        answers: [
            { text: "To avoid muscle fatigue and allow recovery", correct: true },
            { text: "To reduce calorie burn", correct: false },
            { text: "To avoid sweating too much", correct: false },
            { text: "To prevent weight loss", correct: false }
        ]
    },
    {
        question: "Which is an example of good post-workout nutrition?",
        answers: [
            { text: "A protein shake with some carbohydrates", correct: true },
            { text: "A bag of chips", correct: false },
            { text: "A glass of water only", correct: false },
            { text: "Black coffee", correct: false }
        ]
    },
    {
        question: "What is a safe way to increase flexibility over time?",
        answers: [
            { text: "Stretching regularly after workouts", correct: true },
            { text: "Bouncing during stretches", correct: false },
            { text: "Holding your breath while stretching", correct: false },
            { text: "Only stretching on rest days", correct: false }
        ]
    },
    {
        question: "What is a common mistake beginners make when starting to work out?",
        answers: [
            { text: "Starting with heavy weights immediately", correct: false },
            { text: "Overtraining without rest", correct: false },
            { text: "Neglecting proper form", correct: false },
            { text: "All of the above", correct: true }
        ]
    }
]; 

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function resetState() {
    nextButton.style.display = "None";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();

