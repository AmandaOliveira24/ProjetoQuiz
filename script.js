// ----------------------------
// 1. ELEMENTOS DO DOM
// ----------------------------
const btnIniciar = document.getElementById('btn-iniciar-quiz');
const mainSection = document.querySelector('main section');

// ----------------------------
// 2. FUNÇÕES UTILITÁRIAS
// ----------------------------

// Mostra mensagem de carregamento
const showLoading = (isLoading) => {
  if (isLoading) {
    mainSection.innerHTML = `
      <div class="alinhar">
        <h2>Carregando perguntas...</h2>
        <p>Por favor, aguarde um momento ⏳</p>
      </div>
    `;
  }
};

// Mostra erro amigável
const showError = (msg) => {
  mainSection.innerHTML = `
    <div class="alinhar">
      <h2>❌ Ocorreu um erro</h2>
      <p>${msg}</p>
      <button id="btn-tentar-novamente">Tentar novamente</button>
    </div>
  `;
  // botão para tentar novamente
  document.getElementById('btn-tentar-novamente').addEventListener('click', () => {
    location.reload(); // recarrega a página
  });
};

// ----------------------------
// 3. FETCH DAS PERGUNTAS (PROMISES)
// ----------------------------

const carregarPerguntas = () => {
  showLoading(true);

  fetch('questions.json')
    .then((response) => {
      if (!response.ok) throw new Error('Falha ao carregar o arquivo de perguntas.');
      return response.json();
    })
    .then((data) => {
      // quando o fetch terminar com sucesso:
      console.log('Perguntas carregadas:', data);
      iniciarQuiz(data);
    })
    .catch((error) => {
      console.error('Erro no fetch:', error);
      showError('Não foi possível carregar as perguntas. Verifique o arquivo "questions.json".');
    });
};

// ----------------------------
// 4. INÍCIO DO QUIZ
// ----------------------------

const iniciarQuiz = (perguntas) => {
  // Aqui apenas mostramos a primeira pergunta (vamos expandir depois)
  mainSection.innerHTML = `
    <div class="alinhar">
      <h2>Quiz Iniciado!</h2>
      <p>Você está pronto(a)? Boa sorte 🎯</p>
      <button id="btn-proxima">Ver primeira pergunta</button>
    </div>
  `;

  // evento para ir para a primeira pergunta
  document.getElementById('btn-proxima').addEventListener('click', () => {
    renderizarPergunta(perguntas, 0);
  });
};

// ----------------------------
// 5. RENDERIZAR PERGUNTA (Async/Await)
// ----------------------------

const renderizarPergunta = async (perguntas, indice) => {
  try {
    const pergunta = perguntas[indice];
    if (!pergunta) {
      mainSection.innerHTML = `
        <div class="alinhar">
          <h2>Fim do Quiz 🎉</h2>
          <p>Você respondeu todas as perguntas!</p>
          <button id="btn-reiniciar">Reiniciar</button>
        </div>
      `;
      document.getElementById('btn-reiniciar').addEventListener('click', () => location.reload());
      return;
    }

    // renderiza conteúdo da pergunta
    mainSection.innerHTML = `
      <h2>${pergunta.question}</h2>
      <ul>
        ${pergunta.options
          .map(
            (opt, i) => `
          <li>
            <button class="option-btn" data-index="${i}">
              ${opt}
            </button>
          </li>`
          )
          .join('')}
      </ul>
    `;

    // evento de clique nas opções
    document.querySelectorAll('.option-btn').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        const selecionada = Number(e.target.dataset.index);
        const correta = selecionada === pergunta.answerIndex;

        if (correta) {
          alert('✅ Resposta correta!');
        } else {
          alert('❌ Resposta incorreta!');
        }

        renderizarPergunta(perguntas, indice + 1); // próxima
      })
    );
  } catch (error) {
    console.error('Erro ao renderizar pergunta:', error);
    showError('Erro interno ao exibir a pergunta.');
  }
};

// ----------------------------
// 6. EVENTOS
// ----------------------------

// Arrow function no evento de clique
btnIniciar.addEventListener('click', () => {
  carregarPerguntas();
});
