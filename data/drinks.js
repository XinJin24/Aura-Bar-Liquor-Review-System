import validation from "../publicMethods.js";
import {drinks, reviews, users} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import {getReviewInfoByReviewId} from "./reviews.js";

/**
 * @param {ObjectId} _id - A globally unique identifier for the specific drink.
 * @param {string} name - the Name of the drink.
 * @param {string} category - The type (liquor, cocktails) of the drink..
 * @param {string} recipe - The description of the drink.
 * @param {number} rating - Average rating of the drinks.
 * @param {array} reviews - An array that stores references (IDs) to the reviews.
 * @param {Array(String)} drinkPictureLocation - the location of the drink picture.
 * @param {number} price - the price of the drink.
 * @param {number} reservedCounts - The number of users who have reserved the specific drink.
 * @param {boolean} available - The boolean that indicate the available of the drink.
 * @param {number} stocks - The stock amount of the drink
 * @param {boolean} nameInLowerCase - the drinks name in lower case
 */

//"whiskey", "vodka", "rum", "gin", "tequila", "brandy", "liqueur", "wine", "beer", "juice", "other"
export const createDrink = async (
    name,
    category,
    recipe,
    drinkPictureLocation,
    stocks,
    price
) => {
    name = validation.validateDrinkName(name, "DrinkName");
    category = validation.validateDrinkCategory(category, "DrinkCategory");
    recipe = validation.validateDrinkRecipe(recipe);
    price = validation.validatePrice(price, "Drink Price");
    stocks = validation.validateStocks(stocks);

    const thisNameInLowerCase = name.toLowerCase();

    const drinkCollection = await drinks();
    const ifExist = await drinkCollection.findOne({nameInLowerCase: thisNameInLowerCase});
    if (ifExist) {
        throw `Error: ${name} is already exist in the drinks library.`;
    }
    drinkPictureLocation = await validation.validateIfFileExist(drinkPictureLocation);

    const drink = {
        name: name,
        category: category,
        recipe: recipe,
        rating: 0,
        reviews: [],
        drinkPictureLocation: drinkPictureLocation,
        price: price,
        reservedCounts: 0,
        available: true,
        stocks: stocks,
        nameInLowerCase: thisNameInLowerCase
    }

    const insertDrink = await drinkCollection.insertOne(drink);
    if (!insertDrink.acknowledged || !insertDrink.insertedId) {
        throw `Error: couldn't add drink with the drink name: ${name}`;
    }

    return {insertedDrink: true, _id: insertDrink.insertedId};

}

export const updateDrink = async (
    drinkId,
    name,
    category,
    recipe,
    drinkPictureLocation,
    stocks,
    price
) => {
    drinkId = validation.validateId(drinkId, "Drink Id");
    name = validation.validateDrinkName(name, "Drink Name");
    category = validation.validateDrinkCategory(category, "Drink Category");
    recipe = validation.validateDrinkRecipe(recipe);
    price = validation.validatePrice(price, "Drink Price");
    stocks = validation.validateStocks(stocks);

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});

    if (!drink) {
        throw `Error: drink with the drinkId: ${drink} not found`;
    }
    const oldDrinkPictureLocation = drink.drinkPictureLocation;
    if (drinkPictureLocation === "") {
        drinkPictureLocation = oldDrinkPictureLocation;
    } else {
        drinkPictureLocation = await validation.validateIfFileExist(drinkPictureLocation);
    }
    let available = drink.available;
    if(stocks === 0){
        available = false;
    }

    const updatedDrink = {
        name: name,
        category: category,
        recipe: recipe,
        drinkPictureLocation: drinkPictureLocation,
        price: price,
        stocks: stocks,
        available: available
    };

    const updateDrink = await drinkCollection.updateOne(
        {_id: drink._id},
        {$set: updatedDrink}
    );
    if (updateDrink.modifiedCount === 0) {
        return {updatedDrink: true};
    }
    //delete the old drink picture file
    try {
        if ((drinkPictureLocation !== oldDrinkPictureLocation) && oldDrinkPictureLocation !== '') {
            await validation.deleteAPicture(oldDrinkPictureLocation);
        }
    } catch (error) {
        throw `Error: Failed to delete old drink picture at ${oldDrinkPictureLocation}`;
    }
    return {updatedDrink: true};
}

export const deleteDrink = async (
    drinkId
) => {
    drinkId = validation.validateId(drinkId, "drinkId");

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});

    if (!drink) {
        throw `Error: drink with drinkId ${drinkId} not found, cannot delete`;
    }
    if (drink.available === false) {
        return {deleteDrink: true};
    }
    const updatedDrink = {
        available: false
    };
    const updateDrink = await drinkCollection.updateOne(
        {_id: drink._id},
        {$set: updatedDrink}
    );
    if (updateDrink.modifiedCount === 0) {
        throw `Error: Failed to delete drink with drinkId: ${drink._id}, drink name: ${drink.name}`;
    }
    return {deleteDrink: true};
}

export const restockDrink = async (
    drinkId, stockAmount
) => {
    drinkId = validation.validateId(drinkId, "drinkId");
    stockAmount = validation.validateStocks(stockAmount);

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});

    if (!drink) {
        throw `Error: drink with drinkId ${drinkId} not found, cannot delete`;
    }
    const originalStockAmount = drink.stocks;
    let updatedStockAmount = stockAmount;
    if (originalStockAmount) {
        updatedStockAmount = originalStockAmount + stockAmount;
    }

    if (updatedStockAmount > 500) {
        throw `Error: Failed to stock since the updated stocking would be exceed 500.`;
    }
    const updatedDrink = {
        available: true, stocks: updatedStockAmount
    };
    const updateDrink = await drinkCollection.updateOne(
        {_id: drink._id},
        {$set: updatedDrink}
    );
    if (updateDrink.modifiedCount === 0) {
        throw `Error: Failed to delete drink with drinkId: ${drink._id}, drink name: ${drink.name}`;
    }
    return {restockedDrink: true};
}


export const getDrinkInfoByDrinkId = async (
    drinkId
) => {
    drinkId = validation.validateId(drinkId, "drinkId");

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});

    if (!drink) {
        return;
    }

    const drinkInfo = {
        _id: drink._id.toString(),
        name: drink.name,
        category: drink.category,
        recipe: drink.recipe,
        rating: drink.rating,
        reviews: drink.reviews,
        drinkPictureLocation: drink.drinkPictureLocation,
        price: drink.price,
        reservedCounts: drink.reservedCounts,
        available: drink.available,
        stocks: drink.stocks,
        nameInLowerCase: drink.nameInLowerCase
    };
    return drinkInfo;
}

export const getAllDrinks = async () => {
    const drinkCollection = await drinks();
    const allDrinks = await drinkCollection.find({}).toArray();

    // if (!allDrinks || allDrinks.length === 0) {
    //     throw `Error: No drinks found`;
    // }

    const sortedDrinks = allDrinks.sort((a, b) => b.rating - a.rating);
    return sortedDrinks;
}

//sorted by timestamp
export const getAllReviewsOnADrink = async (drinkId) => {
    drinkId = validation.validateId(drinkId, "drinkId");

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});
    if (!drink) {
        throw `Error: drink with drinkId ${drinkId} not found`;
    }
    const reviewsOnThisDrink = drink.reviews;
    let reviewsArray = [];

    for (let j = 0; j < reviewsOnThisDrink.length; j++) {
        const reviewId = reviewsOnThisDrink[j].toString();
        const reviewCollection = await reviews();
        const userCollection = await users();
        const review = await reviewCollection.findOne({_id: new ObjectId(reviewId)});
        if(review){
            const user = await userCollection.findOne({_id: new ObjectId(review.userId)});
            if(user){
                const singleReview = {};
                singleReview.userProfilePictureLocation = user.profilePictureLocation;
                singleReview.reviewId = review._id.toString();
                singleReview.reviewPicture = review.reviewPictureLocation;
                singleReview.userId = user._id.toString();
                singleReview.owner = user.firstName + " " + user.lastName;
                singleReview.reviewText = review.reviewText;
                singleReview.timestamp = review.timeStamp;
                singleReview.rating = review.rating;
                reviewsArray.push(singleReview);
            }
        }
    }
    const sortedReviews = reviewsArray.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    });
    return sortedReviews;
};

export const increaseReservedCounts = async (
    drinkId
) => {
    drinkId = validation.validateId(drinkId, "drinkId");

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});

    if (!drink) {
        throw `Error: drink with drinkId ${drinkId} not found, cannot increase ReservedCounts`;
    }
    const currentCounts = drink.reservedCounts;
    const updatedCounts = currentCounts + 1;
    const currentStocks = drink.stocks;
    let available = true;
    if (drink.available === false) {
        available = false;
    }
    let updatedStocks = 0;
    if (currentStocks >= 1) {
        updatedStocks = currentStocks - 1;
    }
    if (updatedStocks === 0) {
        available = false;
    }
    const updatedDrink = {reservedCounts: updatedCounts, stocks: updatedStocks, available: available};
    const updateDrink = await drinkCollection.updateOne(
        {_id: drink._id},
        {$set: updatedDrink}
    );
    if (updateDrink.modifiedCount === 0) {
        throw `Error: Failed to increase ReservedCounts for drinkId: ${drink._id}, drink name: ${name}`;
    }
    return {increaseReservedCounts: true};
}

export const reserveDrink = async (
    userId, drinkId
) => {
    userId = validation.validateId(userId, "userId");
    drinkId = validation.validateId(drinkId, "drinkId");

    const userCollection = await users();
    const user = await userCollection.findOne({_id: new ObjectId(userId)});
    if (!user) {
        throw `Error: User with ID ${userId} not found`;
    }

    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});

    if (!drink) {
        throw `Error: drink with ID ${drinkId} not found`;
    }

    if (!drink.available || drink.stocks === 0) {
        throw `Error: drink with ID ${drinkId} not available, cannot reserve`;
    }

    const timestamp = validation.generateCurrentDate();
    const reservedDrink = {drinkId, timestamp};
    const updatedReservedDrinks = [...user.drinkReserved, reservedDrink];
    const updateResult = await userCollection.updateOne(
        {_id: user._id},
        {$set: {drinkReserved: updatedReservedDrinks}}
    );
    if (updateResult.modifiedCount === 0) {
        throw `Error: Failed to reserve drink for user with ID ${userId}`;
    }

    const increasedReservedCount = await increaseReservedCounts(drinkId);
    if (increasedReservedCount.increaseReservedCounts !== true) {
        throw `Error: Failed to drink reserved count for user with drink ID ${drink._id}`;
    }
    return {reservedDrink: true};
}

export const updateAllDrinkRating = async () => {
    try {
        const allDrinks = await getAllDrinks();
        for (const drink of allDrinks) {
            const reviews = drink.reviews;
            if (reviews.length !== 0) {
                let reviewCount = 0;
                let totalRating = 0;
                for (const review of reviews) {
                    const oneReview = await getReviewInfoByReviewId(review);
                    if(oneReview){
                        reviewCount++;
                        totalRating += oneReview.rating;
                    }
                }
                const rating = (totalRating / reviewCount).toFixed(1);
                const updatedDrinkRating = {
                    rating: rating,
                };
                const drinkCollection = await drinks();
                const updateDrink = await drinkCollection.updateOne(
                    {_id: drink._id},
                    {$set: updatedDrinkRating}
                );
            }else{
                const updatedDrinkRating = {
                    rating: 0,
                };
                const drinkCollection = await drinks();
                const updateDrink = await drinkCollection.updateOne(
                    {_id: drink._id},
                    {$set: updatedDrinkRating}
                );
            }

        }
        return {updatedAllDrinkRating: true};
    } catch (error) {
        throw "Error: Some problem occurred when updating all drinks review."
    }

};

export const addReviewIdToADrink = async (
    reviewId, drinkId
) => {
    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});

    const UpdatedReviewId = [...drink.reviews, reviewId];
    const updateResult = await drinkCollection.updateOne(
        {_id: drink._id},
        {$set: {reviews: UpdatedReviewId}}
    );
    return drink;
};

export const deleteReviewIdFromADrink = async (reviewId, drinkId) => {
    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});
    if (!drink) {
        throw `Error: drink with ID ${drinkId} not found`;
    }
    const UpdatedReviewId = drink.reviews.filter(review => review !== reviewId);
    const updateResult = await drinkCollection.updateOne(
        {_id: drink._id},
        {$set: {reviews: UpdatedReviewId}});
    if (updateResult.modifiedCount === 0) {
        throw `Error: Failed to delete the review io`;
    }
    return {reviewIdDeleted: true};
};
