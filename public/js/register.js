
// import { access } from 'fs/promises';

let registration_form = document.getElementById("registration_form");


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
}

let validatePassword = (password) =>{
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
    return password;
}

let checkConfirm = (code1,code2) =>{
    if(code1!=code2)
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
}

// let checkPhoto = (photo) =>{
//     if (!(photo instanceof Array)) {
//         throw "photo should be an array of strings";
//     }
//     for (let i = 0; i < photo.length; i++) {
//         if (typeof photo[i] !== "string") {
//             throw "each element in photo should be a string";
//         }
//     }
//     return photo;
// }

let validatePhoneNumber = (phoneNumber) =>{
    if (!phoneNumber) {
        throw "Error: Phone number not supplied";
    }
    if (typeof phoneNumber !== "string" || phoneNumber.trim().length === 0) {
        throw "Error: Phone number should be a valid string (no empty spaces)";
    }
    phoneNumber = phoneNumber.trim();
    const phoneRegex = /^(\+\d{1,2}\s?)?(\d{1,4}\s?)?[\d\s-]+$/;
    if (!phoneRegex.test(phoneNumber)) {
        throw "Error: Invalid phone number format";
    }
    return phoneNumber;
}

let clientError2 = document.getElementById("clientError2");
clientError2.style.display = 'none';
// let valid2 = false;
const firstName = document.getElementById('firstNameInput').value;
if(registration_form){
    registration_form.addEventListener('submit', (event)=>{
        clientError2.classList.add('hidden-div');
        // if(!valid2){
        //     event.preventDefault();
        console.log(firstName);
        console.log(document.getElementById('lastNameInput'));
            try{
                if(firstName){
                    checkName(firstName);
                    console.log("-------");
                }
                if(document.getElementById('lastNameInput')){
                    checkName(document.getElementById('lastNameInput').value);
                }
                if(document.getElementById('emailAddressInput')){
                    checkEmail(document.getElementById('emailAddressInput').value);
                }
                if(document.getElementById('phoneNumberInput')){
                    validatePhoneNumber(document.getElementById('phoneNumberInput').value);
                }
                if(document.getElementById('passwordInput')){
                    validatePassword(document.getElementById('passwordInput').value);
                }
                if(document.getElementById('confirmPasswordInput')){
                    checkConfirm(document.getElementById('confirmPasswordInput').value, document.getElementById('confirmPasswordInput').value);
                }
                // if(document.getElementById('photoInput')){
                //     let fileInput = document.getElementById('photoInput');
                //     checkPhoto(fileInput);
                // }
                if(document.getElementById('roleInput')){
                    checkRole(document.getElementById('roleInput').value);
                }
                // valid2 = true;
                registration_form.submit();

                // registration_form.dispatchEvent(new Event('submit'));
                // valid2 = false;
                console.log('Form should be submit');
            }catch(e){
                clientError2.classList.remove('hidden-div');
                const errorInfo = `<p>${e}</p>`;
                clientError2.innerHTML = errorInfo;
                clientError2.style.display = 'block';
            }
    });
}

// document.addEventListener('DOMContentLoaded', function () {
//     let imageInput = document.getElementById('photoInput');
//     let imagePreview = document.getElementById('previewImg');
//
//     imageInput.addEventListener('change', function () {
//         if (this.files && this.files[0]) {
//             let reader = new FileReader();
//             reader.onload = function (e) {
//                 imagePreview.src = e.target.result;
//             };
//             reader.readAsDataURL(this.files[0]);
//         }
//     });
// });


let photoInput = document.getElementById('photoInput');
let previewImg = document.getElementById('previewImg');

photoInput.addEventListener('change', function () {
    try {
        // checkIfFileExists(this);
        if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
        clientError2.style.display = 'none';
    } catch (error) {
        console.error(error);
        clientError2.innerHTML = `<p>${error}</p>`;
        clientError2.style.display = 'block';

    }
});
