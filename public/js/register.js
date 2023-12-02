
import { access } from 'fs/promises';

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

let checkPassword = (strVal)=>{
    if(!strVal){
        throw `password is not provided`;
    }
    strVal = strVal.trim();
    if(typeof strVal !== "string" || strVal.length === 0){
        throw `password is not strings or is empty strings`;
    }
    if(strVal.length < 8){
        throw `password should be a minimum of 8 characters long`;
    }
    if(!/A-Z/.test(strVal)){
        throw `password needs to be at least one uppercase character`;
    }
    if(!/\d/.test(strVal)){
        throw `password needs to be at least one number `;
    }
    if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(strVal)){
        throw `password needs to be at least one special character`;
    }
    for(let i = 0; i < strVal.length; i++){
        if(strVal.charAt(i) == ''){
            throw `password shouldn't have spaces`;
        }
    }
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

let checkIfFileExist = async (filePath, valName) => {
    if (typeof filePath !== "string") {
        throw `Error: ${valName} must be a valid string(no empty spaces)!`;
    } else if(filePath.trim().length === 0){
        return "";
    }
    try {
        await access(filePath);
        return filePath;
    } catch (err) {
        throw `Error: File at path ${filePath} is inaccessible.`;
    }
}

let clientError2 = document.getElementById("clientError2");
clientError2.style.display = 'none';
let valid2 = false;

registration_form.addEventListener = ('submit2', async (event) =>{
    if(!valid2){
        event.preventDefault();
        try{
            if(document.getElementById(firstNameInput2)){
                checkName(document.getElementById(firstNameInput2).value);
            }
            if(document.getElementById(lastNameInput2)){
                checkName(document.getElementById(lastNameInput2).value);
            }
            if(document.getElementById(emailAddressInput2)){
                checkEmail(document.getElementById(emailAddressInput2).value);
            }
            if(document.getElementById(passwordInput2)){
                checkPassword(document.getElementById(passwordInput2).value);
            }
            if(document.getElementById(confirmPasswordInput2)){
                checkConfirm(document.getElementById(passwordInput2).value, document.getElementById(confirmPasswordInput2).value);
            }
            if(document.getElementById(photoInput2)){
                let fileInput = document.getElementById(photoInput2);
                if(fileInput.files.length > 0){
                    try{
                        await checkIfFileExist(fileInput.files[0]);
                    }catch(e){
                        console.error(e);
                        throw e;
                    }                
                }
            }
            if(document.getElementById(roleInput2)){
                checkRole(document.getElementById(roleInput2).value);
            }
            valid2 = true;
            registration_form.submit();
            valid2 = false;

        }catch(e){
            const errorInfo = <p>${e}</p>;
            clientError2.innerHTML = errorInfo;
            clientError2.style.display = 'block';
        }
    }
});

let photoInput = document.getElementById('photoInput2');
let previewImg = document.getElementById('previewImg2');

photoInput.addEventListener('change', function(){
    if(this.files && this.files[0]){
        let reader = new FileReader();
        reader.onload = function(e){
            previewImg.src = e.target.result;//Assign the data URL to the src attribute of img
        }
        reader.readAsDataURL(this.files[0]);
    }
});
