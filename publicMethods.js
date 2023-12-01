import { access } from 'fs/promises';
import {ObjectId} from "mongodb";

const exportedMethods = {
    validateId(id, valName){
        if (!id) throw `Error: You must provide an ${valName}`;
        if (typeof id !== 'string') throw `Error: ${valName} must be a string`;
        id = id.trim();
        if (id.length === 0)
            throw `Error:${valName}cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) {
            throw `Error: ${valName} must be an valid ObjectId`;
        }
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
    generateCurrentDate(){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return `${month}/${day}/${year} ${hour}:${minutes}`;
    },
    validateDateTime(inputDate){
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
    validateState(stateCode) {
    if (!stateCode) {
        throw "Error: State code is not supplied";
    }

    if (typeof stateCode !== "string" || stateCode.trim().length !== 2) {
        throw "Error: State code should be a valid two-letter string";
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
        throw "Error: Invalid state code";
    }
    return upperCaseStateCode;
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
    async validateIfFileExist(filePath, valName) {
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
    },
    validateArrayOfIds(Ids) {
        if (!Array.isArray(Ids)) {
            throw 'Error: reviewIds must be an array';
        }

        Ids.forEach((reviewId) => {
            if (typeof reviewId !== 'string') {
                throw 'Error: Each item in reviewIds must be a string';
            }

            if (reviewId.trim() !== '' && !ObjectId.isValid(reviewId)) {
                throw `Error: ${reviewId} is not a valid ObjectId`;
            }
        });
        return Ids;
    },
    validateReviewText(description){
        if (typeof description !== "string" || description.trim().length === 0) {
            throw `Error: description should be a valid string (no empty spaces)`;
        }
        description = description.trim();
        if(description.length < 5 || description > 10000){
            throw `Error: description should have more than 5 chars and less than 10 thousand chars`;
        }
        return description;
    },
    validateRating(rating){
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
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(name)) {
            throw `Error: ${valName} must only contain character a-z and should not contain numbers`;
        }
        if (name.length < 2 || name.length > 100) {
            throw `Error: ${valName} length must be at least 2 characters long with a max of 25 characters`
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
        const validCategories = ["whiskey", "vodka", "rum", "gin", "tequila", "brandy", "liqueur", "wine", "beer", "juice", "other"];

        if (!validCategories.includes(category)) {
            throw `Error: ${valName} is not a valid category in this bar. Valid categories are: ${validCategories.join(", ")}`;
        }

        return category;
    },
    validateDrinkRecipe(recipe){
        if (typeof recipe !== "string" || recipe.trim().length === 0) {
            throw `Error: recipe should be a valid string (no empty spaces)`;
        }
        recipe = recipe.trim();
        if(recipe.length < 5 || recipe > 10000){
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
    }



}
export default exportedMethods;