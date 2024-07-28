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

buttons.addEventListener("click", (event) => {
  if (event.target.className === "number") {
    if (event.target.textContent === "0" && display.textContent === "0") {
      if (curOperator !== null) {
        rightNum = display.textContent;
      }
      return;
    }
    if (display.textContent === "0" || evalOp === true) {
      display.textContent = event.target.textContent;
      evalOp = false;
    } else {
      display.textContent += event.target.textContent;
    }
    if (curOperator === null) {
      leftNum = display.textContent;
    } else {
      if (rightNum === null) {
        display.textContent = event.target.textContent;
      }
      rightNum = display.textContent;
    }
  } else if (event.target.className === "operator") {
    if (rightNum !== null) {
      display.textContent = operate(
        parseFloat(leftNum),
        curOperator,
        parseFloat(rightNum)
      );
      leftNum = display.textContent;
      rightNum = null;
    }
    curOperator = event.target.textContent;
  } else if (event.target.id === "evaluate") {
    if (rightNum !== null) {
      display.textContent = operate(
        parseFloat(leftNum),
        curOperator,
        parseFloat(rightNum)
      );
      rightNum = null;
    }
    curOperator = null;
    leftNum = display.textContent;
    evalOp = true;
  } else if (event.target.id === "clear") {
    leftNum = 0;
    rightNum = curOperator = null;
    display.textContent = 0;
    evalOp = false;
  }
});
