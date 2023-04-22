document.addEventListener('DOMContentLoaded', () => {
  const newListInput = document.getElementById('new-list-name');
  const createListButton = document.getElementById('create-list');
  const listsContainer = document.getElementById('lists-container');
  const listTemplate = document.getElementById('list-template').content;
  const questionTemplate = document.getElementById('question-template').content;

  createListButton.addEventListener('click', () => {
      const listName = newListInput.value.trim();

      if (listName) {
          const list = listTemplate.cloneNode(true);
          list.querySelector('.list-name').textContent = listName;
          bindListEvents(list);

          listsContainer.appendChild(list);
          newListInput.value = '';
      }
  });

  function bindListEvents(list) {
      const addQuestionButton = list.querySelector('.add-question');
      const newQuestionInput = list.querySelector('.new-question');
      const randomizeButton = list.querySelector('.randomize');
      const deleteListButton = list.querySelector('.delete-list');

      addQuestionButton.addEventListener('click', () => {
          const questionText = newQuestionInput.value.trim();

          if (questionText) {
              const question = questionTemplate.cloneNode(true);
              question.querySelector('.question-text').textContent = questionText;
              bindQuestionEvents(question);

              list.querySelector('.questions-container').appendChild(question);
              newQuestionInput.value = '';
          }
      });

      randomizeButton.addEventListener('click', () => {
          const questions = Array.from(list.querySelectorAll('.question'));
          if (questions.length > 0) {
              const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
              alert(randomQuestion.querySelector('.question-text').textContent);
          } else {
              alert('There are no questions in the list.');
          }
      });

      deleteListButton.addEventListener('click', () => {
          listsContainer.removeChild(list);
      });
  }

  function bindQuestionEvents(question) {
      const editButton = question.querySelector('.edit-question');
      const deleteButton = question.querySelector('.delete-question');

      editButton.addEventListener('click', () => {
          const questionText = question.querySelector('.question-text');
          const newText = prompt('Edit your question:', questionText.textContent);

          if (newText !== null && newText.trim()) {
              questionText.textContent = newText.trim();
          }
      });

      deleteButton.addEventListener('click', () => {
          question.classList.add('fade-out');
          setTimeout(() => {
              question.parentElement.removeChild(question);
          }, 300);
      });
  }
});
