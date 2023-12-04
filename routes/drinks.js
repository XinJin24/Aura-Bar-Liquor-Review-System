import Router from "express";
const router = Router();
import validation from "../publicMethods.js";
import { getAllDrinkReservedByUserId, getAllReviewsByUserId, getUserIdByEmail } from "../data/users.js";
import { getDrinkInfoByDrinkId } from "../data/drinks.js";
import { getReviewInfoByReviewId } from "../data/reviews.js";

//drink detail page and shows all reviews, if the review is made by the user, it will show the edit button
router
    .route('/drinkInfo/:id')
    .get(async (req, res) => {
        // If logged in
        if (req.session.user) {
            try {
                const drinkId = validation.validateId(req.params.id, "ID");
                const drinkInfo = await getDrinkInfoByDrinkId(drinkId);
                const reviews = await getAllReviewsByUserId(drinkInfo.userId);
                if (req.session.user.role === "admin") {
                    // Admin has all privileges above and can also delete a review from a user
                    // Additional logic for admin privileges here
                }

                return res.render('drinkInfo', {
                    title: "Drink Information",
                    user: req.session.user,
                    drinkInfo: drinkInfo,
                    reviews: reviews
                });
            } catch (error) {
                console.error(error);
                return res.status(500).render('error', {
                    title: "Internal Server Error",
                    message: "Error: Internal Server Error"
                });
            }
        } else {
            return res.render('register', { title: "Register" });
        }
    })
    .post(async (req, res) => {

    });

// if the user click on the edit button, it will direct the user to a new page exclusively for modifying the review information
router
    .route('/drinkInfo/:id')
    .get(async (req, res) => {
        // If logged in
        if (req.session.user) {
            try {
                const drinkId = validation.validateId(req.params.id, "ID");
                const drinkInfo = await getDrinkInfoByDrinkId(drinkId);
                const reviews = await getAllReviewsByUserId(drinkInfo.userId);
                if (req.session.user.role === "admin") {
                    // Admin has all privileges above and can also delete a review from a user
                    // Additional logic for admin privileges here
                }

                return res.render('drinkInfo', {
                    title: "Drink Information",
                    user: req.session.user,
                    drinkInfo: drinkInfo,
                    reviews: reviews
                });
            } catch (error) {
                console.error(error);
                return res.status(500).render('error', {
                    title: "Internal Server Error",
                    message: "Error: Internal Server Error"
                });
            }
        } else {
            return res.render('register', { title: "Register" });
        }
    })
    .post(async (req, res) => {

    });
export default router;