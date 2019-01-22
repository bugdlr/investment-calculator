// ***********VARIABLES*********** //

const container = document.querySelector(".container");
const allInputs = Array.from(document.getElementsByTagName('input'));
const moneyInputs = Array.from(document.querySelectorAll('.money'));
const fixedInputs = Array.from(document.getElementsByClassName("fixed"));
const cards = Array.from(document.getElementsByClassName("card"));
const resetButton = document.getElementById("reset");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("previous");
const summaryButton = document.getElementById("summary");

let cardShowing = [true, false, false, false, false, false, false];
let allCardsShowing = false;
let inputValues = {};

function setValues() {
  inputsIntoNumbers(allInputs);
  for (let i = 0; i < allInputs.length; i++) {
    inputValues[allInputs[i].id] = Number(allInputs[i].value);
  }
}

// ***********CALCULATION FUNCTIONS*********** //

function sumTotalCost() {
  result = inputValues.price + inputValues.improvements + inputValues.closingCosts;
  document.getElementById('totalCost').value = result;
}

function cashOutlay() {
  setValues();
  inputsIntoNumbers(allInputs);
  document.getElementById('dwnpmtAmt').value = (inputValues.downpayment / 100) * inputValues.price;
  document.getElementById('FinAmt').value = inputValues.price - inputValues.dwnpmtAmt;
  total = inputValues.improvements + inputValues.closingCosts + inputValues.dwnpmtAmt;
  document.getElementById('cashOutlay').value = total;
  document.getElementById('mtg').value = inputValues.mortgagePayment * 12;
  rate = (inputValues.interestRate / 100) / 12;
  n = inputValues.mortgageYrs * 12;
  let numerator = rate * ((1 + rate) ** n);
  let denominator = ((1 + rate) ** n) - 1;
  document.getElementById('mortgagePayment').value = inputValues.FinAmt * (numerator / denominator);
}

function grossRev() {
  setValues();
  inputsIntoNumbers(allInputs);
  totalRev = inputValues.totalRentPerMonth + inputValues.otherRevPerMonth;
  document.getElementById('grossRevPerMonth').value = totalRev;
  document.getElementById('grossRevPerYear').value = (totalRev * 12);
  document.getElementById('rentalIncome').value = (inputValues.totalRentPerMonth * 12);
  document.getElementById('otherIncome').value = (inputValues.otherRevPerMonth * 12);
  document.getElementById('costPerUnit').value = inputValues.totalCost / inputValues.numOfUnits;
  document.getElementById('GRM').value = inputValues.totalCost / inputValues.grossRevPerYear;
}

function calcGrossIncome() {
  setValues();
  inputsIntoNumbers(allInputs);
  document.getElementById('vacCost').value = (inputValues.vacancyRate / 100) * (inputValues.totalRentPerMonth * 12);
  document.getElementById('netRentalIncome').value = (inputValues.totalRentPerMonth * 12) - inputValues.vacCost;
  document.getElementById('grossIncomeInput').value = (inputValues.netRentalIncome + inputValues.otherIncome);
}

function calcTotalExpenses() {
  setValues();
  inputsIntoNumbers(allInputs);
  propMgmCalc = (inputValues.propertyMgmt / 100) * inputValues.netRentalIncome;
  totalExpensesVar = (inputValues.propertyTaxes + inputValues.insurance + propMgmCalc + inputValues.maintenanceRepairs + inputValues.advertising + inputValues.utilities + inputValues.otherExpenses1 + (inputValues.otherExpenses2 * 12) + (inputValues.otherExpenses3 * 12));
  document.getElementById('totalExpenses').value = totalExpensesVar;
  document.getElementById('netOI').value = (inputValues.grossIncomeInput - totalExpensesVar);
  document.getElementById('totalCashFlow').value = (inputValues.netOI - (inputValues.mortgagePayment * 12));
  document.getElementById('cashROI').value = (inputValues.totalRentPerMonth / inputValues.cashOutlay);
  document.getElementById('capRate').value = ((inputValues.netOI / inputValues.totalCost) * 100);
  document.getElementById('cashAvailable').value = inputValues.netOI;
}

function calcCashFlow() {
  setValues();
  inputsIntoNumbers(allInputs);
  document.getElementById('cashROI').value = ((inputValues.totalCashFlow / inputValues.cashOutlay) * 100);
  document.getElementById('totalReturn').value = inputValues.totalCashFlow + inputValues.equity + inputValues.appreciation;
  document.getElementById('totalROI').value = ((inputValues.totalCashFlow / inputValues.cashOutlay) * 100);
  document.getElementById('cashROI2').value = inputValues.cashROI;
  document.getElementById('totalROI2').value = inputValues.totalROI;
  document.getElementById('DSCR').value = (inputValues.netOI / (inputValues.mtg) * 100);
  document.getElementById('annualCashFlow').value = inputValues.totalCashFlow;
}


// ***********FORMATTING FUNCTIONS*********** //

function hideNaNs(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.includes("NaN") || inputs[i].value == "$0.00" || inputs[i].value == "0" || inputs[i].value.includes("Infinity")) {
      inputs[i].value = "";
    }
  }
}

function toFixed(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "" && !(inputs[i].value.includes("NaN"))) {
      inputs[i].value = Number(inputs[i].value).toFixed(2) + "%";
    }
  }
}

function inputsIntoNumbers(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.includes("$")) {
      inputs[i].value = accounting.unformat(inputs[i].value);
    }
    if (inputs[i].value.includes("%")) {
      inputs[i].value = Number(inputs[i].value.slice(0, -1));
    }
  }
}

function numbersIntoMoney(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (!(inputs[i].value.includes("$") || inputs[i].value == "" || inputs[i].value == "0")) {
      inputs[i].value = accounting.formatMoney(Number(inputs[i].value));
    }
  }
}


// ***********NAVIGATION FUNCTIONS*********** //

function showSummary() {
  for (let i = 0; i < cards.length; i++) {
    if (nextButton.innerHTML == "Show Summary") {
      cards[i].classList.remove("hide");
    }
  }
}

function goToPreviousCard() {
  for (let i = cards.length - 1; i >= 1; i--) {
    if (!(cards[i].classList.contains("hide"))) {
      cards[i].classList.add("hide");
      cards[i - 1].classList.remove("hide");
      return;
    }
  }
}

function goToNextCard() {
  for (let i = 0; i < cards.length - 1; i++) {
    if (!(cards[i].classList.contains("hide"))) {
      cards[i].classList.add("hide");
      cards[i + 1].classList.remove("hide");
      return;
    }
  }
}

function whichCardIsShowing() {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList.contains("hide")) {
      cardShowing[i] = false;
    } else {
      cardShowing[i] = true;
    }
  }
  if (cardShowing.indexOf(false) == "-1") {
    allCardsShowing = true;
  } else {
    allCardsShowing = false;
  }
}


function isSummary() {
  // hide all the cards except key values
  for (let i = 0; i < cards.length - 1; i++) {
    cards[i].classList.add("hide");
  }
  prevButton.classList.remove("hide");
  summaryButton.classList.remove("hide");
  prevButton.style.order = "1";
  resetButton.classList.add("hide");
}

// function autofocus() {
//   whichCardIsShowing();
//   allInputs.forEach(input => {
//     input.removeAttribute("autofocus");
//   })
//   let i = cardShowing.indexOf(true);
//   cards[i].querySelector('input').setAttribute("autofocus",  "");
// }


// ***********EVENT LISTENERS*********** //

container.addEventListener('keyup', (event) => {
  if (event.key !== "Enter") {
    setValues();
    sumTotalCost();
    cashOutlay();
    grossRev();
    calcGrossIncome();
    calcTotalExpenses();
    calcCashFlow();
    hideNaNs(allInputs);
    setInputValues();
  } else {
    inputsIntoNumbers(allInputs);
    numbersIntoMoney(moneyInputs);
    toFixed(fixedInputs);
    hideNaNs(allInputs);
  }
});

resetButton.addEventListener('click', () => {
  localStorage.clear();
  allInputs.forEach(function(input) {
    input.value = "";
  })
});

nextButton.addEventListener('click', () => {
  goToNextCard();
  prevButton.disabled = false;
  resetButton.classList.add("hide");
  whichCardIsShowing();
  if (cardShowing.indexOf(true) == 6) {
    nextButton.disabled = true;
    prevButton.classList.remove("hide");
    summaryButton.classList.remove("hide");
  }
  inputsIntoNumbers(allInputs);
  numbersIntoMoney(moneyInputs);
  toFixed(fixedInputs);
  hideNaNs(allInputs);
});

prevButton.addEventListener("click", () => {
  whichCardIsShowing();
  if (cardShowing.indexOf(true) == 6) {
    summaryButton.classList.add("hide");
    nextButton.disabled = false;
    goToPreviousCard();
  } else if (cardShowing.indexOf(true) == 5) {
    nextButton.disabled = false;
    goToPreviousCard();
  } else if (cardShowing.indexOf(true) == 1) {
    prevButton.disabled = true;
    goToPreviousCard();
  } else if (allCardsShowing) {
    isSummary();
  } else {
    goToPreviousCard();
  }
});

summaryButton.addEventListener('click', () => {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("hide");
  }
  document.getElementById('summary').classList.add("hide");
  prevButton.disabled = false;
  nextButton.disabled = true;
  resetButton.classList.remove("hide");
});



// ***********LOCAL STORAGE*********** //

let allInputValues = [];
let data = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

function setInputValues() {
  allInputValues = [];
  for (let i = 0; i < allInputs.length; i++) {
    allInputValues.push(allInputs[i].value);
    localStorage.setItem("items", JSON.stringify(allInputValues));
  }
}

function getLocalStorageData() {
  for (let i = 0; i < data.length; i++) {
    allInputs[i].value = data[i];
  }
  numbersIntoMoney(moneyInputs);
  toFixed(fixedInputs);
}

(function populateInputs() {
  if (localStorage.getItem("items")) {
    getLocalStorageData();
  }
})();
