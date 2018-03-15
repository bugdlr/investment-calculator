// (function() {

  let price;
  let improvements;
  let closingCosts;
  let result;
  let downpayment;
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

  const costAssumptions = document.getElementById("costAssumptions");
  const financingAssumptions = document.getElementById("financingAssumptions");
  const revenueAssumptions = document.getElementById("revenueAssumptions");
  const revenues = document.getElementById("revenues");
  const expenses = document.getElementById("expenses");
  const mtg = document.getElementById("mtg");
  const cashFlow = document.getElementById("cashFlow");


  // functions
  function setValues() {
    price = Number(document.getElementById("price").value);
    improvements = Number(document.getElementById("improvements").value);
    closingCosts = Number(document.getElementById("closingCosts").value);
    downpayment = Number(document.getElementById("dwnpmtAmt").value);
    mortgagePayment = Number(document.getElementById("mortgagePayment").value);
    cashOutlayVar = Number(document.getElementById("cashOutlay").value)
    totalRentPerMonth = Number(document.getElementById("totalRentPerMonth").value);
    otherRevPerMonth = Number(document.getElementById("otherRevPerMonth").value);
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
    totalCashFlowVar = Number(document.getElementById("totalCashFlow").value);
  }

  function sumValue() {
    setValues();
    result = price + improvements + closingCosts;
    document.getElementById('totalCost').innerHTML = "Total Costs = $" + result;
  }

  function cashOutlay() {
    setValues();
    result = improvements + closingCosts + downpayment;
    document.getElementById('cashOutlay').value = result;
    document.getElementById('mtg').value = (mortgagePayment * 12);
    // add downpayment, finance amount, and mortgage payment calculations
  }

  function grossRev() {
    setValues();
    result = totalRentPerMonth + otherRevPerMonth;
    document.getElementById('grossRevPerMonth').innerHTML = "Gross Revenue/Month = $" + result;
    document.getElementById('grossRevPerYear').innerHTML = "Gross Revenue/Year = $" + (result * 12);
    document.getElementById('rentalIncome').value = (totalRentPerMonth * 12);
    document.getElementById('otherIncome').value = (otherRevPerMonth * 12);
  }

  function vacCost() {
    setValues();
    document.getElementById('vacCost').value = (vacancyRate/100) * (totalRentPerMonth * 12);
  }

  function netRentIncome() {
    setValues();
    document.getElementById('netRentalIncome').value = (totalRentPerMonth * 12) - vacancyCost;
  }

  function grossIncomeFun() {
    setValues();
    document.getElementById('grossIncomeInput').value = (netRentalIncome + otherIncome);
  }

  function totalExpensesFun() {
    setValues();
    totalExpensesVar = (propertyTaxes + insurance + propMgmCalc + mtRepairs + advertising + utilities + other1 + (other2 * 12) + (other3 *12));
    document.getElementById('totalExpenses').innerHTML = "Total Expenses = $" + totalExpensesVar;
    document.getElementById('netOI').value = (grossIncomeVar - totalExpensesVar);
    document.getElementById('cashAvailable').value = netOI;
    document.getElementById('totalCashFlow').value = (netOI - (mortgagePayment * 12));
    // document.getElementById('cashROI').value = (totalCashFlowVar/cashOutlayVar);
    // cashROI is wrong
    // cashAvailable and netOI should be the same but they aren't
  }

  function propMgmtCal() {
    setValues();
    propMgmCalc = (propertyMgmt/100) * netRentalIncome;
  }

  function cashFlowFun() {
    setValues();
    document.getElementById('cashROI').value = ((totalCashFlowVar/cashOutlayVar) * 100);
  }


  // event listeners
  costAssumptions.addEventListener('keyup', function (e) {
    e.preventDefault();
    sumValue();
  });

  financingAssumptions.addEventListener('keyup', function (e) {
    e.preventDefault();
    cashOutlay();
  });

  revenueAssumptions.addEventListener('keyup', function (e) {
    e.preventDefault();
    grossRev();
    vacCost();
    netRentIncome();
    grossIncomeFun();
  });

  revenues.addEventListener('keyup', function (e) {
    e.preventDefault();
    grossRev();
    vacCost();
    grossIncomeFun();
  });

  expenses.addEventListener('keyup', function (e) {
    e.preventDefault();
    propMgmtCal();
    totalExpensesFun();
    cashFlowFun();
  });

// })();
