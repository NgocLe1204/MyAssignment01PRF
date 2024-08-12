"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const calculatebmibtn = document.getElementById("calculate-bmi-btn");
const petArr = [];

const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  breed: "Tabby",
  color: "red",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  bmi: "?",
  date: new Date(2022, 2, 1),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  breed: "Mixed Breed",
  color: "Green",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  bmi: "?",
  date: new Date(2022, 2, 2),
};

petArr.push(data1);
petArr.push(data2);

// 1. Catching the Click event on the "Submit" button
submitBtn.addEventListener("click", function () {
  //  Get data from Form Input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  //console.log(data);

  // 2. Validate data
  const validate = validateData(data);
  if (validate) {
    // 3.  Add pets in the list
    petArr.push(data);

    // 4. Display the list of pets
    renderTableData(petArr);

    // 5.  Delete the data entered in the input form
    clearInputs();
  }
  // If valid: Let do steps 3, 4, 5
  // If invalid: Please report errors
});

renderTableData(petArr);

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? " bi-check-circle-fill" : " bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? " bi-check-circle-fill" : " bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? " bi-check-circle-fill" : " bi-x-circle-fill"
    }"></i></td>
    <td>${petArr[i].bmi}</td>
    <td>${petArr[i].date.getDate()}/ ${petArr[i].date.getMonth() + 1}/ ${petArr[
      i
    ].date.getFullYear()}</td>
    <td><button class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}

function deletePet(petId) {
  const isDeleted = confirm(" Are you sure? ");
  if (isDeleted) {
    // Delete here
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        // Remove from array
        petArr.splice(i, 1);
        // Display function callback
        renderTableData(petArr);
      }
    }
  }
}

function clearInputs() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

function validateData(data) {
  let isValid = true;
  if (data.id.trim() === "") {
    alert("Please input for ID!");
    isValid = false;
  }
  if (data.name.trim() === "") {
    alert("Please input for Name!");
    isValid = false;
  }
  if (isNaN(data.age)) {
    alert("Please input for age!");
    isValid = false;
  }
  if (isNaN(data.weight)) {
    alert("Please input for weight!");
    isValid = false;
  }
  if (isNaN(data.length)) {
    alert("Please input for length!");
    isValid = false;
  }
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      isValid = false;
      break;
    }
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValid = false;
  }

  if (data.type === "") {
    alert("Please select a type!");
    isValid = false;
  }

  return isValid;
}

let healthycheck = true; // Initialize(khởi tạo) healthycheck to true

healthyBtn.addEventListener("click", function () {
  if (healthycheck === true) {
    // Display healthy pet
    const healthyPetArr = [];

    // Selection in the petArr array
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        // Add that pet i to the healthyPetArr
        healthyPetArr.push(petArr[i]);
      }
    }

    // After "for" will get healthyPetArr array: contains all healthy pets

    // Call the display function
    renderTableData(healthyPetArr);
    // Then, change button " Show Healthy Pet" by " Show All Pet "
    healthyBtn.textContent = "Show All Pet";

    healthycheck = false;
  } else {
    // Show all pet
    renderTableData(petArr);

    // Then, change button " Show Healthy Pet" by " Show All Pet "
    healthyBtn.textContent = "Show Healthy Pet";
    healthycheck = true;
  }
});

calculatebmibtn.onclick = function () {
  // Browse petArr array: Update the BMI attribute value again
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === " Dog "
        ? ((petArr[i].weight * 703) / petArr[i].length ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].length ** 2).toFixed(2);
  }

  // Then, call the display function
  renderTableData(petArr);
};
