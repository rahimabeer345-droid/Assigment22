var justCalculated = false;

function getvalue(buttonValue) {
    var input = document.getElementById('inputfield');
    var lastChar = input.value.slice(-1);
    var operators = ['+', '-', '*', '/', '%'];


    if (input.value === "Syntax Error" || input.value === "Math Error") {
        input.value = "";
    }


    if (buttonValue === 'sin') {
        input.value += 'Math.sin(';
        return;
    }
    if (buttonValue === 'cos') {
        input.value += 'Math.cos(';
        return;
    }
    if (buttonValue === 'tan') {
        input.value += 'Math.tan(';
        return;
    }
    if (buttonValue === 'in') {
        input.value += 'Math.log(';
        return;
    }


    if (justCalculated && !isNaN(buttonValue)) {
        input.value = buttonValue;
        justCalculated = false;
        return;
    }


    if (operators.includes(lastChar) && operators.includes(buttonValue)) {
        input.value = input.value.slice(0, -1) + buttonValue;
        return;
    }

    input.value += buttonValue;
    justCalculated = false;
}

function equal() {
    var input = document.getElementById('inputfield');

    if (!input.value) {
        input.value = "Syntax Error";
        return;
    }

    try {
        input.value = eval(input.value);
        justCalculated = true;
    } catch {
        input.value = "Syntax Error";
        justCalculated = true;
    }
}

function clearAll() {
    document.getElementById('inputfield').value = "";
    justCalculated = false;
}

function delchar() {
    var input = document.getElementById('inputfield');
    input.value = input.value.slice(0, -1);
}

function sqrt() {
    var input = document.getElementById('inputfield');
    var number = parseFloat(input.value);

    if (isNaN(number) || number < 0) {
        input.value = "Math Error";
    } else {
        input.value = Math.sqrt(number);
    }
    justCalculated = true;
}




document.addEventListener("keydown", function (event) {
    const key = event.key;

    
    if (!isNaN(key)) {
        getvalue(key);
    }


    if (['+', '-', '*', '/', '%', '.'].includes(key)) {
        getvalue(key);
    }

  
    if (key === "Enter") {
        event.preventDefault();
        equal();
    }


    if (key === "Backspace") {
        delchar();
    }


    if (key === "Escape") {
        clearAll();
    }
});

function equal() {
    var input = document.getElementById('inputfield');
    var historyList = document.getElementById('historyList');

    if (!input.value) {
        input.value = "Syntax Error";
    } else {
        try {
            let result = eval(input.value);
            input.value = result;
            justCalculated = true;

           
            let li = document.createElement("li");
            li.textContent = result;
            li.addEventListener("click", function () {
                input.value = this.textContent; 
            });
            historyList.prepend(li); 
        } catch {
            input.value = "Syntax Error";
            justCalculated = true;
        }
    }
}

