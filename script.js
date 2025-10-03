const quizData = [
    {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis"
    ],
    answer: "Hypertext Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "None of the above"
    ],
    answer: "Cascading Style Sheets"
  },

  {
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: "<ul>"
  },
  {
    question: "Which property in CSS is used to change text color?",
    options: ["font-style", "text-color", "color", "background-color"],
    answer: "color"
  },
  {
    question: "Inside which HTML element do we put JavaScript code?",
    options: ["<js>", "<scripting>", "<javascript>", "<script>"],
    answer: "<script>"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Oracle"],
    answer: "Netscape"
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  },
  {
    question: "Which CSS property controls the size of text?",
    options: ["text-style", "font-style", "text-size", "font-size"],
    answer: "font-size"
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["style", "class", "font", "styles"],
    answer: "style"
  },
  {
    question: "Which method is used to write something to the console in JavaScript?",
    options: ["console.write()", "console.log()", "log.console()", "print()"],
    answer: "console.log()"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h1>", "<heading>", "<head>", "<h6>"],
    answer: "<h1>"
  },
  {
    question: "In JavaScript, what is used to declare a variable?",
    options: ["var", "let", "const", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Which HTML element is used to display an image?",
    options: ["<img>", "<src>", "<picture>", "<image>"],
    answer: "<img>"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Digital Ordinance Model",
      "Desktop Oriented Mode"
    ],
    answer: "Document Object Model"
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timerId;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const feedbackEl = document.getElementById("feedback");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const startScreen = document.getElementById("start-screen");

function startQuiz() {
  startScreen.style.display = "none";
  quizEl.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  feedbackEl.textContent = "";
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsEl.appendChild(btn);
  });
  startTimer();
}

function startTimer() {
  clearInterval(timerId);
  timeLeft = 10;
  timerEl.textContent = `Time left: ${timeLeft}s`;
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      feedbackEl.textContent = "⏳ Time's up!";
      setTimeout(nextQuestion, 1500);
    }
  }, 1000);
}

function checkAnswer(selected) {
  clearInterval(timerId);
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    score++;
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct: ${correct}`;
    feedbackEl.style.color = "red";
  }
  setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizEl.style.display = "none";
  resultEl.style.display = "block";
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizEl.style.display = "none";
  resultEl.style.display = "none";
  startScreen.style.display = "block";
}
