import validation from "../publicMethods.js";
import {drinks, reviews, users} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import {deleteOneReviewFromUser} from "./user.js";
import {deleteReviewIdFromADrink, updateAllDrinkRating} from "./drinks.js";

/**
 * @param {ObjectId} _id - A unique identifier that guarantees the uniqueness of each review.
 * @param {string} timestamp - The time that the review is posted.
 * @param {string} drinkId - An identifier that represents each drink.
 * @param {string} userId - TAn identifier that represents the user who wrote comments under the review.
 * @param {string} reviewText - The detailed review text.
 * @param {number} rating - The rating for that particular drink from range 1-5, provided by the user.
 * @param {String} reviewPictureLocation - the location for storing review picture.
 */
export const createReview = async (
    drinkId,
    userId,
    reviewText,
    rating,
    reviewPictureLocation
) => {
    drinkId = validation.validateId(drinkId.toString(), "drinkId");
    userId = validation.validateId(userId, "userId");
    reviewText = validation.validateReviewText(reviewText);
    rating = validation.validateRating(rating);
    reviewPictureLocation = await validation.validateIfFileExist(reviewPictureLocation);

    // create and insert a new review
    const reviewCollection = await reviews();
    const review = {
        timeStamp: validation.generateCurrentDate(),
        drinkId: drinkId,
        userId: userId,
        reviewText: reviewText,
        rating: rating,
        reviewPictureLocation: reviewPictureLocation
    }
    const insertReview = await reviewCollection.insertOne(review);
    if (!insertReview.acknowledged || !insertReview.insertedId) {
        throw `Error: couldn't add review`;
    }
    else{
        // updating the user
        try{
            const userCollection = await users();
            const user = await userCollection.findOne({_id: new ObjectId(userId)});
            if(!user){
                throw `Error: Can't add the review since the userId isn't exist`;
            }

            let originalReviewId = user.reviewIds;
            originalReviewId.push(insertReview.insertedId.toString());
            const updatedUser = await userCollection.updateOne(
                {_id: new ObjectId(userId)},
                {$set: {reviewIds:originalReviewId}}
            );

            //updating the drink
            const drinkCollection = await drinks();
            const drink = await drinkCollection.findOne({_id: new ObjectId(drinkId)});
            if(!drink){
                throw `Error: Can't add the review since the drinkId isn't exist`;
            }
            let originalReviews = drink.reviews;
            let userHistoryReviews = user.reviewIds;

            let alreadyMadeAReview = userHistoryReviews.some(review => originalReviews.includes(review));

            if (alreadyMadeAReview) {
                throw "User has already reviewed this drink.";
            }

            originalReviews.push(insertReview.insertedId.toString());
            const updatedDrink = await drinkCollection.updateOne(
                {_id: new ObjectId(drinkId)},
                {$set: {reviews:originalReviews}}
            );
            const updateDrinkRating = await updateAllDrinkRating();
            if (updateDrinkRating.updatedAllDrinkRating !==true) {
                throw "Error: Some issue happened when updating all drinks' rating"
            }
            return {insertedReview: true};

        } catch (error){
            const reviewIdToRemove = insertReview.insertedId;

            const userCollection = await users();
            const removeTheReivewIdFromUserCollection = await userCollection.updateMany(
                { reviewIds: reviewIdToRemove },
                { $pull: { reviewIds: reviewIdToRemove } }
            );

            const drinkCollection = await drinks();
            const removeTheReivewIdFromDrinkCollection = await drinkCollection.updateMany(
                { reviewIds: reviewIdToRemove },
                { $pull: { reviews: reviewIdToRemove } }
            );

            const deleteTheNewlyCreatedReview = await reviewCollection.deleteOne({ _id: new ObjectId(reviewIdToRemove) });

            if (removeTheReivewIdFromUserCollection.modifiedCount !== 0) {
                console.log('error happened, the newly created review was removed from the user collection');
            }

            if (removeTheReivewIdFromDrinkCollection.modifiedCount !== 0) {
                console.log('error happened, the newly created review was removed from the drink collection');
            }

            if (deleteTheNewlyCreatedReview.modifiedCount !== 0) {
                console.log('error happened, the newly created review was removed from the review collection');
            }
            const updateDrinkRating = await updateAllDrinkRating();
            if (updateDrinkRating.updatedAllDrinkRating !==true) {
                throw "Error: Some issue happened when updating all drinks' rating"
            }
            throw error;
        }
    }
}

export const updateReview = async (
    reviewId,
    timeStamp,
    drinkId,
    userId,
    reviewText,
    rating,
    reviewPictureLocation
) => {
    reviewId = validation.validateId(reviewId, "reviewId");
    drinkId = validation.validateId(drinkId, "drinkId");
    userId = validation.validateId(userId, "userId");
    reviewText = validation.validateReviewText(reviewText);
    rating = validation.validateRating(rating);

    const reviewCollection = await reviews();
    const review = await reviewCollection.findOne({_id: new ObjectId(reviewId)});

    if (!review) {
        throw `Error: review with reviewId ${reviewId} not found`;
    }
    if(reviewPictureLocation){
        reviewPictureLocation = await validation.validateIfFileExist(reviewPictureLocation);
    }

    const newReview = {
        timeStamp: timeStamp,
        drinkId: drinkId,
        userId: userId,
        reviewText: reviewText,
        rating: rating,
        reviewPictureLocation: reviewPictureLocation
    }

    const updateReview = await reviewCollection.updateOne(
        {_id: review._id},
        {$set: newReview}
    );

    const updateDrinkRating = await updateAllDrinkRating();

    if (updateDrinkRating.updatedAllDrinkRating !==true) {
        throw "Error: Some issue happened when updating all drinks' rating"
    }

    return {updatedReview: true};

}

export const deleteReview = async (
    reviewId
) => {
    reviewId = validation.validateId(reviewId, "reviewId");

    const reviewCollection = await reviews();
    const review = await reviewCollection.findOne({_id: new ObjectId(reviewId)});

    if (!review) {
        throw `Error: review with reviewId ${reviewId} not found, cannot delete`;
    }
    let userId = review.userId.toString();
    let drinkId = review.drinkId.toString();


    const deleteReviewFromUser = await deleteOneReviewFromUser(reviewId, userId);
    // if (deleteReviewFromUser !== true) {
    //     throw `Error: some error happened when deleting reviewId: ${reviewId}`
    // }
    const deleteReviewFromDrink = await deleteReviewIdFromADrink(reviewId, drinkId);
    // if (deleteReviewFromDrink.reviewIdDeleted !== true) {
    //     throw `Error: some error happened when deleting reviewId: ${reviewId} from drink id ${drinkId}`
    // }
    const deleteReview = await reviewCollection.deleteOne({_id: new ObjectId(reviewId)});
    if (deleteReview.deletedCount === 0) {
        throw `Error: could not delete review with reviewId: ${reviewId}`;
    }

    const updateDrinkRating = await updateAllDrinkRating();

    if (updateDrinkRating.updatedAllDrinkRating !==true) {
        throw "Error: Some issue happened when updating all drinks' rating"
    }
    return {deletedReview: true};
}

export const getReviewInfoByReviewId = async (reviewId) => {

    reviewId = validation.validateId(reviewId, "reviewId");
    const reviewCollection = await reviews();
    const review = await reviewCollection.findOne({_id: new ObjectId(reviewId)});
    if (!review) {
        // throw `Error: review with reviewId ${reviewId} not found`;
        return;
    }
    const reviewInfo = {
        _id: review._id.toString(),
        timeStamp: review.timeStamp,
        drinkId: review.drinkId,
        userId: review.userId,
        reviewText: review.reviewText,
        rating: review.rating,
        reviewPictureLocation: review.reviewPictureLocation
    };
    return reviewInfo;

};

export const getAllReviews = async () => {
    const reviewsCollection = await reviews();
    const allReviews = await reviewsCollection.find({}).toArray();

    if (!allReviews || allReviews.length === 0) {
        throw `Error: No review found`;
    }
    return allReviews;
}
