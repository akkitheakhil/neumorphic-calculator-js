export default class Calculator {

    constructor(history, output) {
        this.historyDisplay = history;
        this.resultDisplay = output;
        this.history = [];
    }

    clear() {
        this.clearOutputDisplay();
        this.clearHistory();
    }

    clearOutputDisplay() {
        this.resultDisplay.innerHTML = "";
    }

    clearHistory() {
        this.history = [];
        this.historyDisplay.innerHTML = "";
    }

    addValueToHistory(value) {
        this.history.push({ type: 'number', value: value });
    }

    addOperatorToHistory(operator) {
        this.history.push({ type: 'operator', value: operator });
        this.setHistoryDisplayData();
    }

    setHistoryDisplayData() {
        const displayData = this.history.map(item => item.value).join(" ");
        this.clearOutputDisplay();
        this.historyDisplay.innerHTML = displayData;
    }

    handleNumberButton(value) {
        this.resultDisplay.innerHTML += value;
    }

    handleOperatorButton(operator) {
        const val = this.resultDisplay.innerHTML;
        const historyLen = this.history.length;
        
        if (val === "" && !historyLen) {
            return;
        }

        const lastEle = this.history[historyLen - 1];
        
        if (lastEle?.type === "operator") {
            this.history[historyLen - 1].value = operator;
            this.setHistoryDisplayData();
            return;
        }

        this.addValueToHistory(val);
        this.addOperatorToHistory(operator);
    }

    handleResult() {
        const val = this.resultDisplay.innerHTML;
        this.addValueToHistory(val);

        let result = 0;
        let operator = "";

        this.history.forEach(item => {
            if (item.type === 'number') {
                result = this.calculate(result, item.value, operator);
            } else {
                operator = item.value;
            }
        });

        this.resultDisplay.innerHTML = this.formatResult(result);
        this.clearHistory();
    }


    calculate(result, value, operator) {

        if (result === 0 && value !== "" && operator === "") {
            return value;
        }

        switch (operator) {
            case "+":
                return this.parseNumber(result) + this.parseNumber(value);
            case "-":
                return this.parseNumber(result) - this.parseNumber(value);
            case "/":
                return this.parseNumber(result) / this.parseNumber(value);
            case "*":
                return this.parseNumber(result) * this.parseNumber(value);
            case "%":
                const percent = this.parseNumber(result);
                const total = this.parseNumber(value);
                return ((percent/ 100) * total)
            default:
                return result;
        }

    }

    handleBackspace() {
        const value = this.resultDisplay.innerHTML;

        if (value == "") {
            return;
        }

        this.resultDisplay.innerHTML = value.substr(0, value.length - 1);
    }
    
    parseNumber(value) {
        return Number(parseFloat(value)) || 0;
    }

    formatResult(amount){
        return (amount % 1 !== 0) ? amount.toFixed(2) : amount;
    }

}