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
  let equity;
  let appreciation;
  let capRate;
  let cashROIVar;
  let totalReturnVar;
  let totalROIVar;
  let grm;

  const costAssumptions = document.getElementById("costAssumptions");
  const financingAssumptions = document.getElementById("financingAssumptions");
  const revenueAssumptions = document.getElementById("revenueAssumptions");
  const revenues = document.getElementById("revenues");
  const expenses = document.getElementById("expenses");
  const mtg = document.getElementById("mtg");
  const cashFlow = document.getElementById("cashFlow");
  const mortgageYrs = document.getElementById("mortgageYrs");


  // functions
  function setValues() {
    price = Number(document.getElementById("price").value);
    improvements = Number(document.getElementById("improvements").value);
    closingCosts = Number(document.getElementById("closingCosts").value);
    totalCost = Number(document.getElementById("totalCost").value)
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
    totalCashFlowVar = Number(document.getElementById("totalCashFlow").value);
    equity = Number(document.getElementById("equity").value);
    appreciation = Number(document.getElementById("appreciation").value);
    cashROIVar = Number(document.getElementById("cashROI").value);
    totalReturnVar = Number(document.getElementById("totalReturn").value);
    totalROIVar = Number(document.getElementById("totalROI").value);
    capRate = Number(document.getElementById("capRate").value);
    grm = Number(document.getElementById("GRM").value);
  }

  function sumValue() {
    setValues();
    result = price + improvements + closingCosts;
    document.getElementById('totalCost').value = result;
  }

  function financingCalc() {
    setValues();
    document.getElementById('dwnpmtAmt').value = (downpaymentPercent/100) * price;
    document.getElementById('FinAmt').value = price - downpayment;
  }

  function cashOutlay() {
    setValues();
    result = improvements + closingCosts + downpayment;
    document.getElementById('cashOutlay').value = result;
    document.getElementById('mtg').value = mortgagePayment * 12;
    rate = (interestRate/100) / 12;
    n = mortgageYearsVar * 12;
    let numerator = rate * ((1 + rate) ** n);
    let denominator = ((1 + rate) ** n) - 1;
    document.getElementById('mortgagePayment').value = financeAmount * (numerator / denominator);
  }

  function grossRev() {
    setValues();
    result = totalRentPerMonth + otherRevPerMonth;
    document.getElementById('grossRevPerMonth').value = result;
    document.getElementById('grossRevPerYear').value = (result * 12);
    document.getElementById('rentalIncome').value = (totalRentPerMonth * 12);
    document.getElementById('otherIncome').value = (otherRevPerMonth * 12);
    document.getElementById('costPerUnit').value = totalCost / numOfUnits;
    document.getElementById('GRM').value = totalCost / grossRevPerYear;
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

  function propMgmtCal() {
    setValues();
    propMgmCalc = (propertyMgmt/100) * netRentalIncome;
  }

  function totalExpensesFun() {
    setValues();
    totalExpensesVar = (propertyTaxes + insurance + propMgmCalc + mtRepairs + advertising + utilities + other1 + (other2 * 12) + (other3 *12));
    document.getElementById('totalExpenses').innerHTML = "Total Expenses = $" + totalExpensesVar;
    document.getElementById('netOI').value = (grossIncomeVar - totalExpensesVar);
    document.getElementById('cashAvailable').value = netOI;
    document.getElementById('totalCashFlow').value = (netOI - (mortgagePayment * 12));
    document.getElementById('cashROI').value = (totalRentPerMonth/cashOutlayVar);
    document.getElementById('capRate').value = ((netOI / totalCost) * 100);
  }

  function cashFlowFun() {
    setValues();
    document.getElementById('cashROI').value = ((totalCashFlowVar/cashOutlayVar) * 100);
    document.getElementById('totalReturn').value = totalCashFlowVar + equity + appreciation;
    document.getElementById('totalROI').value = ((totalReturnVar/cashOutlayVar) * 100);
    document.getElementById('cashROI2').value = cashROIVar;
    document.getElementById('totalROI2').value = totalROIVar;
  }


  // event listeners
  costAssumptions.addEventListener('keyup', function (e) {
    e.preventDefault();
    sumValue();
  });

  financingAssumptions.addEventListener('keyup', function (e) {
    e.preventDefault();
    financingCalc();
    // cashOutlay();
  });

  mortgageYrs.addEventListener('keyup', function (e) {
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

  cashFlow.addEventListener('keyup', function (e) {
    e.preventDefault();
    cashFlowFun();
    // totalROI is not updating in cashFlow, only in expenses
  });

// })();
