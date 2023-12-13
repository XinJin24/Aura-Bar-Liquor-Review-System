import {access, copyFile, mkdir, unlink} from 'fs/promises';
import {ObjectId} from "mongodb";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import {copyPictureAndReturnPath} from "./data/users.js";

const exportedMethods = {
    validateId(id, valName) {
        if (!id) throw `Error: You must provide an ${valName}`;
        if (typeof id !== 'string') throw `Error: ${valName} must be a string`;
        id = id.trim();
        if (id.length === 0)
            throw `Error:${valName}cannot be an empty string or just spaces`;
        return id;
    },
    validateName(name, valName) {
        if (!name) {
            throw `Error: ${valName} not supplied`;
        }
        if (typeof name !== "string" || name.trim().length === 0) {
            throw `Error: ${valName} should be a valid string (no empty spaces)`;
        }

        name = name.trim();
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(name)) {
            throw `Error: ${valName} must only contain character a-z and should not contain numbers`;
        }
        if (name.length < 2 || name.length > 25) {
            throw `Error: ${valName} length must be at least 2 characters long with a max of 25 characters`
        }
        return name;
    },
    generateCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return `${month}/${day}/${year} ${hour}:${minutes}`;
    },
    validateDateTime(inputDate) {
        const currentDate = new Date();

        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(inputDate)) {
            throw `Error: ${inputDate} is not a valid date.`;
        }

        const [datePart, timePart] = inputDate.split(" ");
        const [month, day, year] = datePart.split("/").map(Number);

        const validYear = currentDate.getFullYear() + 2;

        if (year < 1900 || year > validYear || month === 0 || month > 12) {
            throw `Error: ${inputDate} is not a valid date.`;
        }

        const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if ((year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) && month === 2) {
            monthLength[1] = 29;
        }

        if (!(day > 0 && day <= monthLength[month - 1])) {
            throw `Error: ${inputDate} is not a valid date.`;
        }

        if (!/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(timePart)) {
            throw `Error: ${inputDate} is not a valid time.`;
        }

        return inputDate;
    },
    validateEmail(email) {
        if (!email) {
            throw "Error: Email is not supplied";
        }
        if (typeof email !== "string" || email.trim().length === 0) {
            throw "Error: Email should be a valid string (no empty spaces)";
        }
        email = email.trim().toLowerCase();
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const validDomains = ["com", "edu", "org", "net"]
        if (!emailRegex.test(email)) {
            throw "Error: Email is in the wrong format";
        }

        const domain = email.split('@')[1].toLowerCase();
        if (!validDomains.some(validDomain => domain.endsWith(`.${validDomain}`))) {
            throw "Error: Email has an unsupported domain";
        }
        return email;
    },
    validatePassword(password, valName) {
        if (!password) throw `Error: ${valName} not supplied`;
        if (typeof password !== "string" || password.trim().length <= 0) {
            throw `Error: ${valName} must be a valid string(no empty spaces)!`;
        }
        password = password.trim();
        if (password.length < 8) {
            throw `Error: ${valName} must be at least 8 characters`;
        }
        if (/\s/.test(password)) throw `Error: ${valName} must not contain spaces`;
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
    },
    validateRole(role) {
        if (!role) throw "Error: role not provided";
        if (typeof role !== "string") {
            throw "Error: Role must be a string!";
        }
        if (role.trim().length <= 0) {
            throw "Error: role must  not be empty";
        }
        role = role.trim().toLowerCase();
        if (role !== "admin" && role !== "user") {
            throw "Error: Role can only be admin or user";
        }
        return role;
    },
    async validateIfFileExist(file, valName) {
        if(!file)return "";
        if(typeof file === 'string'){
            try {
                await access(file);
                const currentFilePath = fileURLToPath(import.meta.url);
                const currentDirPath = dirname(currentFilePath);
                const picturesDir = join(currentDirPath, 'public', 'pictures');
                await mkdir(picturesDir, { recursive: true });
                const fileName = `${Date.now()}_${file.split("\\").pop()}`;
                const newFilePath = join(picturesDir, fileName);
                try {
                    //file already exist
                    await access(newFilePath);
                    return `..\\pictures\\${fileName}`;
                } catch (err) {
                    //file not exist, copy
                    await copyFile(file, newFilePath);
                    await access(newFilePath);
                    return `..\\pictures\\${fileName}`;
                }
            } catch (err) {
                throw `Error: Some error happened when processing your photos`;
            }
        }else{
             return await copyPictureAndReturnPath(file, valName);
        }
    },
    validateArrayOfIds(Ids) {
        if (!Array.isArray(Ids)) {
            throw 'Error: reviewIds must be an array';
        }
        if (Ids.length !== 0) {
            Ids.forEach((reviewId) => {
                if (typeof reviewId !== 'string') {
                    throw 'Error: Each item in reviewIds must be a string';
                }

                if (reviewId.trim() !== '' && !ObjectId.isValid(reviewId)) {
                    throw `Error: ${reviewId} is not a valid ObjectId`;
                }
            });
        }
        return Ids;
    },
    checkPhoto(photo) {
        if (!(photo instanceof Array)) {
            throw "photo should be an array of strings";
        }
        for (let i = 0; i < photo.length; i++) {
            if (typeof photo[i] !== "string") {
                throw "each element in photo should be a string";
            }
        }
        return photo;
    },
    validateReviewText(description) {
        if (typeof description !== "string" || description.trim().length === 0) {
            throw `Error: description should be a valid string (no empty spaces)`;
        }
        description = description.trim();
        if (description.length < 5 || description > 10000) {
            throw `Error: description should have more than 5 chars and less than 10 thousand chars`;
        }
        return description;
    },
    validateRating(rating) {
        if (typeof rating !== "string" || rating.trim().length === 0) {
            throw `Error: rating should be a valid string with number 0 - 5(no empty spaces)`;
        }
        rating = rating.trim();
        const numericRating = Number(rating);
        if (isNaN(numericRating)) {
            throw `Error: rating should be a valid number between 0 and 5.`;
        }
        if (numericRating < 0 || numericRating > 5) {
            throw `Error: rating should be between 0 and 5.`;
        }
        return numericRating;
    },
    validateDrinkName(name, valName) {
        if (!name) {
            throw `Error: ${valName} not supplied`;
        }
        if (typeof name !== "string" || name.trim().length === 0) {
            throw `Error: ${valName} should be a valid string (no empty spaces)`;
        }

        name = name.trim();
        const nameRegex = /^[a-zA-Z0-9\sáéíóúüñäëïöü']+$/;
        if (!nameRegex.test(name)) {
            throw `Error: ${valName} must only contain alphanumeric characters (a-z, A-Z, 0-9), spaces, and special characters including ' and should not contain other special characters`;
        }
        if (name.length < 2 || name.length > 100) {
            throw `Error: ${valName} length must be at least 2 characters long with a max of 100 characters`;
        }

        return name;
    },
    validateDrinkCategory(category, valName) {
        if (!category) {
            throw `Error: ${valName} not supplied`;
        }
        if (typeof category !== "string" || category.trim().length === 0) {
            throw `Error: ${valName} should be a valid string (no empty spaces)`;
        }
        category = category.trim().toLowerCase();
        const validCategories = ["whiskey", "vodka", "rum", "gin", "tequila", "brandy", "liqueur", "wine", "beer", "juice", "champagne","bourbon","mix"];

        if (!validCategories.includes(category)) {
            throw `Error: ${valName} is not a valid category in this bar. Valid categories are: ${validCategories.join(", ")}`;
        }

        return category;
    },
    validateDrinkRecipe(recipe) {
        if (typeof recipe !== "string" || recipe.trim().length === 0) {
            throw `Error: recipe should be a valid string (no empty spaces)`;
        }
        recipe = recipe.trim();
        if (recipe.length < 5 || recipe > 10000) {
            throw `Error: recipe should have more than 5 chars and less than 10 thousand chars`;
        }
        return recipe;
    },
    validatePrice(price, valName) {
        if (typeof price !== "number") {
            throw `Error: ${valName} must be a valid number.`;
        }
        if (price < 0) {
            throw `Error: ${valName} cannot be a negative value.`;
        }
        return price;
    },
    validateIfArray(arr, valName) {
        if (!Array.isArray(arr)) {
            throw `Error: ${valName} must be an array.`;
        }
        if (arr.length === 0) {
            return arr;
        }
        for (const element of arr) {
            if (typeof element !== 'string' || !ObjectId.isValid(element)) {
                throw `Error: All elements in ${valName} must be valid ObjectId.`;
            }
        }
        return arr;
    },
    validateIfTrueOrFalse(val, valName) {
        if (val !== true && val !== false) {
            throw `Error: ${valName} must be either true or false.`;
        }
        return val;
    },
    validatePhoneNumber(phoneNumber) {
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
    },validateCallForServiceMessage(message) {
        if (typeof message !== "string" || message.trim().length === 0) {
            throw `Error: message should be a valid string (no empty spaces)`;
        }
        message = message.trim();
        if (message.length < 2 || message > 200) {
            throw `Error: message should have more than 2 chars and less than 10 thousand chars`;
        }
        return message;
    },
    async deleteAPicture(filePath) {
        if(filePath ==="public/pictures/defaultUserProfilePicture.jpg"){
            return {pictureDeleted: true}
        }
        if (filePath !== '') {
            try{
                const currentFilePath = fileURLToPath(import.meta.url);
                const currentDirPath = dirname(currentFilePath);
                const absolutePath = currentDirPath + filePath.replace("..","");
                await access(absolutePath);
                await unlink(absolutePath);
                return {pictureDeleted: true}
            }catch (error){
                console.log(error);
            }

        } else {
            return {pictureDeleted: true}
        }
    }
}
export default exportedMethods;