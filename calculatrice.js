console.log("debut de tache");
console.log("squellete html en cours et ajout de css ");


    let display = document.querySelector('.display');
    let buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let secondOperand = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            // Gestion des chiffres et du point décimal
            if (!isNaN(value) || value === '.') {
                if (currentInput.includes('.') && value === '.') return; // Empêche plusieurs points
                currentInput += value;
                display.textContent = currentInput;
            }

            // Gestion des opérateurs (+, -, ×, ÷)
            else if (['+', '-', '×', '÷'].includes(value)) {
                if (currentInput === '') return; // Ignore si aucun nombre n'est saisi
                if (firstOperand !== '') calculate(); // Calcule si un premier opérande existe
                operator = value;
                firstOperand = currentInput;
                currentInput = '';
            }

            // Gestion du bouton "="
            else if (value === '=') {
                if (currentInput === '' || firstOperand === '') return; // Ignore si les opérandes sont manquants
                secondOperand = currentInput;
                calculate();
                operator = '';
            }

            // Gestion du bouton "C" (Effacer tout)
            else if (value === 'C') {
                currentInput = '';
                firstOperand = '';
                secondOperand = '';
                operator = '';
                display.textContent = '0';
            }

            // Gestion du bouton "+/-" (Changement de signe)
            else if (value === '+/-') {
                if (currentInput === '') return;
                currentInput = (parseFloat(currentInput) * -1).toString();
                display.textContent = currentInput;
            }

            // Gestion du bouton "%" (Pourcentage)
            else if (value === '%') {
                if (currentInput === '') return;
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.textContent = currentInput;
            }
        });
    });

    // Fonction pour effectuer les calculs
    function calculate() {
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(currentInput);

        switch (operator) {
            case '+':
                currentInput = (num1 + num2).toString();
                break;
            case '-':
                currentInput = (num1 - num2).toString();
                break;
            case '×':
                currentInput = (num1 * num2).toString();
                break;
            case '÷':
                currentInput = (num1 / num2).toString();
                break;
            default:
                return;
        }

        display.textContent = currentInput;
        firstOperand = currentInput;
        currentInput = '';
    }