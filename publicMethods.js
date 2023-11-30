import { access } from 'fs/promises';
import {ObjectId} from "mongodb";

const exportedMethods = {
    validateId(id){
        if (!id) throw 'Error: You must provide an id';
        if (typeof id !== 'string') throw 'Error: id must be a string';
        id = id.trim();
        if (id.length === 0)
            throw 'Error:id cannot be an empty string or just spaces';
        if (!ObjectId.isValid(id)) {
            throw 'Error: Id id an Invalid ObjectId';
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
    validateDescription(description){
        if (typeof description !== "string" || description.trim().length === 0) {
            throw `Error: description should be a valid string (no empty spaces)`;
        }
        description = description.trim();
        if(description.length < 5 || description > 10000){
            throw `Error: description should have more than 5 chars and less than 10 thousand chars`;
        }
        return description;
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
            throw new Error("Error: Email is not supplied");
        }
        if (typeof email !== "string" || email.trim().length === 0) {
            throw new Error("Error: Email should be a valid string (no empty spaces)");
        }
        email = email.trim().toLowerCase();
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const validDomains = ["com", "edu", "org", "net"]
        if (!emailRegex.test(email)) {
            throw new Error("Error: Email is in the wrong format");
        }

        const domain = email.split('@')[1].toLowerCase();
        if (!validDomains.some(validDomain => domain.endsWith(`.${validDomain}`))) {
            throw new Error("Error: Email has an unsupported domain");
        }
        return email;
    },
    validateState(stateCode) {
    if (!stateCode) {
        throw new Error("Error: State code is not supplied");
    }

    if (typeof stateCode !== "string" || stateCode.trim().length !== 2) {
        throw new Error("Error: State code should be a valid two-letter string");
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
        throw new Error("Error: Invalid state code");
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
    async validateIfFileExist(filePath) {
        try {
            await access(filePath);
            return filePath;
        } catch (err) {
            throw new Error(`Error: File at path ${filePath} does not exist or is inaccessible.`);
        }
    },
    validateArrayOfIds(Ids) {
        if (!Array.isArray(Ids)) {
            throw new Error('Error: reviewIds must be an array');
        }

        Ids.forEach((reviewId) => {
            if (typeof reviewId !== 'string') {
                throw new Error('Error: Each item in reviewIds must be a string');
            }

            if (reviewId.trim() !== '' && !ObjectId.isValid(reviewId)) {
                throw new Error(`Error: ${reviewId} is not a valid ObjectId`);
            }
        });
        return Ids;
    }
}
export default exportedMethods;