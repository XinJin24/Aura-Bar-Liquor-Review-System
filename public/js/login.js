let login_form = document.getElementById("login_form");

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
    if(!/A-Z/){
        throw `password needs to be at least one uppercase character`;
    }
    if(!/\d/){
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

let clientError1 = document.getElementById("clientError1");
clientError1.style.display = 'none';
let valid1 = false;

login_form.addEventListener = ('submit', (event) =>{
    //stop default behaviour of the form submission
    if(!valid1){
        event.preventDefault();
        try{
            if(document.getElementById(emailAddressInput)){
                checkEmail(document.getElementById(emailAddressInput).value);
            }
            if(document.getElementById(passwordInput)){
                checkPassword(document.getElementById(passwordInput).value);
            }
            valid1 = true;
            login_form.submit();
            valid1 = false;
        }catch(e){
            const errorInfo = `<p>${e}</p>`;
            clientError1.innerHTML = errorInfo;
            clientError1.style.display = 'block';
        }
    }
});