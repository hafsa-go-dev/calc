let screenOutput = "";
let screen = document.getElementById("screen");
let clear = document.getElementById("clear");
let enter = document.getElementById("enter");
let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let four = document.getElementById("4");
let five = document.getElementById("5");
let six = document.getElementById("6");
let seven = document.getElementById("7");
let eight = document.getElementById("8");
let nine = document.getElementById("9");
let zero = document.getElementById("0");
let add = document.getElementById("add");
let point = document.getElementById("point");
let exponent = document.getElementById("exponent");
let subtract = document.getElementById("subtract");
let divide = document.getElementById("divide");
let multiply = document.getElementById("multiply");


let currentOperation = null;
let firstOperand = null;
let secondOperand = null;
let waitingForSecondOperand = false;

function updateScreen(value) {
    screen.innerText = value;
}

function handleNumberInput(number) {
    if (waitingForSecondOperand) {
        screenOutput = number;
        waitingForSecondOperand = false;
    } else {
        screenOutput = screenOutput === "" ? number : screenOutput + number;
    }
    updateScreen(screenOutput);
}

function handleOperatorInput(operator) {
    if (firstOperand === null) {
        firstOperand = parseFloat(screenOutput);
    } else if (currentOperation) {
        secondOperand = parseFloat(screenOutput);
        firstOperand = operate(currentOperation, firstOperand, secondOperand);
        updateScreen(firstOperand);
    }
    currentOperation = operator;
    waitingForSecondOperand = true;
}

function handleDecimal() {
    if (!screenOutput.includes('.')) {
        screenOutput += '.';
        updateScreen(screenOutput);
    }
}

function handleClear() {
    screenOutput = "";
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    waitingForSecondOperand = false;
    updateScreen(screenOutput);
}

function operate(operation, a, b) {
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            return b === 0 ? "undefined" : a / b;
        case 'exponent':
            return Math.pow(a, b);
        default:
            return b;
    }
}

function handleBackspace() {
    if (screenOutput.length > 1) {
        screenOutput = screenOutput.slice(0, -1);
    } else {
        screenOutput = "";
    }
    updateScreen(screenOutput);
}

function handleEnter() {
    if (currentOperation && firstOperand !== null) {
        secondOperand = parseFloat(screenOutput);
        screenOutput = operate(currentOperation, firstOperand, secondOperand).toString();
        updateScreen(screenOutput);
        firstOperand = null;
        secondOperand = null;
        currentOperation = null;
    }
}

one.addEventListener("click", () => handleNumberInput("1"));
two.addEventListener("click", () => handleNumberInput("2"));
three.addEventListener("click", () => handleNumberInput("3"));
four.addEventListener("click", () => handleNumberInput("4"));
five.addEventListener("click", () => handleNumberInput("5"));
six.addEventListener("click", () => handleNumberInput("6"));
seven.addEventListener("click", () => handleNumberInput("7"));
eight.addEventListener("click", () => handleNumberInput("8"));
nine.addEventListener("click", () => handleNumberInput("9"));
zero.addEventListener("click", () => handleNumberInput("0"));

add.addEventListener("click", () => handleOperatorInput("add"));
subtract.addEventListener("click", () => handleOperatorInput("subtract"));
multiply.addEventListener("click", () => handleOperatorInput("multiply"));
divide.addEventListener("click", () => handleOperatorInput("divide"));
exponent.addEventListener("click", () => handleOperatorInput("exponent"));

point.addEventListener("click", handleDecimal);
clear.addEventListener("click", handleClear);
enter.addEventListener("click", handleEnter);

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        handleNumberInput(key);
    } else if (key === '+') {
        handleOperatorInput("add");
    } else if (key === '-') {
        handleOperatorInput("subtract");
    } else if (key === '*') {
        handleOperatorInput("multiply");
    } else if (key === '/') {
        handleOperatorInput("divide");
    } else if (key === '^') {
        handleOperatorInput("exponent");
    } else if (key === '.') {
        handleDecimal();
    } else if (key === 'Enter') {
        handleEnter();
    } else if (key === 'Escape') {
        handleClear();
    } else if (key === 'Backspace') {
        handleBackspace();
    }
});

updateScreen(screenOutput);