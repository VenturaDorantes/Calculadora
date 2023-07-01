const $keys = document.querySelectorAll('.key');
const $display_input = document.querySelector('.display .input');
const $display_output = document.querySelector('.display .output');

let input = '';

for ( let key of $keys ) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if(value == 'clear'){
            input = '';
            $display_input.innerHTML = '';
            $display_output.innerHTML = '';
        }
    })
}