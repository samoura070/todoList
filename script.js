let questionList = [
    {
        question: "What is the capital of Morocco?",
        answers: [
            { text: "A) Rabat", correct: true },
            { text: "B) Casablanca", correct: false },
            { text: "C) Marrakesh", correct: false },
            { text: "D) Fez", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "A) Venus", correct: false },
            { text: "B) Mars", correct: true },
            { text: "C) Jupiter", correct: false },
            { text: "D) Saturn", correct: false }
        ]
    },
    {
        question: `Who wrote the play "Romeo and Juliet"?`,
        answers: [
            { text: "A) William Shakespeare", correct: true },
            { text: "B) Charles Dickens", correct: false },
            { text: "C) Mark Twain", correct: false },
            { text: "D) George Orwell", correct: false }
        ]
    },
    {
        question: `What is the largest ocean on Earth?`,
        answers: [
            { text: "A) Atlantic Ocean", correct: false },
            { text: "B) Indian Ocean", correct: false },
            { text: "C) Pacific Ocean", correct: true },
            { text: "D) Arctic Ocean", correct: false }
        ]
    }
];

let qs = document.getElementById("qs");
let buttons = document.querySelectorAll(".btn");
let nextBtn = document.querySelector(".next");
let result = 0;
let qsn = 0;

function loadQuestion() {
    // Set question text
    qs.innerHTML = `${qsn + 1}. ${questionList[qsn].question}`;

    // Set button text and reset states
    questionList[qsn].answers.forEach((answer, index) => {
        buttons[index].innerHTML = answer.text;
        buttons[index].classList.remove("correct", "incorrect");
        buttons[index].disabled = false;

        // Attach click event to check answer
        buttons[index].onclick = () => checkAnswer(answer, buttons[index]);
    });

    nextBtn.style.display = "none"; // Hide Next button
}

function checkAnswer(answer, button) {
    // Disable all buttons after selection
    buttons.forEach(btn => (btn.disabled = true));

    // Check if the selected answer is correct
    if (answer.correct) {
        button.classList.add("correct");
        result++;
    } else {
        button.classList.add("incorrect");
        // Highlight the correct answer
        let correctAnswer = questionList[qsn].answers.find(a => a.correct);
        buttons.forEach(btn => {
            if (btn.innerHTML === correctAnswer.text) {
                btn.classList.add("correct");
            }
        });
    }

    nextBtn.style.display = "block"; // Show Next button
}

function handleNextButton() {
    nextBtn.onclick = () => {
        if (qsn < questionList.length - 1) {
            qsn++; // Move to the next question
            loadQuestion();
        } else {
            showScore();
        }
    };
}

function showScore() {
    qs.innerHTML = `Your score is ${result} out of ${questionList.length}!`;
    qs.style.textAlign = "center";
    nextBtn.innerHTML = "Play Again";

    // Hide answer buttons
    buttons.forEach(btn => (btn.style.display = "none"));

    // Reset quiz on Play Again
    nextBtn.onclick = () => {
        qsn = 0;
        result = 0;
        buttons.forEach(btn => (btn.style.display = "block")); // Show buttons again
        nextBtn.innerHTML = "Next"; // Reset button text
        startQuiz();
    };
}

function startQuiz() {
    qsn = 0;
    result = 0;
    loadQuestion();
    handleNextButton(); // Attach listener to Next button
}

startQuiz();
