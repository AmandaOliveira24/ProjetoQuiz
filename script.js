// ----------------------------
// 1. ELEMENTOS DO DOM
// ----------------------------
const btnIniciar = document.getElementById("btn-iniciar-quiz");
const mainSection = document.querySelector("main section");
// NOVO: Referência para a barra de progresso
const progressBar = document.getElementById("progress-bar");

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
// NOVO: 3. ATUALIZAR BARRA DE PROGRESSO
// ----------------------------
const atualizarProgresso = (indiceAtual, totalPerguntas) => {
    // Calcula o percentual de progresso
    const percentual = (indiceAtual / totalPerguntas) * 100;
    
    // Aplica o percentual ao estilo da barra
    progressBar.style.width = `${percentual}%`;
};

// ----------------------------
// 4. CARREGAR PERGUNTAS
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
// 5. INICIAR QUIZ
// ----------------------------
const iniciarQuiz = (perguntas) => {
  pontuacao = 0; // Reset pontuação

  // 🔹 MOSTRA a barra de progresso quando o quiz inicia
  document.querySelector(".progress-container").style.display = "block";

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
// 6. RENDERIZAR PERGUNTA
// ----------------------------
const renderizarPergunta = (perguntas, indice) => {
  const pergunta = perguntas[indice];
  const totalPerguntas = perguntas.length; // NOVO: Pega o total de perguntas

  if (!pergunta) return telaFinal(totalPerguntas); // NOVO: Passa o total para a tela final
  // NOVO: Atualiza a barra antes de renderizar (mostra o progresso *até* essa pergunta)
  atualizarProgresso(indice, totalPerguntas);


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
      // NOVO: Atualiza a barra para a próxima etapa (indice + 1)
      atualizarProgresso(indice + 1, totalPerguntas);

      setTimeout(() => {
        renderizarPergunta(perguntas, indice + 1);
      }, 900);
    })
  );
};

// ----------------------------
// 7. TELA FINAL
// ----------------------------
// NOVO: Recebe o total de perguntas
const telaFinal = (totalPerguntas = 10) => { 

  // NOVO: Garante 100% de progresso na tela final
  atualizarProgresso(totalPerguntas, totalPerguntas);

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
