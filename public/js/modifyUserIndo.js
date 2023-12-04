import { access } from 'fs/promises';

let modify_form = document.getElementById(modify_form);

let checkName = (strVal) =>{
    if(!strVal){
        throw `you should provide a name`;
    }
    if(typeof strVal !== "string"){
        throw `name should be a string`;
    }
    strVal = strVal.trim();
    if(strVal.length < 2 || strVal.length > 25){
        throw `name should be at least 2 characters long with a max of 25 characters`;
    }
    if (!isNaN(strVal)){
        throw `${strVal} is not a valid value for name as it only contains digits`;
    }

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
    if(!/[A-Z]/.test(strVal)){
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

let checkNew = (code1,code2) =>{
    if(code1 === code2)
        throw "the new password should be same as the old password";
}

let checkState = (stateCode) =>{
    if (!stateCode) {
        throw "state code is not supplied";
    }

    if (typeof stateCode !== "string" || stateCode.trim().length !== 2) {
        throw "state code should be a valid two-letter string";
    }

    const validStateCodes = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    const upperCaseStateCode = stateCode.trim().toUpperCase();

    if (!validStateCodes.includes(upperCaseStateCode)) {
        throw "invalid state code";
    }
    return upperCaseStateCode;
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

let clientError3 = document.getElementById("clientError3");
clientError3.style.display = 'none';
let valid3 = false;

modify_form.addEventListener('submit', async (event) =>{
    if(!valid3){
        event.preventDefault();
        try{
            if(document.getElementById("firstName")){
                checkName(document.getElementById("firstName").value);
            }
            if(document.getElementById("lastName")){
                checkName(document.getElementById("lastName").value);
            }
            if(document.getElementById("oldPassword").value){
                checkPassword(document.getElementById("oldPassword").value);
            }
            if(document.getElementById("newPassword").value){
                checkPassword(document.getElementById("newPassword").value);
                checkNew(document.getElementById("oldPassword").value,document.getElementById("newPassword").value);
            }
            if(document.getElementById("confirmNewPassword").value){
                checkPassword(document.getElementById("confirmNewPassword").value);
                checkConfirm(document.getElementById("newPassword").value,document.getElementById("confirmNewPassword").value);
            }
            if(document.getElementById("state")){
                checkState(document.getElementById("state").value);
            }            
            if(document.getElementById("newProfilePictureLocation")){
                let fileInput = document.getElementById("newProfilePictureLocation");
                if(fileInput.files.length > 0){
                    try{
                        await checkIfFileExist(fileInput.files[0]);
                    }catch(e){
                        console.error(e);
                        throw e;
                    }                
                }
            }            
            valid3 = true;
            modify_form.submit();
            valid3 = false;

        }catch(e){
            const errorInfo = document.createElement('p');
            errorInfo.textContent = e;
            clientError3.innerHTML = '';
            clientError3.appendChild(errorInfo);
            clientError3.style.display = 'block';
        }
    }
});

let newProfilePictureLocation = document.getElementById("newProfilePictureLocation");
let previewImg = document.getElementById("previewImg");

newProfilePictureLocation.addEventListener('change', function(event){
    if(this.files && this.files[0]){
        previewImg.src = URL.createObjectURL(event.target.files[0]);
        // let reader = new FileReader();
        // reader.onload = function(e){
        //     previewImg.src = e.target.result;//Assign the data URL to the src attribute of img
        // }
        // reader.readAsDataURL(this.files[0]);
    }
});

