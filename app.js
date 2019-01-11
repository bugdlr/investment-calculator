// (function() {

// variables
let price;
let improvements;
let closingCosts;
let result;
let dow;
let mortgagePayment;
let cashOutlayVar;
let totalRentPerMonth;
let otherRevPerMonth;
let vacancyRate;
let vacancyCost;
let netRentalIncome;
let otherIncome;
let propertyTaxes;
let insurance;
let propertyMgmt;
let mtRepairs;
let advertising;
let utilities;
let other1;
let other2;
let other3;
let propMgmtCalc;
let grossIncomeVar;
let totalExpensesVar;
let netOI;
let equity;
let appreciation;
let capRate;
let cashROIVar;
let totalReturnVar;
let totalROIVar;
let grm;
let annualCashFlow;
let inputs = [];
let format = "numbers";

const costAssumptions = document.getElementById("costAssumptions");
const financingAssumptions = document.getElementById("financingAssumptions");
const revenueAssumptions = document.getElementById("revenueAssumptions");
const revenues = document.getElementById("revenues");
const expenses = document.getElementById("expenses");
const mtg = document.getElementById("mtg");
const cashFlow = document.getElementById("cashFlow");
const mortgageYrs = document.getElementById("mortgageYrs");
const container = document.querySelector(".container");
const allInputs = Array.from(document.getElementsByTagName('input'));
const moneyInputs = Array.from(document.querySelectorAll('.money'));
const calculationInputs = Array.from(document.getElementsByClassName("calculation"));
const fixedInputs = Array.from(document.getElementsByClassName("fixed"));
const options = {
  style: "currency",
  currency: "USD"
};

// functions

function setValues() {
  price = Number(document.getElementById("price").value);
  improvements = Number(document.getElementById("improvements").value);
  closingCosts = Number(document.getElementById("closingCosts").value);
  totalCost = Number(document.getElementById("totalCost").value);
  downpaymentPercent = Number(document.getElementById("downpayment").value);
  financeAmount = Number(document.getElementById("FinAmt").value);
  downpayment = Number(document.getElementById("dwnpmtAmt").value);
  interestRate = Number(document.getElementById("interestRate").value);
  mortgageYearsVar = Number(document.getElementById("mortgageYrs").value);
  mortgagePayment = Number(document.getElementById("mortgagePayment").value);
  cashOutlayVar = Number(document.getElementById("cashOutlay").value);
  numOfUnits = Number(document.getElementById("numOfUnits").value);
  totalRentPerMonth = Number(document.getElementById("totalRentPerMonth").value);
  otherRevPerMonth = Number(document.getElementById("otherRevPerMonth").value);
  grossRevPerMonth = Number(document.getElementById("grossRevPerMonth").value);
  grossRevPerYear = Number(document.getElementById("grossRevPerYear").value);
  vacancyRate = Number(document.getElementById("vacancyRate").value);
  vacancyCost = Number(document.getElementById("vacCost").value);
  netRentalIncome = Number(document.getElementById("netRentalIncome").value);
  otherIncome = Number(document.getElementById("otherIncome").value);
  propertyTaxes = Number(document.getElementById("propertyTaxes").value);
  insurance = Number(document.getElementById("insurance").value);
  propertyMgmt = Number(document.getElementById("propertyMgmt").value);
  mtRepairs = Number(document.getElementById("maintenanceRepairs").value);
  advertising = Number(document.getElementById("advertising").value);
  utilities = Number(document.getElementById("utilities").value);
  other1 = Number(document.getElementById("otherExpenses1").value);
  other2 = Number(document.getElementById("otherExpenses2").value);
  other3 = Number(document.getElementById("otherExpenses3").value);
  grossIncomeVar = Number(document.getElementById("grossIncomeInput").value);
  totalExpensesVar = Number(document.getElementById("totalExpenses").value);
  netOI = Number(document.getElementById("netOI").value);
  mtgVar = Number(document.getElementById("mtg").value);
  totalCashFlowVar = Number(document.getElementById("totalCashFlow").value);
  equity = Number(document.getElementById("equity").value);
  appreciation = Number(document.getElementById("appreciation").value);
  cashROIVar = Number(document.getElementById("cashROI").value);
  totalReturnVar = Number(document.getElementById("totalReturn").value);
  totalROIVar = Number(document.getElementById("totalROI").value);
  capRate = Number(document.getElementById("capRate").value);
  grm = Number(document.getElementById("GRM").value);
  dscr = Number(document.getElementById("DSCR").value);
  annualCashFlow = Number(document.getElementById("annualCashFlow").value);
}


function sumTotalCost() {
  result = price + improvements + closingCosts;
  document.getElementById('totalCost').value = result;
}

function cashOutlay() {
  document.getElementById('dwnpmtAmt').value = (downpaymentPercent / 100) * price;
  document.getElementById('FinAmt').value = price - downpayment;
  result = improvements + closingCosts + downpayment;
  document.getElementById('cashOutlay').value = result;
  document.getElementById('mtg').value = mortgagePayment * 12;
  rate = (interestRate / 100) / 12;
  n = mortgageYearsVar * 12;
  let numerator = rate * ((1 + rate) ** n);
  let denominator = ((1 + rate) ** n) - 1;
  document.getElementById('mortgagePayment').value = financeAmount * (numerator / denominator);
}

function grossRev() {
  result = totalRentPerMonth + otherRevPerMonth;
  document.getElementById('grossRevPerMonth').value = result;
  document.getElementById('grossRevPerYear').value = (result * 12);
  document.getElementById('rentalIncome').value = (totalRentPerMonth * 12);
  document.getElementById('otherIncome').value = (otherRevPerMonth * 12);
  document.getElementById('costPerUnit').value = totalCost / numOfUnits;
  document.getElementById('GRM').value = totalCost / grossRevPerYear;
}

function calcGrossIncome() {
  document.getElementById('vacCost').value = (vacancyRate / 100) * (totalRentPerMonth * 12);
  document.getElementById('netRentalIncome').value = (totalRentPerMonth * 12) - vacancyCost;
  document.getElementById('grossIncomeInput').value = (netRentalIncome + otherIncome);
}allInputs

function calcTotalExpenses() {
  propMgmCalc = (propertyMgmt / 100) * netRentalIncome;
  totalExpensesVar = (propertyTaxes + insurance + propMgmCalc + mtRepairs + advertising + utilities + other1 + (other2 * 12) + (other3 * 12));
  document.getElementById('totalExpenses').value = totalExpensesVar;
  document.getElementById('netOI').value = (grossIncomeVar - totalExpensesVar);
  document.getElementById('totalCashFlow').value = (netOI - (mortgagePayment * 12));
  document.getElementById('cashROI').value = (totalRentPerMonth / cashOutlayVar);
  document.getElementById('capRate').value = ((netOI / totalCost) * 100);
  document.getElementById('cashAvailable').value = netOI;
}

function calcCashFlow() {
  document.getElementById('cashROI').value = ((totalCashFlowVar / cashOutlayVar) * 100);
  document.getElementById('totalReturn').value = totalCashFlowVar + equity + appreciation;
  document.getElementById('totalROI').value = ((totalReturnVar / cashOutlayVar) * 100);
  document.getElementById('cashROI2').value = cashROIVar;
  document.getElementById('totalROI2').value = totalROIVar;
  document.getElementById('DSCR').value = (netOI / (mtgVar) * 100);
  document.getElementById('annualCashFlow').value = totalCashFlowVar;
}

function hideNaNs() {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "NaN") {
      inputs[i].value = "";
    }
  }
}

function toFixed(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value) {
      inputs[i].value = Number(inputs[i].value).toFixed(2) + "%";
    }
  }
}

function moneyIntoNumbers (inputs) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = accounting.unformat(inputs[i].value);
    // let array = inputs[i].value.split("");
    // let dollars = array.splice(0, array.length - 3).join("");
    // let cents = array.splice(-3, 3).join("");
    // dollars = dollars.replace(/\D/g,'');
    // inputs[i].value = dollars + cents;
  }
  format = "numbers";
}

function numbersIntoMoney(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if(inputs[i].value !== "NaN" && inputs[i].value !== "Infinity") {
      inputs[i].value = accounting.formatMoney(Number(inputs[i].value));
      // inputs[i].value = Number(inputs[i].value).toLocaleString("en-US", options);
    } format = "money";
  }
}

// })();


/**
 * TO DO
    local storage
    reset button
    format money
    add css grid for responsiveness
 */


// event listener
container.addEventListener('keyup', () => {
  moneyIntoNumbers(moneyInputs);
  setValues();
  sumTotalCost();
  cashOutlay();
  grossRev();
  calcGrossIncome();
  calcTotalExpenses();
  calcCashFlow();
});

container.addEventListener('keyup', function(event) {
  if(event.key == "Enter") {
    numbersIntoMoney(moneyInputs);
    hideNaNs(allInputs);
    toFixed(fixedInputs);
  }
})
