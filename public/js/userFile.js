import { access } from 'fs/promises';
let userFile_form = document.getElementById(userFile-form);

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

userFile_form.addEventListener = ('submit3', async (event) =>{
    if(!valid3){
        event.preventDefault();
        try{
            if(document.getElementById(firstNameInput3)){
                checkName(document.getElementById(firstNameInput3).value);
            }
            if(document.getElementById(lastNameInput3)){
                checkName(document.getElementById(lastNameInput3).value);
            }
            if(document.getElementById(photoInput3)){
                let fileInput = document.getElementById(photoInput3);
                if(fileInput.files.length > 0){
                    try{
                        await checkIfFileExist(fileInput.files[0]);
                    }catch(e){
                        console.error(e);
                        throw e;
                    }                
                }
            }

            //没加review展示
            valid3 = true;
            registration_form.submit();
            valid3 = false;

        }catch(e){
            const errorInfo = <p>${e}</p>;
            clientError3.innerHTML = errorInfo;
            clientError3.style.display = 'block';
        }
    }
});

let photoInput = document.getElementById('photoInput3');
let previewImg = document.getElementById('previewImg3');

photoInput.addEventListener('change', function(){
    if(this.files && this.files[0]){
        let reader = new FileReader();
        reader.onload = function(e){
            previewImg.src = e.target.result;//Assign the data URL to the src attribute of img
        }
        reader.readAsDataURL(this.files[0]);
    }
});
