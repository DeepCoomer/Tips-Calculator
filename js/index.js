const noOfPeopleInput = document.getElementById("no-of-people");
const billInput = document.getElementById("bill");
const tipCustomInput = document.getElementById("tip-custom");

const tipButtons = document.querySelectorAll('input[name="tip"]');
const tipLabels = document.querySelectorAll(".tip-tab");

const resetbtn = document.getElementById('reset-btn');

let billAmount = 0;
let selectedTip = 0;
let customTip = 0;

let selectedTipButton = null;
let selectedTipLabel = null;

if (billInput.value == "" && noOfPeopleInput.value == "" && selectedTip == 0 && tipCustomInput.value == "") {
  resetbtn.disabled = true
}

tipButtons.forEach((tipButton, index) => {
  tipButton.addEventListener("click", () => {
    if (selectedTipButton) {
      selectedTipLabel.style.backgroundColor = "";
    }

    tipLabels[index].style.backgroundColor = "#26C2AD";

    selectedTipButton = tipButton;
    selectedTipLabel = tipLabels[index];
    selectedTip = selectedTipButton ? selectedTipButton.value : "";
  });
});

billInput.addEventListener("input", () => {
  validateInput(billInput.value, "Bill");
  if (billInput.value == 0) {
    return;
  }
  if (noOfPeopleInput.value == 0) {
    return;
  }
//   if (selectedTip == 0) {
//     return;
//   }

  // console.log("Bill Amount")
  calculateTip(billInput.value, selectedTip, noOfPeopleInput.value);
});

const setLabel = (label) => {
  // console.log(label)
  if (tipCustomInput.value) {
    tipCustomInput.value = "";
  }
  if (document.getElementById("tip-error").classList.contains("error-active")) {
    document.getElementById("tip-error").classList.remove("error-active");
  }
  if (label !== selectedTip) {
    selectedTip = label;
  }
  if (billInput.value == 0) {
    return;
  }
  if (noOfPeopleInput.value == 0) {
    return;
  }
//   if (selectedTip == 0) {
//     return;
//   }

  calculateTip(billInput.value, selectedTip, noOfPeopleInput.value);
};

tipCustomInput.addEventListener("input", () => {
  tipButtons.forEach((tipButton, index) => {
    if ((tipLabels[index].style.backgroundColor = "#26C2AD")) {
      tipLabels[index].style.backgroundColor = "";
    }
  });
  validateInput(tipCustomInput.value, "SelectedTip");
  selectedTip = tipCustomInput.value;

  if (billInput.value == 0) {
    return;
  }
  if (noOfPeopleInput.value == 0) {
    return;
  }
//   if (selectedTip == 0) {
//     return;
//   }

  calculateTip(billInput.value, selectedTip, noOfPeopleInput.value);
});

noOfPeopleInput.addEventListener("input", function () {
  validateInput(this.value, "NoOfPeople");
  if (billInput.value == 0) {
    return;
  }
//   if (selectedTip == 0) {
//     return;
//   }
  if (this.value.trim() !== "") {
    billAmount = document.getElementById("bill").value;
    selectedTip = selectedTipButton ? selectedTipButton.value : "";
    customTip = document.getElementById("tip-custom").value;
    numberOfPeople = this.value;

    if (customTip) {
      selectedTip = customTip;
    }

    calculateTip(billAmount, selectedTip, numberOfPeople);
  }
});

const calculateTip = (billAmount, selectedTip, numberOfPeople) => {
  validateInput(billAmount, "Bill");
  validateInput(selectedTip, "SelectedTip");
  validateInput(numberOfPeople, "NoOfPeople");
  const totalTip = (billAmount * selectedTip) / 100;
  const tipPerPerson = totalTip / numberOfPeople;
  const totalAmount = parseFloat(billAmount) + totalTip;
  const amountPerPerson = totalAmount / numberOfPeople;

  document.getElementById(
    "amountPerPerson"
  ).innerText = `$${amountPerPerson.toFixed(2)}`;
  document.getElementById("tipPerPerson").innerText = `$${tipPerPerson.toFixed(
    2
  )}`;
};

const handleReset = () => {
  billInput.value = "";
  noOfPeopleInput.value = "";
  tipCustomInput.value = "";
  selectedTip = 0;
  if (selectedTipLabel.style.backgroundColor) {
    selectedTipLabel.style.backgroundColor = "";
  }

  document.getElementById("amountPerPerson").innerText = "$0.00";
  document.getElementById("tipPerPerson").innerText = "$0.00";
  document.getElementById("bill-error").classList.remove("error-active");
  document.getElementById("tip-error").classList.remove("error-active");
  document
    .getElementById("no-of-people-error")
    .classList.remove("error-active");
  document.getElementById("bill-container").classList.remove("error-container");
  document
    .getElementById("selected-tip-container")
    .classList.remove("tab-error-container");
  document
    .getElementById("people-container")
    .classList.remove("error-container");
  document.getElementById("bill-container").classList.add("input-container");
  document
    .getElementById("selected-tip-container")
    .classList.add("tab-input-container");
  document.getElementById("people-container").classList.add("input-container");
};

const validateInput = (input, inputType) => {
  let billElement = document.getElementById("bill-error");
  let selectedTipElement = document.getElementById("tip-error");
  let numberOfPeopleElement = document.getElementById("no-of-people-error");

  let billContainer = document.getElementById("bill-container");
  let selectedTipContainer = document.getElementById("selected-tip-container");
  let peopleContainer = document.getElementById("people-container");

  let regexString = "^(?!0d*)d+(.d+)?$";

  switch (inputType) {
    case "Bill":
      if (parseFloat(input) < 0) {
        billElement.innerText = "Can't be negative";
        billElement.classList.add("error-active");
        billContainer.classList.remove("input-container");
        billContainer.classList.add("error-container");
        throw new Error("Invalid Input");
      } else if (parseFloat(input) == 0) {
        billElement.innerText = "Can't be 0";
        billElement.classList.add("error-active");
        billContainer.classList.remove("input-container");
        billContainer.classList.add("error-container");
        throw new Error("Invalid Input");
      } else if (regexString.match(input)) {
        billElement.innerText = "Invalid input";
        billElement.classList.add("error-active");
        billContainer.classList.remove("input-container");
        billContainer.classList.add("error-container");
        throw new Error("Invalid Input");
      } else {
        billElement.classList.remove("error-active");
        billContainer.classList.add("input-container");
        billContainer.classList.remove("error-container");
      }
      break;
    case "NoOfPeople":
      if (parseFloat(input) < 0) {
        numberOfPeopleElement.innerText = "Can't be negative";
        numberOfPeopleElement.classList.add("error-active");
        peopleContainer.classList.remove("input-container");
        peopleContainer.classList.add("error-container");
        throw new Error("Invalid Input");
      } else if (parseFloat(input) == 0) {
        numberOfPeopleElement.innerText = "Can't be 0";
        numberOfPeopleElement.classList.add("error-active");
        peopleContainer.classList.remove("input-container");
        peopleContainer.classList.add("error-container");
        throw new Error("Invalid Input");
      } else if (regexString.match(input)) {
        numberOfPeopleElement.innerText = "Invalid input";
        numberOfPeopleElement.classList.add("error-active");
        peopleContainer.classList.remove("input-container");
        peopleContainer.classList.add("error-container");
        throw new Error("Invalid Input");
      } else {
        numberOfPeopleElement.classList.remove("error-active");
        peopleContainer.classList.add("input-container");
        peopleContainer.classList.remove("error-container");
      }
      break;
    case "SelectedTip":
      if (parseFloat(input) < 0) {
        selectedTipElement.innerText = "Can't be negative";
        selectedTipElement.classList.add("error-active");
        selectedTipContainer.classList.remove("tab-input-container");
        selectedTipContainer.classList.add("tab-error-container");
        throw new Error("Invalid Input");
      } else if ("^-?\d+(\.\d+)?$".match(input)) {
        selectedTipElement.innerText = "Invalid input";
        selectedTipElement.classList.add("error-active");
        selectedTipContainer.classList.remove("tab-input-container");
        selectedTipContainer.classList.add("tab-error-container");
        throw new Error("Invalid Input");
      } else {
        selectedTipElement.classList.remove("error-active");
        selectedTipContainer.classList.add("tab-input-container");
        selectedTipContainer.classList.remove("tab-error-container");
      }
      break;
    default:
      break;
  }
};
