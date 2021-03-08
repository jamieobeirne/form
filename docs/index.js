/*James O’Beirne
M4.254 - Desarrollo front-end con framew. JavaScript aula 2
PEC1 - Introducción al desarrollo frontend
07 de Marzo de 2021*/


/*these variables bring in everything from the DOM*/
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//show error message
function showError(input, message) {
    const formControl = input.parentElement; //finds parent of child
    formControl.className = 'form-control error'; //gets and sets the class of a target
    const small = formControl.querySelector('small');
    small.innerText = message;
}


//show success border
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//validate email
function checkEmail(input) {
    //expression includes the patterns of the an email
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const test = re.test(input.value.trim());

    if (test) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not a valid.');
    }
}


//check required array fields
function checkRequiered(inputArray) {
    inputArray.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${capitolizeFirstLetter(input)} is required`);
        } else {
            showSuccess(input)
        }
    });
}


//check length of input
function checkLength(input, minLength, maxLength) {
    if (input.value.length < minLength) {
        showError(input, `${capitolizeFirstLetter(input)} must be at least ${minLength} characters.`);
    } else if (input.value.length > maxLength) {
        showError(input, `${capitolizeFirstLetter(input)} must be at less than ${maxLength} characters.`);
    } else {
        showSuccess(input);
    }
}



//capitolize the first letter and add on sliced remainder
function capitolizeFirstLetter(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}


//compares passwords
function comparePasswords(input1, input2) {
    const inputValue1 = input1.value;
    const inputValue2 = input2.value;
    let match = inputValue1.localeCompare(inputValue2);

    if (match !== 0) {
        showError(input2, 'Emails must match');
    }
}

!1Jjamie

//check that password has number, upper-case, lower-case and a symbol
function charachtersInPassword(input) {

    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const test = re.test(input.value.trim());

    if (test) {
        showSuccess(input)
    } else {
        showError(input, 'Must contain number, upper & lower-case and symbol.');
    }

}



//event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequiered([username, email, password, password2]);//any field that we want to 
    //cech we can pass into this array

    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    comparePasswords(password, password2);
    charachtersInPassword(password);
});




