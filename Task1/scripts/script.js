// Selecting elements
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const groceryInput = document.querySelector(".form-input");
const submitBtn = document.querySelector(".submit-btn");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// Edit option
let editElement;
let editFlag = false;
let editID = "";

// Functions

// Display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // Remove alert after 1.5 seconds
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

// Set back to default
function setDefault() {
  groceryInput.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// Local Storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// Delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  groceryList.removeChild(element);

  if (groceryList.children.length === 0) {
    clearBtn.classList.remove("show");
  }

  displayAlert("item removed", "danger");
  removeFromLocalStorage(id);
  setDefault();
}

// Edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // Set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // Set form value
  groceryInput.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

// Clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach(function (item) {
      groceryList.removeChild(item);
    });
  }

  clearBtn.classList.remove("show");
  displayAlert("empty list", "danger");
  setDefault();
  localStorage.removeItem("list");
}

// Event listeners
// Submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = groceryInput.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    const element = document.createElement("article");
    // Add class
    element.classList.add("grocery-item");
    // Add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="item-title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;

    const editBtn = element.querySelector(".edit-btn");
    const deleteBtn = element.querySelector(".delete-btn");

    editBtn.addEventListener("click", editItem);
    deleteBtn.addEventListener("click", deleteItem);

    // Append child
    groceryList.appendChild(element);

    // Display alert
    displayAlert("item added to the list", "success");
    // Show clear button
    clearBtn.classList.add("show");
    // Add to local storage
    addToLocalStorage(id, value);
    // Set back to default
    setDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    // Edit local storage
    editLocalStorage(editID, value);
    setDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
});

// Clear items
clearBtn.addEventListener("click", clearItems);

// Load items
window.addEventListener("DOMContentLoaded", function () {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      const element = document.createElement("article");
      // Add class
      element.classList.add("grocery-item");
      // Add id
      const attr = document.createAttribute("data-id");
      attr.value = item.id;
      element.setAttributeNode(attr);
      element.innerHTML = `<p class="item-title">${item.value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;

      const editBtn = element.querySelector(".edit-btn");
      const deleteBtn = element.querySelector(".delete-btn");

      editBtn.addEventListener("click", editItem);
      deleteBtn.addEventListener("click", deleteItem);

      // Append child
      groceryList.appendChild(element);

      // Show clear button
      clearBtn.classList.add("show");
    });
  }
});
