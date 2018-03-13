(function() {

  let price;
  let improvements;
  let closingCosts;
  let result;
  let downpayment;
  let totalRentPerMonth;
  let otherRentPerMonth;

  const costAssumptions = document.getElementById("costAssumptions");
  const dwnpmtAmt = document.getElementById("dwnpmtAmt");
  const revenueAssumptions = document.getElementById("revenueAssumptions");

  // functions
  function setValues() {
    price = Number(document.getElementById("price").value);
    improvements = Number(document.getElementById("improvements").value);
    closingCosts = Number(document.getElementById("closingCosts").value);
    downpayment = Number(document.getElementById("dwnpmtAmt").value);
    totalRentPerMonth = Number(document.getElementById("totalRentPerMonth").value);
    otherRentPerMonth = Number(document.getElementById("otherRentPerMonth").value);
  }

  function sumValue() {
    setValues();
    result = price + improvements + closingCosts;
    document.getElementById('totalCost').innerHTML = "Total Costs = $" + result;
  }

  function cashOutlay() {
    setValues();
    result = improvements + closingCosts + downpayment;
    document.getElementById('cashOutlay').innerHTML = "Cash Outlay = $" + result;
  }

  function grossRev() {
    setValues();
    result = totalRentPerMonth + otherRentPerMonth;
    document.getElementById('grossRevPerMonth').innerHTML = "Gross Revenue/Month = $" + result;
    document.getElementById('grossRevPerYear').innerHTML = "Gross Revenue/Year = $" + (result * 12);
  }


  // event listeners
  costAssumptions.addEventListener('keyup', function (e) {
    e.preventDefault();
    sumValue();
  });

  dwnpmtAmt.addEventListener('keyup', function (e) {
    e.preventDefault();
    cashOutlay();
  });

  revenueAssumptions.addEventListener('keyup', function (e) {
    e.preventDefault();
    grossRev();
  });

})();
