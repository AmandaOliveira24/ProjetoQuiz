// =========================
// QUIZ INTERATIVO
// =========================

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');

let questions = [];
let currentIndex = 0;
let score = 0;

// =========================
// EVENTOS
// =========================

startBtn.addEventListener('click', async () => {
  startBtn.classList.add('hidden');
  loading.classList.remove('hidden');
  await fetchQuestions();
});

nextBtn.addEventListener('click', () => showNextQuestion());
restartBtn.addEventListener('click', () => resetQuiz());

// =========================
// FETCH ASSÍNCRONO
// =========================
async function fetchQuestions() {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
    if (!res.ok) throw new Error('Falha ao carregar perguntas.');

    const data = await res.json();
    questions = data.results.map((q, index) => ({
      id: index + 1,
      question: q.question,
      correct: q.correct_answer,
      answers: shuffle([...q.incorrect_answers, q.correct_answer])
    }));

    loading.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    showQuestion();
  } catch (error) {
    loading.textContent = 'Erro ao carregar. Tente novamente.';
  }
}

// =========================
// EXIBIR PERGUNTAS
// =========================
function showQuestion() {
  const current = questions[currentIndex];
  questionText.innerHTML = current.question;
  answersContainer.innerHTML = '';

  current.answers.forEach(ans => {
    const btn = document.createElement('button');
    btn.textContent = ans;
    btn.addEventListener('click', e => selectAnswer(e, current.correct));
    answersContainer.appendChild(btn);
  });
}

// =========================
// LÓGICA DE RESPOSTAS
// =========================
function selectAnswer(e, correctAnswer) {
  const selected = e.target;
  const isCorrect = selected.textContent === correctAnswer;
  selected.classList.add(isCorrect ? 'correct' : 'wrong');
  if (isCorrect) score++;

  // Desativar todos os botões
  Array.from(answersContainer.children).forEach(btn => btn.disabled = true);
  nextBtn.classList.remove('hidden');
}

// =========================
// PRÓXIMA PERGUNTA
// =========================
function showNextQuestion() {
  currentIndex++;
  nextBtn.classList.add('hidden');

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

// =========================
// FINALIZAÇÃO DO QUIZ
// =========================
function finishQuiz() {
  questionContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreText.textContent = `Você acertou ${score} de ${questions.length}! 🏆`;

  saveScore(score);
}

// =========================
// PERSISTÊNCIA (localStorage)
// =========================
function saveScore(newScore) {
  const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
  scores.push({ date: new Date().toLocaleString(), score: newScore });
  localStorage.setItem('quizScores', JSON.stringify(scores));
}

// =========================
// REINICIAR QUIZ
// =========================
function resetQuiz() {
  resultContainer.classList.add('hidden');
  score = 0;
  currentIndex = 0;
  startBtn.classList.remove('hidden');
}

// =========================
// UTILITÁRIOS
// =========================
const shuffle = array => array.sort(() => Math.random() - 0.5);
