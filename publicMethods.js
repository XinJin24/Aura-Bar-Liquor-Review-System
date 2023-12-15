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
        const dateTimeRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(20[2-9][0-9]) ([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

        if (typeof inputDate !== "string") {
            throw "DateTime must be a string.";
        }
        if (!dateTimeRegex.test(inputDate)) {
            throw "Invalid date and time format. Must be in MM/DD/YYYY HH:MM format.";
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
        if(!file || file === "")return "";
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
        let numericRating;
        if (typeof rating === "string") {
            rating = rating.trim();
            if (rating.length === 0) throw "Rating cannot be all empty spaces";

            numericRating = Number(rating);

            if (isNaN(numericRating)) {
                throw "Rating should be a valid number.";
            }
        } else if (typeof rating === "number") {
            numericRating = rating;
        } else {
            throw "Rating should be a number or a string representing a number.";
        }
        if (numericRating < 0 || numericRating > 5) {
            throw "Rating should be between 0 and 5.";
        }
        if (!/^\d+(\.\d{1,2})?$/.test(numericRating.toString())) {
            throw "Rating should have at most two decimal places.";
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
        const hasAlphabet = /[a-zA-Z]/.test(name);
        const validCharacters = /^[a-zA-Z0-9\sáéíóúüñäëïöü]*$/;
        if (!hasAlphabet || !validCharacters.test(name)) {
            throw `Error: ${valName} must contain at least one alphabet character and only include alphabets, numbers, spaces, and special characters áéíóúüñäëïöü`;
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
        price = Number(price);
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
        if(filePath ==="../public/pictures/defaultUserProfilePicture.jpg"){
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
    },
    validateStocks(stocks) {
        if (typeof stocks !== "string" && typeof stocks !== "number") {
            throw `Error: stocks should be a valid number (no empty spaces)`;
        }
        if(typeof stocks === 'string' && stocks.trim().length !==0){
            stocks = stocks.trim();
            if (!/^\d+$/.test(stocks)) {
                throw `Error: stocks must be an integer.`;
            }
            stocks = Number(stocks);
        }
        if (!Number.isInteger(stocks)) {
            throw `Error: stocks must be a whole number.`;
        }
        if (isNaN(stocks)) {
            throw `Error: stocks must be a valid number.`;
        }
        if (stocks < 0 || stocks > 500) {
            throw `Error: stocks amount should be between 0 and 500.`;
        }
        return stocks;
    }
}
export default exportedMethods;