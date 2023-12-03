import validation from "../publicMethods.js";
import {drinks, users} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";

/**
 * @param {ObjectId} _id - A globally unique identifier for the specific drink.
 * @param {string} name - the Name of the drink.
 * @param {string} category - The type (liquor, cocktails) of the drink..
 * @param {string} recipe - The description of the drink.
 * @param {number} rating - Average rating of the drinks.
 * @param {array} reviews - An array that stores references (IDs) to the reviews.
 * @param {Array(String)} drinkPictureLocation - the location of the drink picture.
 * @param {number} price - the price of the drink.
 * @param {number} reservedCounts - The number of users who have reserved the specific drink..
 * @param {boolean} available - The boolean that indicate the available of the drink.
 */
export const createDrink = async (
    name,
    category,
    recipe,
    rating,
    drinkPictureLocation,
    price,
) => {
    name = validation.validateDrinkName(name, "DrinkName");
    category = validation.validateDrinkCategory(category, "DrinkCategory");
    recipe = validation.validateDrinkRecipe(recipe);
    rating = validation.validateRating(rating);
    drinkPictureLocation = await validation.validateIfFileExist(drinkPictureLocation);
    price = validation.validatePrice(price, "Drink Price");

    const drinkCollection = await drinks();
    const ifExist = await drinkCollection.findOne({name: name});
    if (ifExist) {
        throw `Error: ${name} is already exist in the drinks library.`;
    }
    const drink = {
        name: name,
        category: category,
        recipe: recipe,
        rating: rating,
        reviews: [],
        drinkPictureLocation: drinkPictureLocation,
        price: price,
        reservedCounts: 0,
        available: true
    }

    const insertDrink = await drinkCollection.insertOne(drink);
    if (!insertDrink.acknowledged || !insertDrink.insertedId) {
        throw `Error: couldn't add drink with the drink name: ${name}`;
    }
    return {insertedDrink: true};

}

export const updateDrink = async (
    drinkId,
    name,
    category,
    recipe,
    rating,
    reviews,
    drinkPictureLocation,
    price,
    reservedCounts,
    available
) => {
    drinkId = validation.validateId(drinkId, "Drink Id");
    name = validation.validateDrinkName(name, "Drink Name");
    category = validation.validateDrinkCategory(category, "Drink Category");
    recipe = validation.validateDrinkRecipe(recipe);
    rating = validation.validateRating(rating);
    reviews = validation.validateIfArray(reviews, "reviews array");
    drinkPictureLocation = await validation.validateIfFileExist(drinkPictureLocation);
    price = validation.validatePrice(price, "Drink Price");
    available = validation.validateIfTrueOrFalse(available, "drink's availability");

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({ _id: new ObjectId(drinkId) });

    if (!drink) {
        throw `Error: drink with the drinkId: ${drink} not found`;
    }

    const updatedDrink = {
        name: name,
        category: category,
        recipe: recipe,
        rating: rating,
        reviews: reviews,
        drinkPictureLocation: drinkPictureLocation,
        price: price,
        reservedCounts: reservedCounts,
        available: available
    };
    const updateDrink = await drinkCollection.updateOne(
        { _id: drink._id },
        { $set: updatedDrink }
    );
    if (updateDrink.modifiedCount === 0) {
        throw `Error: Failed to update drink with drinkId: ${drink._id}, drink name: ${name}`;
    }
    return { updatedDrink: true };
}

export const deleteDrink = async (
    drinkId
) => {
    drinkId = validation.validateId(drinkId,"drinkId");

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({ _id: new ObjectId(drinkId)});

    if (!drink) {
        throw `Error: drink with drinkId ${drinkId} not found, cannot delete`;
    }
    const updatedDrink ={
        available: false
    };
    const updateDrink = await drinkCollection.updateOne(
        { _id: drink._id },
        { $set: updatedDrink }
    );
    if (updateDrink.modifiedCount === 0) {
        throw `Error: Failed to delete drink with drinkId: ${drink._id}, drink name: ${name}`;
    }
    return { deleteDrink: true };
}

export const getDrinkInfoByDrinkId = async (
    drinkId
) => {
    drinkId = validation.validateId(drinkId,"drinkId");

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({ _id: new ObjectId(drinkId)});

    if (!drink) {
        throw `Error: drink with drinkId ${drinkId} not found`;
    }

    const drinkInfo = {
        _id:drink._id.toString(),
        name: drink.name,
        category: drink.category,
        recipe: drink.recipe,
        rating: drink.rating,
        reviews: drink.reviews,
        drinkPictureLocation: drink.drinkPictureLocation,
        price: drink.price,
        reservedCounts: drink.reservedCounts,
        available: drink.available,
    };

    return drinkInfo;
}

export const getAllDrinks = async () => {
    const drinkCollection = await drinks();
    const drinks = await drinkCollection.find({});
    if (!drinks) {
        throw `Error: no Drinks found`;
    }
    return { drinks: drinks };
}


export const getAllReviewsOnADrink = async (
    drinkId
) => {
    drinkId = validation.validateId(drinkId,"drinkId");

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({ _id: new ObjectId(drinkId)});
    if (!drink) {
        throw `Error: drink with drinkId ${drinkId} not found`;
    }
    return drink.reviews;
}

export const increaseReservedCounts = async (
    drinkId
) => {
    drinkId = validation.validateId(drinkId,"drinkId");

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({ _id: new ObjectId(drinkId)});

    if (!drink) {
        throw `Error: drink with drinkId ${drinkId} not found, cannot increase ReservedCounts`;
    }
    const currentCounts =  drink.reservedCounts;
    const updatedCounts = currentCounts + 1;
    const updatedDrink = { reservedCounts: updatedCounts };
    const updateDrink = await drinkCollection.updateOne(
        { _id: drink._id },
        { $set: updatedDrink }
    );
    if (updateDrink.modifiedCount === 0) {
        throw `Error: Failed to increase ReservedCounts for drinkId: ${drink._id}, drink name: ${name}`;
    }
    return { increaseReservedCounts: true };
}
export const reserveDrink = async (userId, drinkId) => {
    userId = validation.validateId(userId, "userId");
    drinkId = validation.validateId(drinkId, "drinkId");

    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
        throw `Error: User with ID ${userId} not found`;
    }

    const timestamp = validation.generateCurrentDate();
    const reservedDrink = { drinkId, timestamp };

    const updatedReservedDrinks = [...user.drinkReserved, reservedDrink];

    const updateResult = await userCollection.updateOne(
        { _id: user._id },
        { $set: { drinkReserved: updatedReservedDrinks } }
    );

    if (updateResult.modifiedCount === 0) {
        throw `Error: Failed to reserve drink for user with ID ${userId}`;
    }

    return { reservedDrink, userId };
};

