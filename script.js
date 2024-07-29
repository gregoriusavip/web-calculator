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

const decimalButton = document.querySelector("#decimal");

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
    handleEvaluateEvent();
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

function handleDecimalEvent() {
  display.textContent += ".";
  decimalButton.disabled = true;
}

function handleClearEvent() {
  leftNum = 0;
  rightNum = curOperator = null;
  display.textContent = "0";
  evalOp = false;
}

function handleBackspaceEvent() {
  const curText = display.textContent;
  if (curText.length > 1) {
    display.textContent = curText.substring(0, curText.length - 1);
  } else {
    display.textContent = 0;
  }
  if (curOperator === null) {
    leftNum = display.textContent;
  } else {
    rightNum = display.textContent;
  }
}

buttons.addEventListener("click", (event) => {
  if (event.target.className === "number") {
    handleNumberEvent(event.target);
  } else if (event.target.id === "decimal") {
    handleDecimalEvent();
  } else if (event.target.className === "operator") {
    handleOperatorEvent(event.target);
  } else if (event.target.id === "evaluate") {
    handleEvaluateEvent();
  } else if (event.target.id === "undo") {
    handleBackspaceEvent();
  } else if (event.target.id === "clear") {
    handleClearEvent();
  }
  if (display.textContent.includes(".")) {
    decimalButton.disabled = true;
  } else {
    decimalButton.disabled = false;
  }
});

const NUMBER_KEYS = new Map()
  .set("1", "one")
  .set("2", "two")
  .set("3", "three")
  .set("4", "four")
  .set("5", "five")
  .set("6", "six")
  .set("7", "seven")
  .set("8", "eight")
  .set("9", "nine")
  .set("0", "zero");

const keyPressed = {};

document.addEventListener("keydown", (event) => {
  if (!event.repeat) {
    keyPressed[event.key] = true;
  }
  switch (true) {
    case NUMBER_KEYS.has(event.key):
      document.querySelector(`#${NUMBER_KEYS.get(event.key)}`).click();
      break;
    case event.key === "Enter":
      document.querySelector("#evaluate").click();
      break;
    case event.key === ".":
      document.querySelector("#decimal").click();
      break;
    case event.key === "*":
      document.querySelector("#multiply").click();
      break;
    case event.key === "-":
      document.querySelector("#subtract").click();
      break;
    case event.key === "+":
      document.querySelector("#add").click();
      break;
    case event.key === "/":
      document.querySelector("#divide").click();
      break;
    case event.key === "Backspace" && keyPressed["Shift"]:
      document.querySelector("#clear").click();
      break;
    case event.key === "Backspace":
      document.querySelector("#undo").click();
      break;
  }
});

document.addEventListener("keyup", (event) => {
  if (!event.repeat) delete keyPressed[event.key];
});
