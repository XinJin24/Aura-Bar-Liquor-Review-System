import validation from "../publicMethods.js";
import {getUserIdByEmail, getUserInfoByUserId} from "../data/users.js";
import {createReview, deleteReview, getReviewInfoByReviewId, updateReview} from "../data/reviews.js";
import {getDrinkInfoByDrinkId} from "../data/drinks.js";
import router from "./drinks.js";
import xss from "xss";

import multer from "multer";

const upload = multer({
    dest: "../public/uploads/",
    limits: {fileSize: 10485760},
    onError: function (err, next) {
        console.log("error", err);
        next(err);
    },
});

router
    .route('/review/:id')
    .get(async (req, res) => {
        //code here for GET
        //check if the review belongs to the user
        if (req.session.user) {
            let reviewId = null;
            try {
                reviewId = validation.validateId(req.params.id, "reviewId");
            } catch (error) {
                return res.status(400).render("modifyReview", {
                    error: error,
                    login: true,
                    title: "Update Review"
                });
            }
            try {
                const userIdFromDB = await getUserIdByEmail(req.session.user.email);
                const user = await getUserInfoByUserId(userIdFromDB);
                const reviewsMadeByUser = user.reviewIds;
                if (!reviewsMadeByUser.includes(reviewId)) {
                    throw `Error: You don't have access to ${reviewId}, it is not your review!`
                }

            } catch (error) {
                return res.status(400).render("modifyReview", {
                    error: error,
                    login: true,
                    title: "Update Review"
                });
            }
            try {
                const review = await getReviewInfoByReviewId(reviewId);
                const drinkInfo = await getDrinkInfoByDrinkId(review.drinkId.toString());
                return res.render("modifyReview", {
                    title: "Modify Review",
                    drinkName: drinkInfo.name,
                    drinkPictureLocation: drinkInfo.drinkPictureLocation,
                    reviewText: review.reviewText,
                    rating: review.rating
                });
            } catch (error) {
                return res.status(400).render("error", {
                    errorMsg: error,
                    login: true,
                    title: "Error",
                });
            }
        } else {
            //if no logged in
            return res.status(401).render("error", {
                errorMsg: "please login first to edit a drink",
                login: false,
                title: "Error",
                redirect: "/"
            });
        }

    })
    //updating a review
    .put(upload.single("updateReviewPhoto"), async (req, res) => {
        //code here for POST
        if (!req.session.user) {
            return res.status(401).json({error: "Not authorized"});
        }
        if (req.session.user) {
            let reviewId = req.params.id.toString();
            let reviewText = xss(req.body.updateReviewText);
            let rating = xss(req.body.updateRating);
            let reviewPictureLocation = req.file;

            try {
                reviewId = validation.validateId(reviewId, "reviewId");
                reviewText = validation.validateReviewText(reviewText);
                rating = validation.validateRating(rating);
            } catch (error) {
                return res.status(400).json({error: "input error"});
            }
            try {
                const userIdFromDB = await getUserIdByEmail(req.session.user.email);
                const user = await getUserInfoByUserId(userIdFromDB);
                const reviewsMadeByUser = user.reviewIds;
                if (!reviewsMadeByUser.includes(reviewId)) {
                    throw `Error: You don't have access to ${reviewId}, it is not your review!`
                }
            } catch (error) {
                return res.status(401).json({error: error});
            }
            try {
                const review = await getReviewInfoByReviewId(reviewId);
                const updatedReview = await updateReview(
                    reviewId, validation.generateCurrentDate(), review.drinkId, review.userId, reviewText, rating, reviewPictureLocation);
                if (updatedReview.updatedReview === true) {
                    res.status(200).json({success: true, message: "Review updated successfully"});
                }
            } catch (error) {
                console.error(error);
                return res.status(500).render('error', {
                    title: "Error",
                    message: "Internal Server Error"
                });
            }
        } else {
            console.error(error);
            res.status(400).json({error: error.toString()});
        }
    })
    .delete(async (req, res) => {
        if (!req.session.user) {
            return res.status(401).json({error: 'Please login first to delete a review'});
        }
        let reviewId;
        try {
            reviewId = validation.validateId(req.params.id, 'reviewId');

            const userIdFromDB = await getUserIdByEmail(req.session.user.email);
            const user = await getUserInfoByUserId(userIdFromDB);

            if (!user.reviewIds.includes(reviewId)) {
                return res.status(403).json({error: 'You cannot delete review: ' + reviewId + ', it is not your review!'});
            }

            const deletedReview = await deleteReview(reviewId);
            if (deletedReview.deletedReview) {
                res.status(200).json({message: 'Review deleted successfully'});
            } else {
                res.status(500).json({error: 'Internal Server Error'});
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({error: error.toString()});
        }
    });


export default router;