// ... rest of the code remains the same
const firebaseConfig = {
    apiKey: "AIzaSyARVc_vBXAnmG8EF_7nEERmi5uqmFkec2w",
    authDomain: "question-generator-c7d4f.firebaseapp.com",
    projectId: "question-generator-c7d4f",
    storageBucket: "question-generator-c7d4f.appspot.com",
    messagingSenderId: "49418483304",
    appId: "1:49418483304:web:3bbadf46ed7869136ceddd",
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth(app);
  
 // Sign up function
document.getElementById('sign-up-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log('User signed up:', userCredential);
    } catch (error) {
        console.error('Error signing up:', error);
    }
});

 
 
 
 
 
 
  // Sign in function
document.getElementById('sign-in-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log('User signed in:', userCredential);
    } catch (error) {
      console.error('Error signing in:', error);
    }
});

  // Sign out function
document.getElementById('sign-out').addEventListener('click', async () => {
    try {
        await auth.signOut();
        console.log('User signed out');
    } catch (error) {
        console.error('Error signing out:', error);
    }
});

  
  
  
  
  // Update UI based on authentication state
  function updateUI(user) {
    if (user) {
      // User is signed in
      document.getElementById('sign-up-form').style.display = 'none';
      document.getElementById('sign-in-form').style.display = 'none';
      document.getElementById('sign-out').style.display = 'block';
      // You can also display user information or update other parts of your UI
    } else {
      // User is signed out
      document.getElementById('sign-up-form').style.display = 'block';
      document.getElementById('sign-in-form').style.display = 'block';
      document.getElementById('sign-out').style.display = 'none';
    }
  }
  
  firebase.auth().onAuthStateChanged((user) => {
    updateUI(user);
  });
  
  
  
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
  
  
  
  
