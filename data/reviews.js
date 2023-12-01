import validation from "../publicMethods.js";
import {reviews} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import {deleteOneReviewFromUser} from "./users.js";

export const createReview = async (
    drinkId,
    userId,
    reviewText,
    rating,
    reviewPictureLocation
)=> {
    drinkId = validation.validateId(drinkId, "drinkId");
    userId = validation.validateId(userId,"userId");
    reviewText = validation.validateReviewText(reviewText);
    rating = validation.validateRating(rating);
    reviewPictureLocation = validation.validateIfFileExist(reviewPictureLocation,"Review Picture Location");

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
    return {insertedReview: true};
}

export const updateReview= async (
    reviewId,
    timeStamp,
    drinkId,
    userId,
    reviewText,
    rating,
    reviewPictureLocation
)=> {
    reviewId = validation.validateId(reviewId,"reviewId");
    timeStamp = validation.validateDateTime(timeStamp);
    drinkId = validation.validateId(drinkId,"drinkId");
    userId = validation.validateId(userId,"userId");
    reviewText = validation.validateReviewText(reviewText);
    rating = validation.validateRating(rating);
    reviewPictureLocation = validation.validateIfFileExist(reviewPictureLocation,"Review Picture Location");

    const reviewCollection = await reviews();
    const review = await reviewCollection.findOne({ _id: reviewId });

    if (!review) {
        throw `Error: review with reviewId ${reviewId} not found`;
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
        { _id: review._id },
        { $set: newReview }
    );
    if (updateReview.modifiedCount === 0) {
        throw `Error: Failed to update review with reviewId ${reviewId}`;
    }

    return { updatedReview: true };

}

export const deleteReview = async (
    reviewId
)=> {
    reviewId = validation.validateId(reviewId,"reviewId");

    const reviewCollection = await reviews();
    const review = await reviewCollection.findOne({ _id: new ObjectId(reviewId) });

    if (!review) {
        throw `Error: review with reviewId ${reviewId} not found, cannot delete`;
    }
    let userId = review.userId.toString();
    const deleteReview = await reviewCollection.deleteOne({ _id: new ObjectId(reviewId) });
    if (deleteReview.deletedCount === 0) {
        throw `Error: could not delete review with reviewId: ${reviewId}`;
    }
    const deleteReviewFromUser = await deleteOneReviewFromUser(reviewId, userId);
    if(deleteReviewFromUser === true){
        return `The review ${reviewId} has been deleted in reviews collections and user collections!`;
    }else{
        throw `Error: some error happened when deleting reviewId: ${reviewId}`
    }


}

