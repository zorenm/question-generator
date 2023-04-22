const listSelect = document.getElementById('listSelect');
const newListName = document.getElementById('newListName');
const createList = document.getElementById('createList');
const listTitle = document.getElementById('listTitle');
const questionsList = document.getElementById('questionsList');
const newQuestion = document.getElementById('newQuestion');
const addQuestion = document.getElementById('addQuestion');
const randomize = document.getElementById('randomize');
const randomQuestion = document.getElementById('randomQuestion');
const randomQuestionText = document.getElementById('randomQuestionText');
const listDetails = document.getElementById('listDetails');
const editList = document.getElementById('editList');
const deleteList = document.getElementById('deleteList');

let lists = JSON.parse(localStorage.getItem('lists')) || {};

function saveLists() {
    localStorage.setItem('lists', JSON.stringify(lists));
}

function loadLists() {
    listSelect.innerHTML = '<option value="">Select a list</option>';

    for (const listName in lists) {
        const option = document.createElement('option');
        option.textContent = listName;
        option.value = listName;
        listSelect.add(option);
    }
}

loadLists();

createList.addEventListener('click', () => {
    const listName = newListName.value.trim();
    if (!listName) return;

    lists[listName] = [];
    newListName.value = '';

    const option = document.createElement('option');
    option.textContent = listName;
    option.value = listName;
    listSelect.add(option);

    saveLists();
    loadLists();
});

listSelect.addEventListener('change', () => {
    const listName = listSelect.value;
    if (!listName) {
        listDetails.style.display = 'none';
        return;
    }

    listDetails.style.display = 'block';
    listTitle.textContent = listName;
    displayQuestions(listName);
});

function displayQuestions(listName) {
    questionsList.innerHTML = '';

    lists[listName].forEach((question, index) => {
        const li = document.createElement('li');
        li.textContent = question;
        li.style.marginBottom = '5px';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            const editedQuestion = prompt('Edit the question:', question);
            if (editedQuestion) {
                lists[listName][index] = editedQuestion.trim();
                displayQuestions(listName);
                saveLists();
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            lists[listName].splice(index, 1);
            displayQuestions(listName);
            saveLists();
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        questionsList.appendChild(li);
    });
}

addQuestion.addEventListener('click', () => {
    const question = newQuestion.value.trim();
    if (!question) return;

    const listName = listSelect.value;
    lists[listName].push(question);
    newQuestion.value = '';

    displayQuestions(listName);
    saveLists();
});

randomize.addEventListener('click', () => {
    const listName = listSelect.value;
    const questions = lists[listName];
    if (questions.length === 0) {
        randomQuestion.style.display = 'none';
        return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    randomQuestionText.textContent = questions[randomIndex];
    randomQuestion.style.display = 'block';
});

editList.addEventListener('click', () => {
    const listName = listSelect.value;
    if (!listName) return;

    const editedListName = prompt('Edit the list name:', listName);
    if (editedListName && editedListName.trim() !== listName) {
        lists[editedListName] = lists[listName];
        delete lists[listName];
        saveLists();
        loadLists();
    }
});

deleteList.addEventListener('click', () => {
    const listName = listSelect.value;
    if (!listName) return;

    if (confirm(`Are you sure you want to delete the list "${listName}"?`)) {
        delete lists[listName];
        saveLists();
        loadLists();
    }
});
