import Router from "express";
const router = Router();
import validation from "../publicMethods.js";
import { getAllDrinkReservedByUserId, getAllReviewsByUserId, getUserIdByEmail } from "../data/users.js";
import { getDrinkInfoByDrinkId } from "../data/drinks.js";
import { getReviewInfoByReviewId } from "../data/reviews.js";

router
    .route('/drinkInfo/:id')
    .get(async (req, res) => {
        // If logged in
        if (req.session.user) {
            try {
                // Display description of the drink and all reviews under the drink
                const drinkId = validation.validateId(req.params.id, "ID");

                // Get drink information
                const drinkInfo = await getDrinkInfoByDrinkId(drinkId);

                // Get all reviews for the drink
                const reviews = await getAllReviewsByUserId(drinkInfo.userId);

                // If admin, get additional information
                if (req.session.user.role === "admin") {
                    // Admin has all privileges above and can also delete a review from a user
                    // Additional logic for admin privileges here
                }

                // Render the page with drink and review details
                return res.render('drinkInfo', {
                    title: "Drink Information",
                    user: req.session.user,
                    drinkInfo: drinkInfo,
                    reviews: reviews
                });
            } catch (error) {
                // Handle errors here
                console.error(error);
                return res.status(500).render('error', {
                    title: "Internal Server Error",
                    message: "Error: Internal Server Error"
                });
            }
        } else {
            // If not logged in, can only view and cannot make reviews under the drink
            return res.render('register', { title: "Register" });
        }
    })
    .post(async (req, res) => {
        // Handle POST requests if necessary
    });

export default router;
