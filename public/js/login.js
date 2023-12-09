
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
    return strVal;
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
        if(strVal.charAt(i) === ''){
            throw `password shouldn't have spaces`;
        }
    }
    return strVal;
}

// let clientError1 = document.getElementById("clientError1");
// clientError1.style.display = 'none';
// let valid1 = false;

let login_form = document.getElementById("login_form");
let emailAddressInput = document.getElementById("emailAddressInput");
let passwordInput = document.getElementById("passwordInput");
let error = document.getElementById('error')

console.log(login_form);
console.log(typeof login_form);
console.log(login_form.submit);


if(login_form){
    login_form.addEventListener('submit', (event) =>{
        event.preventDefault();
        error.innerHTML = "";
        error.classList.add('hidden-div');
        let emailAddress = emailAddressInput.value;
        let password = passwordInput.value;
        try {
            emailAddress = checkEmail(emailAddress);
        } catch (e){
            console.log(e);
            error.classList.remove('hidden-div');
            const msg = document.createElement('p');
            msg.innerHTML = e;
            error.appendChild(msg);
        }

        try {
            password = checkPassword(password);
        } catch (e) {
            console.log(e);
            error.classList.remove('hidden-div');
            const msg = document.createElement('p');
            msg.innerHTML = e;
            error.appendChild(msg);
        }

        if (error.children.length === 0) {
            login_form.submit();
        } else {
            return;
        }
    });
    console.log(login_form.submit);
}
// login_form.addEventListener = ('submit', (event) =>{
//     //stop default behaviour of the form submission
//     if(!valid1){
//         event.preventDefault();let checkEmail = (strVal) =>{
//     if(!strVal){
//         throw `email is not provided`;
//     }
//     strVal = strVal.trim();
//     if(typeof strVal !== "string" || strVal.length === 0){
//         throw `email is not strings or is empty strings`;
//     }
//     let validEmail = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
//     if(!validEmail.test(strVal)){
//         throw `email is not a valid email address`;
//     }
//     strVal = strVal.toLowerCase();
//     return strVal;
// }
//
// let checkPassword = (strVal)=>{
//     if(!strVal){
//         throw `password is not provided`;
//     }
//     strVal = strVal.trim();
//     if(typeof strVal !== "string" || strVal.length === 0){
//         throw `password is not strings or is empty strings`;
//     }
//     if(strVal.length < 8){
//         throw `password should be a minimum of 8 characters long`;
//     }
//     if(!/A-Z/){
//         throw `password needs to be at least one uppercase character`;
//     }
//     if(!/\d/){
//         throw `password needs to be at least one number `;
//     }
//     if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(strVal)){
//         throw `password needs to be at least one special character`;
//     }
//     for(let i = 0; i < strVal.length; i++){
//         if(strVal.charAt(i) === ''){
//             throw `password shouldn't have spaces`;
//         }
//     }
//     return strVal;
// }
//
// // let clientError1 = document.getElementById("clientError1");
// // clientError1.style.display = 'none';
// // let valid1 = false;
//
// let login_form = document.getElementById("login_form");
// let emailAddressInput = document.getElementById("emailAddressInput");
// let passwordInput = document.getElementById("passwordInput");
// let error = document.getElementById('error')
//
// console.log(login_form);
// console.log(typeof login_form);
// console.log(login_form.submit);
//
//
// if(login_form){
//     login_form.addEventListener('submit', (event) =>{
//         event.preventDefault();
//         error.innerHTML = "";
//         error.classList.add('hidden-div');
//         let emailAddress = emailAddressInput.value;
//         let password = passwordInput.value;
//         try {
//             emailAddress = checkEmail(emailAddress);
//         } catch (e){
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
//         if (error.children.length === 0) {
//             login_form.submit();
//         } else {
//             return;
//         }
//     });
//     console.log(login_form.submit);
// }
//         try{
//             if(emailAddressInput){
//                 checkEmail(emailAddressInput.value);
//             }
//             if(passwordInput){
//                 checkPassword(passwordInput.value);
//             }
//             valid1 = true;
//             login_form.submit();
//             valid1 = false;
//         }catch(e){
//             const errorInfo = `<p>${e}</p>`;
//             clientError1.innerHTML = errorInfo;
//             clientError1.style.display = 'block';
//         }
//     }
// });