const fullname = document.getElementById('FullName');
const email = document.getElementById('Emailform');
const phno = document.getElementById('Phonenumber');
const dob = document.getElementById('datepicker');
const create_pass = document.getElementById('CreatePass');
const confirm_pass = document.getElementById('ConfirmPass');
const register = document.getElementById('Register');

let passwordvalue;
let userage = false;
let fname = false;
let phone = false;
let validEmail = false;
let valid_create_pass = false;
let valid_confirm_pass = false;

//full name event
fullname.addEventListener('blur', () => {
    let regex = /(^[A-Za-z ]{3,20})/;
    let fnamevalue = fullname.value;
    if (regex.test(fnamevalue)) {
        fullname.classList.remove('is-invalid');
        fname = true;
    }
    else {
        fname.classList.add("is-invalid");
        fname = false;
    }
});

// email event
email.addEventListener('blur', () => {
    //console.log('email');
    let regex = /^([_0-9a-zA-Z]+)@([\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let emailvalue = email.value;
    //console.log(regex, emailvalue);
    if (regex.test(emailvalue)) {
        //console.log("valid email");
        email.classList.remove('is-invalid');
        validEmail = true;
    }
    else {
        //console.log("invalid email");
        email.classList.add("is-invalid");
        validEmail = false;
    }
});


//phone number valid
phno.addEventListener('blur', () => {
    let regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    let number = phno.value;
    if (regex.test(number)) {
        phno.classList.remove('is-invalid');
        phone = true;
    }
    else {
        phno.classList.add('is-invalid');
        phone = false;
    }
});


//validate age
dob.addEventListener('blur', () => {
    var userinput = dob.value;
    var dateofbirth = new Date(userinput);
    var month_diff = Date.now() - dateofbirth.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);

    //check if provided age is of an adult
    if (age < 18) {
        dob.classList.add('is-invalid');
        userage = false;
    }
    else {
        dob.classList.remove('is-invalid');
        userage = true;
    }
    return document.getElementById('Age').innerHTML = age;
});


create_pass.addEventListener('blur', () => {
    //console.log('password created');
    let regex = /^([0-9a-zA-Z]){8,20}$/;
    passwordvalue = create_pass.value;
    console.log(regex, passwordvalue);
    if (regex.test(passwordvalue)) {
        //console.log("valid password");
        create_pass.classList.remove('is-invalid');
        eye.style.display = "block";
        valid_create_pass = true;
    }
    else {
        //console.log("invalid password");
        create_pass.classList.add("is-invalid");
        eye.style.display = "block";
        eye.style.color = "red";
        valid_create_pass = false;
    }
});


//to match both passwords
confirm_pass.addEventListener('blur', () => {
    //console.log('password confirmed');
    let conf_passwordvalue = confirm_pass.value;
    //console.log(conf_passwordvalue);
    if (conf_passwordvalue === passwordvalue) {
        //console.log('password matched');
        confirm_pass.classList.remove('is-invalid');
        valid_confirm_pass = true;
    } else {
        // console.log('password not matched');
        confirm_pass.classList.add('is-invalid');
        valid_confirm_pass = false;
    }
})

//register event
register.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('register clicked');
    if (fullname.value.length == 0 || email.value.length == 0 || phno.value.length == 0 || dob.value.length == 0 || create_pass.value.length == 0 || confirm_pass.value.length == 0) {
        console.log('incomplete details');
        alert('Please fillup the required details');
    }
    registerdata(e);

});

//function to calculate age of the user 
function CalculateAge() {
    var userinput = dob.value;
    var dateofbirth = new Date(userinput);
    if (userinput == null || userinput == '') {
        alert('Please fill up the age field');
    }
    else {
        var month_diff = Date.now() - dateofbirth.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        var age = Math.abs(year - 1970);
        return document.getElementById('Age').innerHTML = age;
    }
}



//Registration & user data display
const registerdata = e => {
    let formdata = JSON.parse(localStorage.getItem('formdata')) || [];

    //check if given mail and phone number is already registered
    let exist = formdata.length && JSON.parse(localStorage.getItem('formdata')).some(data => data.email == email.value && data.phno == phno.value);
    if (!exist) {

        //if new user then push the data to the array
        formdata.push(
            {
                fullname: fullname.value, email: email.value, phno: phno.value
            }
        )
        localStorage.setItem('formdata', JSON.stringify(formdata));
        console.log(localStorage.getItem('formdata'));
        displaydata();
        document.querySelector('form').reset();
    }
    else{
        alert('Duplicate data found.\nEach user must have a unique phone number and email while registering');
    }
    e.preventDefault();
}


//display the list of successfully registered users in the form of a table
function displaydata() {
    console.log(localStorage.getItem('formdata'));
    if (localStorage.getItem('formdata')) {
        
        var output = document.getElementById('dispdata');
        output.innerHTML = "";
        JSON.parse(localStorage.getItem('formdata')).forEach(data => {
            output.innerHTML += `
                    <tr>
                        <td>${data.fullname}</td>
                        <td>${data.email}</td>
                        <td>${data.phno}</td>
                    </tr>
        `
        });
    }
}
