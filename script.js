// Arithmetic Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let leftNum, rightNum, curOperator;
// default to null. reset back to null after operate.
rightNum = curOperator = null;

leftNum = 0; // default and initial value is 0.

let evalOp = false; // default and initial value is false

const OPERATORS = new Map()
  .set("+", add)
  .set("-", subtract)
  .set("*", multiply)
  .set("/", divide);

function operate(leftNum, operator, rightNum) {
  if (typeof leftNum !== typeof rightNum || typeof leftNum !== "number") {
    return "ERROR, invalid expression";
  }
  if (OPERATORS.has(operator)) {
    return OPERATORS.get(operator)(leftNum, rightNum);
  }
  return "ERROR, false operator";
}

//DOM Manipulation
const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

function handleNumberEvent(target) {
  if (target.textContent === "0" && display.textContent === "0") {
    if (curOperator !== null) {
      rightNum = display.textContent;
    }
    return;
  }
  if (display.textContent === "0" || evalOp === true) {
    display.textContent = target.textContent;
    evalOp = false;
  } else {
    display.textContent += target.textContent;
  }
  if (curOperator === null) {
    leftNum = display.textContent;
  } else {
    if (rightNum === null) {
      display.textContent = target.textContent;
    }
    rightNum = display.textContent;
  }
}

function handleOperatorEvent(target) {
  if (rightNum !== null) {
    display.textContent =
      Math.round(
        (operate(parseFloat(leftNum), curOperator, parseFloat(rightNum)) +
          Number.EPSILON) *
          100
      ) / 100;
    leftNum = display.textContent;
    rightNum = null;
  }
  curOperator = target.textContent;
}

function handleEvaluateEvent() {
  if (rightNum !== null) {
    display.textContent =
      Math.round(
        (operate(parseFloat(leftNum), curOperator, parseFloat(rightNum)) +
          Number.EPSILON) *
          100
      ) / 100;
    rightNum = null;
  }
  curOperator = null;
  leftNum = display.textContent;
  evalOp = true;
}

function handleClearEvent() {
  leftNum = 0;
  rightNum = curOperator = null;
  display.textContent = "0";
  evalOp = false;
}

buttons.addEventListener("click", (event) => {
  if (event.target.className === "number") {
    handleNumberEvent(event.target);
  } else if (event.target.className === "operator") {
    handleOperatorEvent(event.target);
  } else if (event.target.id === "evaluate") {
    handleEvaluateEvent();
  } else if (event.target.id === "clear") {
    handleClearEvent();
  }
});
