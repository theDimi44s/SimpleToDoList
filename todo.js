// Getting all required elements
debugger;
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');

//Set button ('+') active, if user type a text
inputBox.onkeyup = () => {
  let userData = inputBox.value; // Get user entered value
  if (userData.trim() != 0) {
    // If user values aren't only spaces
    addBtn.classList.add('active'); // active the add button
  } else {
    addBtn.classList.remove('active'); // remove, if it doesn't have any type
  }
};

//Show update task
showTasks();

//If user click on the button

addBtn.onclick = () => {
  let userData = inputBox.value; // Get user entered value
  let getLocaleStorage = localStorage.getItem('New Todo');
  if (getLocaleStorage == null) {
    //if localestorage empty
    listArr = []; //create new
  } else {
    listArr = JSON.parse(getLocaleStorage); // transorming json string into js object
  }
  listArr.push(userData); // pushing or adding user data
  localStorage.setItem('New Todo', JSON.stringify(listArr)); // transorming from js object to json string
  showTasks();
  addBtn.classList.remove('active'); // remove, if it doesn't have any type
};

//Functions

// Add task list inside ul
function showTasks() {
  let getLocaleStorage = localStorage.getItem('New Todo');
  if (getLocaleStorage == null) {
    //if localestorage empty
    listArr = []; //create new
  } else {
    listArr = JSON.parse(getLocaleStorage); // transorming json string into js object
  }

  //Counter of tasks
  const pendingNumber = document.querySelector('.pendingNumber');
  pendingNumber.textContent = listArr.length;

  //Set button (ClearAll) active, if user type a text
  if (listArr.length > 0) {
    deleteAllBtn.classList.add('active');
  } else {
    deleteAllBtn.classList.remove('active');
  }

  let newLitag = '';
  listArr.forEach((element, index) => {
    newLitag += `<li>${element}<span onclick = 'deleteTask(${index})';><button>Delete</button></span></li>`;
  });

  todoList.innerHTML = newLitag; //add new 'li' inside 'ul'
  inputBox.value = ''; // once task added leave input task
}

// Delete task
function deleteTask(index) {
  let getLocaleStorage = localStorage.getItem('New Todo');
  listArr = JSON.parse(getLocaleStorage);
  listArr.splice(index, 1); //remove the particular indexed 'li'
  //after remove the 'li' again update local storage
  localStorage.setItem('New Todo', JSON.stringify(listArr)); // transorming from js object to json string
  showTasks();
}

// Delete all task

deleteAllBtn.onclick = () => {
  listArr = []; //empty an array
  //after delete, update todo list
  localStorage.setItem('New Todo', JSON.stringify(listArr)); // transorming from js object to json string
  showTasks();
};
