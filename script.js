// 1. Basic math operators
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "Nice try! No dividing by zero!" : a / b;

// 2. Variables for calculator operation parts
let firstNum = '';
let secondNum = '';
let operator = '';
const displayElement = document.getElementById("display");

// 3. Operate function that calls the appropriate math function
function operate(numOne, operator, numTwo) {
    const a = parseFloat(numOne);
    const b = parseFloat(numTwo);
    
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            return numOne;
    }

    // Handle division by zero message
    if (typeof result === 'string') return result;
    
    // Round long decimals to prevent screen overflow
    return Number(Math.round(result + 'e10') + 'e-10').toString();
}

// Event listeners for number and operator buttons
const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') { 
            // Handle numbers and decimal point
            if (operator === '') {
                // Prevent multiple decimals
                if (value === '.' && firstNum.includes('.')) return;
                firstNum += value;
                displayElement.textContent = firstNum;
            } else {
                // Prevent multiple decimals
                if (value === '.' && secondNum.includes('.')) return;
                secondNum += value;
                displayElement.textContent = `${firstNum} ${operator} ${secondNum}`;
            }
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            // If we already have an operation waiting, solve it first
            if (firstNum && operator && secondNum) {
                const result = operate(firstNum, operator, secondNum);
                if (result === "Nice try! No dividing by zero!") {
                    displayElement.textContent = result;
                    firstNum = '';
                    secondNum = '';
                    operator = '';
                    return;
                }
                firstNum = result;
                secondNum = '';
            }
            
            // Only set operator if we have a first number
            if (firstNum) {
                operator = value;
                displayElement.textContent = `${firstNum} ${operator}`;
            }
        } else if (value === '=') {
            // Only calculate if we have all parts of the equation
            if (firstNum && operator && secondNum) {
                const result = operate(firstNum, operator, secondNum);
                displayElement.textContent = result;
                // If it's not an error message, set up for next calculation
                if (result !== "Nice try! No dividing by zero!") {
                    firstNum = result;
                } else {
                    firstNum = '';
                }
                operator = '';
                secondNum = '';
            }
        } else if (value.toLowerCase() === 'c') {
            // Clear everything
            firstNum = '';
            secondNum = '';
            operator = '';
            displayElement.textContent = '0';
        }
    });
});