window.addEventListener("load", startCalculator);

function startCalculator() {
  const calculator = document.querySelector(".calculator");
  const result = document.querySelector(".result");
  let displayValue = 0;
  let lastOperation;

  result.innerText = displayValue;

  calculator.addEventListener("click", function (event) {
    if (event.target.className != "calculator") {
      const buttonInput = event.target.innerText;
      const parsedInput = parseInt(buttonInput);

      switch (buttonInput) {
        case "C":
          if (displayValue === 0) {
            lastOperation = undefined;
          }
          clear();
          break;
        case "←":
          delLastDigit();
          break;
        case "÷":
          runOperation(divide);
          break;
        case "×":
          runOperation(multiply);
          break;
        case "-":
          runOperation(substract);
          break;
        case "+":
          runOperation(sum);
          break;
        case "=":
          equal();
          break;
        default:
          if (displayValue === 0) {
            displayValue = parsedInput;
          } else {
            displayValue += buttonInput;
          }
      }

      display(displayValue);
    }
  });

  function display(value) {
    result.innerText = value;
  }

  function clear() {
    displayValue = 0;
    display(displayValue);
  }

  function delLastDigit() {
    let str = displayValue.toString();
    if (str.length <= 1) {
      displayValue = 0;
    } else {
      displayValue = parseInt(str.substring(0, str.length - 1));
    }
  }

  function equal() {
    displayValue = lastOperation(displayValue);
  }

  function runOperation(operation) {
    lastOperation = operation(displayValue);
    clear();
  }

  function sum(a, b) {
    return (b) => a + b;
  }

  function substract(a, b) {
    return (b) => a - b;
  }

  function divide(a, b) {
    return (b) => Math.floor(a / b);
  }

  function multiply(a, b) {
    return (b) => a * b;
  }
}
