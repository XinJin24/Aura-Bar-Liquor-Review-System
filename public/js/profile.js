function redirectToPage(drinkId) {
    window.location.href =  '/drink/'+drinkId;
}

let checkName = (strVal, valName) => {
    if (!strVal) {
        throw `${valName} should be a string`;
    }
    if (typeof strVal !== "string") {
        throw `${valName} should be a string`;
    }
    strVal = strVal.trim();
    if (strVal.length < 2 || strVal.length > 25) {
        throw `${valName} should be at least 2 characters long with a max of 25 characters`;
    }
    if (!isNaN(strVal))
        throw `${valName}is not a valid value for name as it only contains digits`;
    return strVal;
}

let checkEmail = (strVal) => {
    if (!strVal) {
        throw `email is not provided`;
    }
    if (typeof strVal !== "string" || strVal.trim().length === 0) {
        throw `email is not strings or is empty strings`;
    }
    strVal = strVal.trim();
    let validEmail = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
    if (!validEmail.test(strVal)) {
        throw `email is not a valid email address`;
    }
    strVal = strVal.toLowerCase();
    return strVal;
}

let checkPassword = (password, valName) => {
    if (!password) throw `Error: ${valName} not supplied`;
    if (typeof password !== "string" || password.trim().length <= 0) {
        throw `Error: ${valName} must be a valid string(no empty spaces)!`;
    }
    password = password.trim();
    if (password.length < 8) {
        throw `Error: ${valName} must be at least 8 characters`;
    }
    if (/\s/.test(password)) throw `Error: password must not contain spaces`;
    //There needs to be at least one uppercase character
    if (!/[A-Z]/.test(password)) {
        throw `Error: ${valName} must contain at least one uppercase character`;
    }
    if (!/[a-z]/.test(password)) {
        throw `Error: ${valName} must contain at least one lowercase character`;
    }
    //at least one number
    if (!/\d/.test(password)) {
        throw `Error: ${valName} must contain at least one number`;
    }
    //at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw `Error: ${valName} must contain at least one special character`;
    }
    return password;
}

let checkConfirm = (code1, code2) => {
    if (code1 !== code2)
        throw "the confirmpassword does not match the password";
}

let checkPhoneNumber = (phoneNumber) => {
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
    return phoneNumber;
}

document.addEventListener('DOMContentLoaded', () => {
    const messageModal = document.getElementById("messageModal");
    const messageBtn = document.getElementById("messageBtn");
    const closeMessageModal = document.getElementById("closeMessageModal");

    if (messageBtn) {
        messageBtn.onclick = function () {
            messageModal.style.display = "block";
        }
    }

    if (closeMessageModal) {
        closeMessageModal.onclick = function () {
            messageModal.style.display = "none";
        }
    }

    const messageForm = document.getElementById("messageForm");
    if (messageForm) {
        messageForm.onsubmit = function (e) {
            e.preventDefault();
            const messageData = {
                message: this.message.value
            };
            $.ajax({
                type: "POST",
                url: "/",
                data: messageData,
                success: function (response) {
                    alert("Message sent successfully.");
                    messageModal.style.display = "none";
                },
                error: function (error) {
                    alert("Error sending message.");
                }
            });
        }
    }
    const editInfoModal = document.getElementById("editInfoModal");
    const editInfoBtn = document.getElementById("editUserInfoBtn");
    const closeEditInfoModal = document.getElementById("closeModal");
    const errorMessage = document.getElementById("error");

    if (editInfoBtn) {
        editInfoBtn.onclick = function () {
            editInfoModal.style.display = "block";
        }
    }

    if (closeEditInfoModal) {
        closeEditInfoModal.onclick = function () {
            editInfoModal.style.display = "none";
        }
    }
    const fileInput = document.getElementById('photoInput');
    const editInfoForm = document.getElementById("editInfoForm");
    if (editInfoForm) {
        editInfoForm.onsubmit = function (e) {
            e.preventDefault();
            errorMessage.innerHTML = "";
            errorMessage.classList.add('hidden-div');
            const formData = new FormData(this);

            let firstName = formData.get('firstName');
            let lastName = formData.get('lastName');
            let email = formData.get('email');
            let phoneNumber = formData.get('phoneNumber');
            let oldPassword = formData.get('oldPassword');
            let newPassword = formData.get('newPassword');
            let confirmNewPassword = formData.get('confirmNewPassword');


            try {
                firstName = checkName(firstName, "first name");
                lastName = checkName(lastName, "last name");
                email = checkEmail(email);
                phoneNumber = checkPhoneNumber(phoneNumber);
                oldPassword = checkPassword(oldPassword, "old password");
                newPassword = checkPassword(newPassword, "new password");
                confirmNewPassword = checkPassword(confirmNewPassword, "confirm password");
                checkConfirm(newPassword, confirmNewPassword);

                $.ajax({
                    type: "POST",
                    url: "/checkPassword",
                    data: {
                        oldPassword: oldPassword
                    },
                    success: function (response) {
                        fetch('/getUserId')
                            .then(response => {
                                if (!(response.ok)) throw "Error: Not logged in";
                                return response.json();
                            })
                            .then(data => {
                                const userId = data.userId.toString();
                                $.ajax({
                                    type: "POST",
                                    url: `/user/${userId}`,
                                    data: formData,
                                    processData: false,
                                    contentType: false,
                                    success: function (response) {
                                        alert("Information updated successfully.");
                                        editInfoModal.style.display = 'none';
                                    },
                                    error: function (error) {
                                        alert("Error happened when updating your information.");
                                    }
                                });
                            })
                            .catch(error => console.error('Error:', error));
                    },
                    error: function (error) {
                        errorMessage.classList.remove('hidden-div');
                        const msg = document.createElement('p');
                        msg.innerHTML = "Old Password is not correct" + error.responseText;
                        errorMessage.appendChild(msg);
                        return;
                    }
                });

            } catch (error) {
                errorMessage.classList.remove('hidden-div');
                const msg = document.createElement('p');
                msg.innerHTML = error;
                errorMessage.appendChild(msg);
                return;
            }
        }
    }

});
