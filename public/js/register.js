
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
        throw "Error: Phone number not supplied";
    }
    if (typeof phoneNumber !== "string" || phoneNumber.trim().length === 0) {
        throw "Error: Phone number should be a valid string (no empty spaces)";
    }
    phoneNumber = phoneNumber.trim();

    const phoneRegex = /^\+\d{1,3}\s?(\d{1,4}\s?)?\d{4,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
        throw "Error: Invalid phone number format. A country code is required.";
    }
    // return phoneNumber;
}

let valid1 = false;
$('#error').hide()
$('#registration_form').submit((event)=>{
    if(!valid1)
    {
        event.preventDefault();
        $('#error').empty();
        $('#error').hide();
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

document.addEventListener('DOMContentLoaded', function () {
    let imageInput = document.getElementById('photoInput');
    let imagePreview = document.getElementById('previewImg');
    let removeImageBtn = document.getElementById('removeImageBtn');

    imageInput.addEventListener('change', function(event){
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                removeImageBtn.style.display = 'block';
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    });

    removeImageBtn.addEventListener('click', function() {
        imageInput.value = '';
        imagePreview.style.display = 'none';
        removeImageBtn.style.display = 'none';
    });

});


