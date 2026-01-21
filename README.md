# Nanda's Quiz

## Descrição do Projeto

O **Nanda's Quiz** é um quiz interativo desenvolvido com HTML, CSS e JavaScript puro. O objetivo do projeto é testar os conhecimentos do usuário por meio de perguntas de múltipla escolha, utilizando um arquivo JSON externo como base de dados.

O sistema apresenta uma interface amigável, feedback visual imediato, controle de pontuação e uma barra de progresso que acompanha o avanço do quiz.

---

## Proposta da Atividade (Análise)

Com base na proposta da atividade, os seguintes requisitos foram considerados:

### Requisitos Funcionais

1. Tela inicial com instruções ao usuário  
2. Botão para iniciar o quiz  
3. Carregamento dinâmico das perguntas  
4. Utilização de arquivo JSON externo  
5. Exibição de perguntas uma por vez  
6. Respostas de múltipla escolha  
7. Apenas uma alternativa correta por pergunta  
8. Feedback visual para respostas corretas e incorretas  
9. Bloqueio das alternativas após a escolha  
10. Sistema de pontuação  
11. Tela final com resultado  
12. Opção para reiniciar o quiz  
13. Tratamento de erro no carregamento das perguntas  
14. Barra de progresso do quiz  
15. Layout responsivo  

---

## Avaliação de Cumprimento dos Requisitos

| Requisito | Situação |
|---------|---------|
| Tela inicial com instruções | Atendido |
| Botão iniciar quiz | Atendido |
| Perguntas via JSON | Atendido |
| Uso da Fetch API | Atendido |
| Renderização dinâmica | Atendido |
| Feedback visual | Atendido |
| Pontuação | Atendido |
| Tela final | Atendido |
| Reinício do quiz | Atendido |
| Barra de progresso | Atendido |
| Barra oculta na tela inicial | Atendido |
| Responsividade | Atendido |
| Tratamento de erros | Atendido |

Conclusão: Todos os requisitos propostos na atividade foram integralmente cumpridos.

---

## Checklist de Conformidade

- [x] Estruturas básicas (condicionais, laços, funções)  
- [x] Objetos e Arrays com métodos map (uso nas opções das perguntas)  
- [x] Arrow functions (incluindo eventos)  
- [x] DOM dinâmico (criação, atualização e eventos)  
- [x] Requisição assíncrona com fetch, loading e tratamento de erros  
- [x] Uso de Promises com .then() e .catch()  
- [ ] Uso de async/await com try/catch  
- [x] Web Storage para persistência de dados  
- [ ] API HTML5 adicional (File, Geolocation, Canvas, etc.)  
- [x] Layout responsivo, semântica HTML e acessibilidade básica  
- [x] Organização de arquivos e README completo  

---

## Tecnologias Utilizadas

- HTML5 – Estrutura da aplicação  
- CSS3 – Estilização, layout e responsividade  
- JavaScript (ES6+) – Lógica do quiz e manipulação do DOM  
- JSON – Armazenamento das perguntas  

---
## APIs HTML5 Utilizadas

O projeto utiliza a API Web Storage (localStorage), que faz parte do conjunto de APIs do HTML5.

Essa API foi empregada para persistir a pontuação final do quiz no navegador, permitindo que os dados permaneçam armazenados mesmo após o recarregamento da página.

O uso do Web Storage atende ao requisito obrigatório da atividade referente à utilização de APIs HTML5 para persistência de dados no lado do cliente.

## Estrutura de Arquivos

projeto-quiz
├── index.html
├── style.css
├── script.js
├── questions.json
└── README.md

---

## Funcionalidades Adicionais

- Barra de progresso animada  
- Feedback visual com cores para acerto e erro  
- Mensagem de carregamento  
- Tela de erro personalizada  
- Código organizado e comentado  

---

## Como Executar o Projeto

1. Baixar ou clonar o projeto  
2. Manter todos os arquivos no mesmo diretório  
3. Abrir o arquivo index.html em um navegador moderno  

Observação: Para evitar restrições de segurança do navegador ao usar fetch, recomenda-se executar o projeto em um servidor local (por exemplo, Live Server).

---
## Declaração de Autoria e Uso de Inteligência Artificial

Este trabalho é **individual** e o código apresentado é **autoral**.

Foram utilizadas ferramentas de **Inteligência Artificial** como apoio ao desenvolvimento, especialmente **para a resolução de erros durante a criação do projeto**, além de esclarecimento de dúvidas técnicas e revisão de lógica.

Ferramentas utilizadas:
- **ChatGPT (OpenAI)**: auxílio na identificação e correção de erros em JavaScript, organização do código e elaboração da documentação (README).
- **Gemini (Google)**: apoio conceitual para resolução de dúvidas pontuais relacionadas a JavaScript, CSS e boas práticas de desenvolvimento web.

Todas as decisões de implementação, estrutura do projeto, correções finais de código e validação das funcionalidades foram realizadas pela autora.

Materiais de apoio consultados:
- Documentação MDN Web Docs (HTML, CSS e JavaScript)
- Conteúdos disponibilizados no moodle

---

## Considerações Finais

O projeto demonstra domínio dos conceitos básicos de desenvolvimento front-end, incluindo manipulação do DOM, consumo de dados externos, organização de código e preocupação com a experiência do usuário.

O código está estruturado, funcional e atende completamente à proposta da atividade.

---

Desenvolvido por **Amanda Sousa de Oliveira**
