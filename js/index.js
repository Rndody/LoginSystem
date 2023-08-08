//! ################## Login Variables  #######################

var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");

var loginButton = document.getElementById("loginButton");

//! ################## Registeration Variables  #######################

var nameInputRegister = document.getElementById("nameInputRegister");
var emailInputRegister = document.getElementById("emailInputRegister");
var passwordInputRegister = document.getElementById("passwordInputRegister");

var signupButton = document.getElementById("signupButton");

//! ################## Global Variables  #######################
var usersContainer = [];
var userNameWelcome;



//& ################## Input Registration Events  #######################
if (nameInputRegister != null) {
    nameInputRegister.addEventListener('keyUp', function () {
        validateUserName(nameInputRegister.value);
        // console.log("hello");
    })
}
if (emailInputRegister != null) {
    emailInputRegister.addEventListener('keyUp', function () {
        validateUserEmail(emailInputRegister.value);
    })

}
if (passwordInputRegister != null) {
    passwordInputRegister.addEventListener('keyUp', function () {
        validateUserPassword(passwordInputRegister.value);
    })
}
//& ################## Sign Up Button Click  #######################
if (signupButton != null) {
    signupButton.addEventListener('click', function () {
        registration();
    }
    )
}


//& ################## Login Button Click  #######################
if (loginButton != null) {
    loginButton.addEventListener('click', function () {
        login();
    }
    )
}
//* ############################### Calling Functions on start ##################################

checkLocalStorage();

//^ ################## check local sorage Function #######################

function checkLocalStorage() {
    if (localStorage.getItem("users") != null) {
        usersContainer = JSON.parse(localStorage.getItem("users"));
    }
}


//^ ################## Regular Expretions functions #######################
//* ################## Regular Expretions NAME functions #######################
function validateUserName(userName) {
    var nameRegExpretion = /^[A-Za-z][A-Za-z0-9_]{3,29}$/i;
    return nameRegExpretion.test(userName);
}
//* ################## Regular Expretions EMAIL functions #######################

function validateUserEmail(userEmail) {
    var emailRegExpretion = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i;
    return emailRegExpretion.test(userEmail);
}
//* ################## Regular Expretions PASSWORD functions #######################

function validateUserPassword(userPassword) {
    var passwordRegExpretion = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
    //atleast 1 capital letter 1 number 1 small letter and min.8 chatracters 
    return passwordRegExpretion.test(userPassword);
}


//^ ################## Sign Up Function #######################

function registration() {
    var userObject = {
        userName: nameInputRegister.value,
        userEmail: emailInputRegister.value,
        userPassword: passwordInputRegister.value
    }

    if (!validateUserName(nameInputRegister.value)) {
        document.getElementById("validNameP").innerHTML = "Please write at least 4 characters and maximum 30 characters don't start your name with number"
        //ne2olo yektb el esm 3ala al aql 4 7rof w max 30 7rf
    }
    else if (!checkEmailRegistered()) {

        if (validateUserEmail(emailInputRegister.value) && validateUserPassword(passwordInputRegister.value)) {

            usersContainer.push(userObject);
            localStorage.setItem("users", JSON.stringify(usersContainer));
            window.location.href = "index.html"
        }
        else if (!validateUserEmail(emailInputRegister.value)) {
            document.getElementById("validEmailP").innerHTML = "Please write valid email address"
            //ne2olo yekteb valid email
        }
        else if (!validateUserPassword(passwordInputRegister.value)) {
            document.getElementById("validPasswordP").innerHTML = "password must contain at least one capital letter and at least one small letter and at least one number and minimum of eight characters"
            // ne2olo yekteb valid password
        }
    }
}


//^ ################## Check if email is already registered Function #######################

function checkEmailRegistered() {
    var exists;
    var result;
    if (usersContainer.length != 0) {
        var i = 0;

        while (i < usersContainer.length) {

            if (emailInputRegister != null) {
                if (!usersContainer[i].userEmail.toLowerCase().includes(emailInputRegister.value.toLowerCase())) {
                    i++;
                }
                else {
                    exists = 1;
                    document.getElementById("validEmailP").innerHTML = "this email is already taken please sign in or register with new email"
                    //yeb2a ye2olo yesgl be email tany aw ye3ml sign in 
                    i++;
                }
            }
        }
        if (exists == 1) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    }
    else {
        return false;
    }
}

//todo ################## check email and Password saved Function #######################
function savedEmailAndPassword() {
    var exists;
    var result;
    if (usersContainer.length != 0) {
        var i = 0;

        while (i < usersContainer.length) {

            if (!usersContainer[i].userEmail.toLowerCase().includes(emailInput.value.toLowerCase())
                && !usersContainer[i].userPassword.includes(passwordInput.value)) {
                i++;
            }
            else {
                exists = 1;
            
                // userNameWelcome = usersContainer[i].userName;
                localStorage.setItem("welcomeUserName", usersContainer[i].userName);
                i++;
            }
        }
        if (exists == 1) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    }
    else {
        return false;
    }
}


//todo ################## Login Function #######################
function login() {
    if (savedEmailAndPassword()) {
        window.location.href = "welcome.html"
    }
    else  {
        document.getElementById("inCorrectEmailPasswordP").innerHTML = "incorrect email or password"
    }
    

}

//~ ################## Welcome Page #######################


var h2Welcome = document.getElementById("h2Welcome");
if (h2Welcome != null) {
    userNameWelcome=localStorage.getItem("welcomeUserName");

    h2Welcome.innerHTML = "Welcome " + userNameWelcome;
}

var logOut = document.getElementById("logOut");


if (logOut != null) {
    logOut.addEventListener('click', function () {
        window.location.href = "index.html"
    }
    )
}