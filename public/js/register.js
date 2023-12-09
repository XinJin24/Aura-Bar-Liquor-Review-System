
let checkName = (strVal) =>{
    if(!strVal){
    }
    if(typeof strVal !== "string"){
        throw `name should be a string`;
    }
    strVal = strVal.trim();
    if(strVal.length < 2 || strVal.length > 25){
        throw `name should be at least 2 characters long with a max of 25 characters`;
    }
    if (!isNaN(strVal))
        throw `${strVal} is not a valid value for name as it only contains digits`;
    // return strVal;
}

let checkEmail = (strVal) =>{
    if(!strVal){
        throw `email is not provided`;
    }
    strVal = strVal.trim();
    if(typeof strVal !== "string" || strVal.length === 0){
        throw `email is not strings or is empty strings`;
    }
    let validEmail = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
    if(!validEmail.test(strVal)){
        throw `email is not a valid email address`;
    }
    strVal = strVal.toLowerCase();
    // return strVal;
}

let checkPassword = (password) =>{
    if (!password) throw `Error: password not supplied`;
    if (typeof password !== "string" || password.trim().length <= 0) {
        throw `Error: password must be a valid string(no empty spaces)!`;
    }
    password = password.trim();
    if (password.length < 8) {
        throw `Error: password must be at least 8 characters`;
    }
    if (/\s/.test(password)) throw `Error: password must not contain spaces`;
    //There needs to be at least one uppercase character
    if (!/[A-Z]/.test(password)) {
        throw `Error: password must contain at least one uppercase character`;
    }
    if (!/[a-z]/.test(password)) {
        throw `Error: password must contain at least one lowercase character`;
    }
    //at least one number
    if (!/\d/.test(password)) {
        throw `Error: password must contain at least one number`;
    }
    //at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw `Error: password must contain at least one special character`;
    }
    // return password;
}

let checkConfirm = (code1,code2) =>{
    if(code1!==code2)
        throw "the confirmpassword does not match the password";
}

let checkRole = (strVal) =>{
    if(!strVal){
        throw `role is not provided`;
    }
    strVal = strVal.trim();
    if(typeof strVal !== "string" || strVal.length === 0){
        throw `role is not strings or is empty strings`;
    }
    strVal = strVal.toLowerCase();
    if(strVal !== "admin" && strVal !== "user"){
        throw `role the ONLY two valid values are "admin" or "user"`;
    }
    // return strVal;
}

let checkPhoneNumber = (phoneNumber) =>{
    if (!phoneNumber) {
        throw `Phone number not supplied`;
    }
    if (typeof phoneNumber !== "string" || phoneNumber.trim().length === 0) {
        throw `Phone number should be a valid string (no empty spaces)`;
    }
    phoneNumber = phoneNumber.trim();
    const phoneRegex = /^(\+\d{1,2}\s?)?(\d{1,4}\s?)?[\d\s-]+$/;
    if (!phoneRegex.test(phoneNumber)) {
        throw `Invalid phone number format`;
    }
    // return phoneNumber;
}

let valid1 = false;
$('#error').hide()
$('#registration_form').submit((event)=>{
    if(!valid1)
    {
        event.preventDefault();
        try{
            if($('#firstNameInput').length)
                checkName($('#firstNameInput').val())
            if($('#lastNameInput').length)
                checkName($('#lastNameInput').val())
            if($('#emailAddressInput').length)
                checkEmail($('#emailAddressInput').val());
            if($('#phoneNumberInput').length)
                checkPhoneNumber($('#phoneNumberInput').val())
            if($('#passwordInput').length)
                checkPassword($('#passwordInput').val());
            if($('#confirmPasswordInput').length)
                checkConfirm($('#passwordInput').val(),$('#confirmPasswordInput').val())
            if($('#roleInput').length)
                checkRole($('#roleInput').val())
            valid1=true;
            $('#registration_form').submit();//submit失效，若删除event.preventDefault();前端验证失效，若改submit id，前端验证失效
            // $('#registration_form')[0].submit();
            valid1=false;
        }catch(e){
            $('#error').hide();
            $('#error').append(`<p>${e}</p>`);
            $('#error').show();
        }
    }
})

// let clientError2 = document.getElementById("clientError2");
// clientError2.style.display = 'none';
// let valid2 = false;

// let firstNameInput = document.getElementById('firstNameInput');
// let lastNameInput = document.getElementById('lastNameInput');
// let emailAddressInput = document.getElementById('emailAddressInput');
// let phoneNumberInput = document.getElementById('phoneNumberInput');
// let passwordInput = document.getElementById('passwordInput');
// let confirmPasswordInput = document.getElementById('confirmPasswordInput');
// let roleInput = document.getElementById('roleInput');
// let error = document.getElementById('error')
// let registration_form = document.getElementById('registration-form');
//
//
//
// if(registration_form){
//     registration_form.addEventListener('submit', (event)=>{
//         // event.preventDefault();
//         error.innerHTML = "";
//         error.classList.add('hidden-div');
//         let firstName = firstNameInput.value;
//         let lastName = lastNameInput.value;
//         let emailAddress = emailAddressInput.value;
//         let phoneNumberInput = phoneNumberInput.value;
//         let password = passwordInput.value;
//         let confirmPassword = confirmPasswordInput.value;
//         let role = roleInput.value;
//
//         try {
//             firstName = checkName(firstName);
//         } catch (e) {
//             console.log(e);
//             error.classList.remove('hidden-div');
//             const msg = document.createElement('p');
//             msg.innerHTML = e;
//             error.appendChild(msg);
//         }
//
//         try {
//             lastName = checkName(lastName);
//         } catch (e) {
//             console.log(e);
//             error.classList.remove('hidden-div');
//             const msg = document.createElement('p');
//             msg.innerHTML = e;
//             error.appendChild(msg);
//         }
//
//         try {
//             emailAddress = checkEmail(emailAddress);
//         } catch (e) {
//             console.log(e);
//             error.classList.remove('hidden-div');
//             const msg = document.createElement('p');
//             msg.innerHTML = e;
//             error.appendChild(msg);
//         }
//
//         try {
//             phoneNumberInput = checkPhoneNumber(phoneNumberInput);
//         } catch (e) {
//             console.log(e);
//             error.classList.remove('hidden-div');
//             const msg = document.createElement('p');
//             msg.innerHTML = e;
//             error.appendChild(msg);
//         }
//
//         try {
//             password = checkPassword(password);
//         } catch (e) {
//             console.log(e);
//             error.classList.remove('hidden-div');
//             const msg = document.createElement('p');
//             msg.innerHTML = e;
//             error.appendChild(msg);
//         }
//
//
//         try {
//             confirmPassword = checkPassword(confirmPassword);
//         } catch (e) {
//             console.log(e);
//             error.classList.remove('hidden-div');
//             const msg = document.createElement('p');
//             msg.innerHTML = e;
//             error.appendChild(msg);
//         }
//
//         try {
//             checkConfirm(password, confirmPassword);
//         } catch (e) {
//             console.log(e);
//             error.classList.remove('hidden-div');
//             const msg = document.createElement('p');
//             msg.innerHTML = e;
//             error.appendChild(msg);
//         }
//
//         try {
//             role = checkRole(role);
//         } catch (e) {
//             console.log(e);
//             error.classList.remove('hidden-div');
//             const msg = document.createElement('p');
//             msg.innerHTML = e;
//             error.appendChild(msg);
//         }
//         if (error.children.length === 0) {
//             registration_form.submit()
//         } else {
//             return;
//         }
//     });
// }
//
//
// const checkFile = (file, errorArr) => {
//
//     if (!file) {
//         errorArr.push("No image input");
//         return;
//     }
//     if (file.size >= 16777216) {
//         errorArr.push("Image Size should smaller than 16mb ");
//         return;
//     }
//     if (file.type !== "image/jpeg" && file.type !== "image/png") {
//         errorArr.push("Image type should be jpeg or png ");
//         return;
//     }
//     return;
// }
//
//
// let photoInput = document.getElementById('photoInput');
// let formReady = true;
//
// document.getElementById('photoInput').addEventListener('change', function (event) {
//     const errorMsg = [];
//     document.getElementById('fileError').innerHTML = '';
//
//     const fileInput = event.target;
//     const file = fileInput.files[0];
//
//     if (!file) {
//         formReady = true;
//         document.getElementById('previewImg').src = ''; // Clear the preview image
//         return;
//     }
//
//     console.log(file);
//     checkFile(file, errorMsg);
//
//     if (errorMsg.length > 0) {
//         formReady = false;
//         errorMsg.forEach(msg => {
//             const li = document.createElement('li');
//             li.textContent = msg;
//             li.style.color = 'red';
//             document.getElementById('fileError').appendChild(li);
//         });
//     } else {
//         formReady = true;
//     }
// });



// photoInput.addEventListener('change', function () {
//     try {
//         // checkIfFileExists(this);
//         if (this.files && this.files[0]) {
//             let reader = new FileReader();
//             reader.onload = function (e) {
//                 previewImg.src = e.target.result;
//             };
//             reader.readAsDataURL(this.files[0]);
//         }
//         clientError2.style.display = 'none';
//     } catch (error) {
//         console.error(error);
//         clientError2.innerHTML = `<p>${error}</p>`;
//         clientError2.style.display = 'block';
//
//     }
// });
