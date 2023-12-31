const $keys = document.querySelectorAll('.key');
const $display_input = document.querySelector('.display .input');
const $display_output = document.querySelector('.display .output');

const $icons = document.querySelectorAll('.btnIcon')
const $styleColor = document.documentElement.style
const sun = $icons[0]
const moon = $icons[1]

sun.addEventListener('click', () => {
    if (!sun.classList.value.includes('active')) {
        moon.classList.remove('active');
        sun.classList.add('active');
        $styleColor.setProperty('--bg-black', 'white');
        $styleColor.setProperty('--bd-keys', '#E9ECEF');
        $styleColor.setProperty('--txt-white', 'black');
        $styleColor.setProperty('--btn-shadow', '#00000033');
        $styleColor.setProperty('--bd-btnIconActive', '#000000');
        localStorage.setItem('pageColor', 'sun');
    }
})

moon.addEventListener('click', () => {
    if (!moon.classList.value.includes('active')) {
        sun.classList.remove('active')
        moon.classList.add('active')
        $styleColor.setProperty('--bg-black', '#22252D');
        $styleColor.setProperty('--bd-keys', '#292d36');
        $styleColor.setProperty('--txt-white', 'white');
        $styleColor.setProperty('--btn-shadow', '#ffffff33');
        $styleColor.setProperty('--bd-btnIconActive', '#ffffff');
        localStorage.setItem('pageColor', 'moon');
    }
})

if ( localStorage.pageColor === 'sun'){
    sun.click();
} else {
    moon.click();
}

let input = '';

// cambio de color

for ( let key of $keys ) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        // Funcionamiento ----> AC
        if(value == 'clear'){
            input = '';
            $display_input.innerHTML = '';
            $display_output.innerHTML = '';
        // Funcionamiento ----> boton de borrar ultimo numero '<'
        } else if (value == 'backspace') {
            input = input.slice(0, -1);
            $display_input.innerHTML = CleanInput(input);
        // Funcionamiento ----> boton Igual '='
        } else if (value == '='){
            let result;
            try {
                result = eval(PerpareInput(input));
            } catch(error) {
                $display_input.innerHTML = ''
                $display_output.innerHTML = 'syntax error';
            }
            $display_output.innerHTML = CleanOutput(result);
            
        // Funcionamiento para llaves
        } else if (value == 'brackets') {
            if (input.indexOf('(') == -1 || 
                input.indexOf(')') != -1 && 
                input.indexOf(')') != -1 && 
                input.lastIndexOf('(') < input.lastIndexOf(')')) {
                input += '(';
            } else if (input.indexOf('(') != -1 && 
                        input.indexOf(')') == -1 ||
                        input.indexOf('(') != -1 &&
                        input.indexOf(')') != -1 &&
                        input.lastIndexOf('(') > input.lastIndexOf(')')
            ) {
                input += ')';
            }
            $display_input.innerHTML = CleanInput(input);
        } else {
            if(ValidateInput(value)){
                input += value;
                $display_input.innerHTML = CleanInput(input);
            }
        }
    })
}

const CleanInput = (input) => {

    let input_array = input.split('');
    let input_array_length = input_array.length;

    // Cambiando agregando un span en caso de precionar un boton del operador
    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == '*') {
            input_array[i] = ` <span class="operator">x</span> `;
        } else if (input_array[i] == '/') {
            input_array[i] = ` <span class="operator">÷</span> `;
        } else if (input_array[i] == '+') {
            input_array[i] = ` <span class="operator">+</span> `;
        } else if (input_array[i] == '-') {
            input_array[i] = ` <span class="operator">-</span> `;
        } else if (input_array[i] == '(') {
            input_array[i] = ` <span class="bracket">(</span> `;
        } else if (input_array[i] == ')') {
            input_array[i] = ` <span class="brecket">)</span> `;
        } else if (input_array[i] == '%') {
            input_array[i] == ` <span class="percent">%</span> `;
        }
    }
    return input_array.join('');
}

// funcion para poder agregar una coma en numero de miles
const CleanOutput = (output) => {
    let output_string = output.toString();
    let decimal = output_string.split('.')[1];
    output_string = output_string.split('.')[0];

    let output_array = output_string.split('');

    if(output_array.length > 3) {
        if (!(output_array[0] == '-' && output_array.length === 4)) {
            for (let i = output_array.length - 3; i > 0; i -= 3) {
                output_array.splice(i, 0, ',');
            }
        } 
    }

    if(decimal) {
        output_array.push('.');
        output_array.push(decimal);
    }

    return output_array.join('')
}

// funcion para no poder agregar puntos y operadores despues de otro
const ValidateInput = (value) => {
    let last_input = input.slice(-1);
    let operators = ['+', '-', '*', '/'];

    if(value == '.' && last_input == '.') {
        return false
    } 

    if(value == '%' && last_input == '%' ) {
        return false
    } 

    if(operators.includes(value)) {
        return operators.includes(last_input) ? false : true
    }
    
    return true;
}

const PerpareInput = (input) => {
    let input_array = input.split('');
    let operator = ['*', '+', '-', '/'];

    console.log('normal', input_array)

    if (input_array.includes('%')){

        for (let i = 0; i < input_array.length; i++) {
            if(input_array[i] === '%'){
                input_array[i] = "/100"
            }
        }
    
        for (let i = input_array.length; i > 0; i--) {
   
            for (let j = 0; j < operator.length; j++){

                if(input_array[i] === operator[j]){
                    const getOperator = input_array[i];
                    if(getOperator == '*'){
                        console.log('convertido', input_array)
                        return input_array.join('')
                    } else {
                        console.log(getOperator)
                        const getNumberPercent = input_array.splice(i + 1)
                        const getOperationPercent = input_array.slice(0, i);
    
                        const operationPercent = eval(getOperationPercent.join(''))
                        const numberPercent = eval(getNumberPercent.join(''))
    
                        const resultOperation = operationPercent * numberPercent;
    
                        const resultFinally = eval(operationPercent + getOperator + resultOperation)
                        console.log('operation', operationPercent + getOperator + resultOperation)
                        console.log('resultFinally', resultFinally)
                        return resultFinally
                    }
                    
                }
            }
        }
    }

    console.log('convertido', input_array)
    return input_array.join('')
}