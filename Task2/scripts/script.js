const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const form = document.querySelector('#signup');
const togglePassword1 = document.querySelector("#togglePassword1"); // for password
const togglePassword = document.querySelector("#togglePassword"); // for confirm password
const userDataCard = document.getElementById('userDataCard');
const userDataUsername = document.getElementById('userDataUsername');
const userDataEmail = document.getElementById('userDataEmail');

//shows error message
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

//shows success message
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};

//checks input field
const isRequired = value => value === '' ? false : true;

//checks length of input field
const isBetween = (length, min, max) => length < min || length > max ? false : true;

//checks email is valid
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

//checks password is secured
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};


//validate username field
const checkUsername = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const usernameVal = username.value.trim();

    if (!isRequired(usernameVal)) {
        showError(username, 'Username is required.');
    } else if (!isBetween(usernameVal.length, min, max)) {
        showError(username, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(username);
        valid = true;
    }
    return valid;
};
//validate email field
const checkEmail = () => {
    let valid = false;
    const emailVal = email.value.trim();
    if (!isRequired(emailVal)) {
        showError(email, 'Email is required.');
    } else if (!isEmailValid(emailVal)) {
        showError(email, 'Email is not valid.')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
};
//validate password
const checkPassword = () => {

    let valid = false;

    const passwordVal = password.value.trim();

    if (!isRequired(passwordVal)) {
        showError(password, 'Password is required.');
    } else if (!isPasswordSecure(passwordVal)) {
        showError(password, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(password);
        valid = true;
    }

    return valid;
};
//validate confirm password
const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPasswordVal = confirmPassword.value.trim();
    const passwordVal = password.value.trim();

    if (!isRequired(confirmPasswordVal)) {
        showError(confirmPassword, 'Confirm Password is required');
    } else if (passwordVal !== confirmPasswordVal) {
        showError(confirmPassword, 'Confirm Password does not match');
    } else {
        showSuccess(confirmPassword);
        valid = true;
    }

    return valid;
};
togglePassword1.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type")  === "password" ? "text" : "password";
    password.setAttribute("type", type);
    
    // toggle the icon
    this.classList.toggle("bi-eye");
});

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);
    
    // toggle the icon
    this.classList.toggle("bi-eye");
});

//modifying submit event handler
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        // Update the user data in the card
        userDataUsername.textContent = username.value;
        userDataEmail.textContent = email.value;

        // Show the card
        userDataCard.style.display = 'block';
        // form.reset();
    } else {
        // Hide the card if the form is not valid
        userDataCard.style.display = 'none';
    }

});
// Reset the form and hide the card initially
form.reset();
userDataCard.style.display = 'none';