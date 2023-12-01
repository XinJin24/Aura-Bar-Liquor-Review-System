import {users} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import validation from "../publicMethods.js";
import bcrypt from 'bcrypt';

export const createUser = async (
    firstName,
    lastName,
    email,
    state,
    password,
    // profilePictureLocation,
    photo,
    role
) => {
    firstName = validation.validateName(firstName, "firstName");
    lastName = validation.validateName(lastName, "lastName");
    email = validation.validateEmail(email, "email");
    state = validation.validateState(state);
    password = validation.validatePassword(password, "password");
    // profilePictureLocation = validation.validateIfFileExist(profilePictureLocation);
    photo = validation.checkPhoto(photo);
    role = validation.validateRole(role);

    const userCollection = await users();
    const ifExist = await userCollection.findOne({email: email});
    if (ifExist) {
        throw `Error: ${email} is already registered, Please Login`;
    }
    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        state: state,
        password: await bcrypt.hash(password, 15),
        reviewIds: [],
        // profilePictureLocation: profilePictureLocation,
        photo: photo,
        drinkReserved: [],
        role: role
    }

    const insertUser = await userCollection.insertOne(user);
    if (!insertUser.acknowledged || !insertUser.insertedId) {
        throw `Error: couldn't register the account: ${email}`;
    }
    return {insertedUser: true};
}

export const loginUser = async (email, password) => {
    email = validation.validateEmail(email);
    password = validation.validatePassword(password);

    const userCollection = await users();
    const user = await userCollection.findOne({
        emailAddress: email
    });
    if (!user) {
        throw "Error: Either the email address or password is invalid";
    }
    const checkPassword = await bcrypt.compare(
        password,
        user.password
    );
    if (!checkPassword) {
        throw "Error: Either the email address or password is invalid"
    } else {
        return {
            userId: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            state: user.state,
            reviewIds: user.reviewIds,
            photo: user.photo,
            // profilePictureLocation: user.profilePictureLocation,
            drinkReserved: user.drinkReserved,
            role: user.role
        };
    }
};

export const updateUser = async (
    firstName,
    lastName,
    email,
    state,
    password,
    reviewIds,
    profilePictureLocation,
    drinkReserved,
    role
) => {
    firstName = validation.validateName(firstName, "firstName");
    lastName = validation.validateName(lastName, "lastName");
    email = validation.validateEmail(email, "email");
    state = validation.validateState(state);
    password = validation.validatePassword(password, "password");
    reviewIds = validation.validateArrayOfIds(reviewIds);
    profilePictureLocation = validation.validateIfFileExist(profilePictureLocation);
    drinkReserved = drinkReserved.validation.validateArrayOfIds(drinkReserved);
    role = validation.validateRole(role);

    const userCollection = await users();
    const user = await userCollection.findOne({ email: email });

    if (!user) {
        throw `Error: User with email ${email} not found`;
    }
    const updatedUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        state: state,
        password: await bcrypt.hash(password, 15),
        reviewIds: reviewIds,
        profilePictureLocation: profilePictureLocation,
        drinkReserved: drinkReserved,
        role: role,
    };
    const updateUser = await userCollection.updateOne(
        { _id: user._id },
        { $set: updatedUser }
    );
    if (updateUser.modifiedCount === 0) {
        throw `Error: Failed to update user with email ${email}`;
    }

    return { updatedUser: true };
}

export const getAllReviewsByUserId = async (
    userId
) => {
    userId = validation.validateId(userId,"userId");

    const userCollection = await users();
    const user = await
        userCollection
        .find({ _id: new ObjectId(userId) });

    if (!user) {
        throw `Error: User with ID ${userId} not found, Cannot get his/her reviews`;
    }
    return user.reviewIds||[];
}

export const getAllDrinkReservedByUserId = async (
    userId
)=> {
    userId = validation.validateId(userId,"userId");
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
        throw `Error: User with ID ${userId} not found`;
    }

    return user.drinkReserved || [];
}

export const getUserInfoByUserId = async (
    userId
)=> {
    userId = validation.validateId(userId,"userId");
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
        throw `Error: User with ID ${userId} not found`;
    }
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        state: user.state,
        reviewIds: user.reviewIds,
        profilePictureLocation: user.profilePictureLocation,
        drinkReserved: user.drinkReserved,
        role: user.role
    };
}

export const getUserInfoByEmail = async (
    email
)=> {
    email = validation.validateEmail(email);
    const userCollection = await users();
    const user = await userCollection.findOne({ email: email });

    if (!user) {
        throw `Error: User with email ${email} not found`;
    }
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        state: user.state,
        reviewIds: user.reviewIds,
        profilePictureLocation: user.profilePictureLocation,
        drinkReserved: user.drinkReserved,
        role: user.role
    };
}

export const getUserIdByEmail = async (
    email
)=> {
    email = validation.validateEmail(email);
    const userCollection = await users();
    const user = await userCollection.findOne({ email: email });

    if (!user) {
        throw `Error: User with email ${email} not found`;
    }
    return {
        id: user._id.toString()
    };
}


export const deleteOneReviewFromUser = async (
    reviewId, userId
)=> {
    reviewId = validation.validateId(reviewId, "reviewId");
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(userId)});
    if (!user) {
        throw `Error: User with email ${userId} not found`;
    }
    let reviewList = user.reviewIds;
    for (let i = 0; i < reviewList.length; i++) {
        const element = reviewList[i];
        if (element === reviewId) {
            reviewList.splice(i, 1);
        }
    }
    const updateReviewIds = await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { reviewIds: reviewList } }
    );
    if (!updateReviewIds) {
        throw `Error: Could not delete reviewId${reviewId} from user!`;
    }
    return true;
}