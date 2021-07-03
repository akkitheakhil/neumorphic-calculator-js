import Calculator from './app/calculator.js';

console.log('App Running...');

const output = document.getElementById("output"); // output 
const history = document.getElementById("history"); // history
const operators = document.querySelectorAll(".operator"); // all operators buttons
const numbers = document.querySelectorAll(".number") // all numbers
const clear = document.querySelector('.clear'); // clear button
const backspace = document.querySelector('.backspace'); // backspace button
const result = document.querySelector('.result'); // '=' result button

const calculator = new Calculator(history, output);

clear.addEventListener('click', () => {
    calculator.clear();
});

numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.handleNumberButton(number.id);
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        calculator.handleOperatorButton(operator.id);
    });
});

result.addEventListener('click', () => {
    calculator.handleResult();
})

backspace.addEventListener('click', () => {
    calculator.handleBackspace();
})