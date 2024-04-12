const grossIncome = document.getElementById("grossIncome");
const extraIncome = document.getElementById("extraIncome");
const age = document.getElementById("age");
const deduction = document.getElementById("deduction");
const calculate = document.getElementById("calculate");
const modal = document.getElementById("modal");
const errorMessage = document.getElementById("error-message");

function validateInput(input, index) {
  const value = input.value;
  if (!isNaN(value) && value !== "" && value >= 0) {
    document
      .getElementsByClassName("error-class")
      [index].classList.remove("show");
    return value;
  } else {
    document.getElementsByClassName("error-class")[index].classList.add("show");
    return null;
  }
}

function validateAge(input, index) {
  const value = input.value;
  if (value !== "") {
    document
      .getElementsByClassName("error-class")
      [index].classList.remove("show");
    return value;
  } else {
    document.getElementsByClassName("error-class")[index].classList.add("show");
  }
}

grossIncome.addEventListener("input", function () {
  validateInput(grossIncome, 0);
});

extraIncome.addEventListener("input", function () {
  validateInput(extraIncome, 1);
});

deduction.addEventListener("input", function () {
  validateInput(deduction, 3);
});

age.addEventListener("change", function () {
  validateAge(age, 2);
});

function calculateTaxPercentage(age) {
  if (age === "< 40") {
    return 0.3;
  } else if (age === "≥ 40 & < 60") {
    return 0.4;
  } else if (age === "≥ 60") {
    return 0.1;
  }
}

function calculateTax(grossIncome, extraIncome, deduction, age) {
  grossIncome = parseFloat(grossIncome);
  extraIncome = parseFloat(extraIncome);
  deduction = parseFloat(deduction);
  let rate = calculateTaxPercentage(age);
  let income = grossIncome + extraIncome - deduction;
  if (income <= 800000) {
    return grossIncome;
  } else {
    let totalTax = rate * (income - 800000);
    return income - totalTax;
  }
}

calculate.addEventListener("click", function () {
  const validatedGrossIncome = validateInput(grossIncome, 0);
  const validatedExtraIncome = validateInput(extraIncome, 1);
  const validatedAge = validateAge(age, 2);
  const validatedDeduction = validateInput(deduction, 3);

  if (
    validatedGrossIncome &&
    validatedExtraIncome &&
    validatedDeduction &&
    validatedAge
  ) {
    const totalIncome = calculateTax(
      validatedGrossIncome,
      validatedExtraIncome,
      validatedDeduction,
      validatedAge
    );

    document.getElementById("income").innerHTML = totalIncome.toLocaleString();
    errorMessage.style.display = "none";
    modal.classList.add("flex");
  } else {
    errorMessage.style.display = "block";
    console.log("Please fill all required fields with valid inputs.");
  }
});

document.getElementById("modal-close").addEventListener("click", function () {
  modal.classList.remove("flex");
  grossIncome.value = "";
  extraIncome.value = "";
  deduction.value = "";
  age.value = "";
});

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
});
