// ----------------------------
// 1. ELEMENTOS DO DOM
// ----------------------------
const btnIniciar = document.getElementById("btn-iniciar-quiz");
const mainSection = document.querySelector("main section");

let pontuacao = 0; // Pontuação global

// ----------------------------
// 2. UTILITÁRIOS
// ----------------------------
const showLoading = () => {
  mainSection.innerHTML = `
    <div class="alinhar">
      <h2>Carregando perguntas...</h2>
      <p>Aguarde um momento ⏳</p>
    </div>
  `;
};

const showError = (msg) => {
  mainSection.innerHTML = `
    <div class="alinhar">
      <h2>❌ Erro</h2>
      <p>${msg}</p>
      <button id="btn-tentar-novamente">Tentar novamente</button>
    </div>
  `;
  document
    .getElementById("btn-tentar-novamente")
    .addEventListener("click", () => location.reload());
};

// ----------------------------
// 3. CARREGAR PERGUNTAS
// ----------------------------
const carregarPerguntas = () => {
  showLoading();

  fetch("questions.json")
    .then((response) => {
      if (!response.ok)
        throw new Error("Erro ao carregar o arquivo questions.json");
      return response.json();
    })
    .then((data) => iniciarQuiz(data))
    .catch(() =>
      showError("Não foi possível carregar as perguntas. Verifique o arquivo.")
    );
};

// ----------------------------
// 4. INICIAR QUIZ
// ----------------------------
const iniciarQuiz = (perguntas) => {
  pontuacao = 0; // Reset pontuação

  mainSection.innerHTML = `
    <div class="alinhar">
      <h2>Quiz Iniciado!</h2>
      <p>Boa sorte! 🎯</p>
      <button id="btn-proxima">Ver primeira pergunta</button>
    </div>
  `;

  document
    .getElementById("btn-proxima")
    .addEventListener("click", () => renderizarPergunta(perguntas, 0));
};

// ----------------------------
// 5. RENDERIZAR PERGUNTA
// ----------------------------
const renderizarPergunta = (perguntas, indice) => {
  const pergunta = perguntas[indice];

  if (!pergunta) return telaFinal();

  mainSection.innerHTML = `
    <h2>${pergunta.question}</h2>

    <ul class="lista-opcoes">
      ${pergunta.options
        .map(
          (opt, i) => `
        <li>
          <button class="option-btn" data-index="${i}">
            ${opt}
          </button>
        </li>
      `
        )
        .join("")}
    </ul>

    <p class="texto-pontuacao">Pontuação: <strong>${pontuacao}</strong></p>
  `;

  document.querySelectorAll(".option-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const selecionada = Number(e.target.dataset.index);
      const correta = selecionada === pergunta.answerIndex;

      if (correta) {
        pontuacao++;
        e.target.classList.add("correta");
      } else {
        e.target.classList.add("errada");
      }

      document.querySelectorAll(".option-btn").forEach((b) => (b.disabled = true));

      setTimeout(() => {
        renderizarPergunta(perguntas, indice + 1);
      }, 900);
    })
  );
};

// ----------------------------
// 6. TELA FINAL
// ----------------------------
const telaFinal = () => {
  mainSection.innerHTML = `
    <div class="alinhar">
      <h2>🎉 Fim do Quiz!</h2>
      <p>Você acertou <strong>${pontuacao}</strong> de <strong>10</strong> perguntas!</p>

      <button id="btn-reiniciar">Reiniciar Quiz</button>
    </div>
  `;

  document
    .getElementById("btn-reiniciar")
    .addEventListener("click", () => location.reload());
};

// ----------------------------
// 7. EVENTO DE INÍCIO
// ----------------------------
btnIniciar.addEventListener("click", () => carregarPerguntas());
