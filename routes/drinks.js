import Router from "express";

const router = Router();
import validation from "../publicMethods.js";
import {
    createDrink,
    deleteDrink,
    getAllReviewsOnADrink,
    getDrinkInfoByDrinkId,
    reserveDrink, restockDrink,
    updateDrink
} from "../data/drinks.js";
import xss from "xss";

import multer from "multer";
import {getAllReviewsByUserId} from "../data/user.js";

const upload = multer({
    dest: "../public/uploads/",
    limits: {fileSize: 10485760},
    onError: function (err, next) {
        console.log("error", err);
        next(err);
    },
});


//drink detail page and shows all reviews, if the review is made by the user, it will show the edit button


// "/new" to create a drink, has method: get, post
router
    .route('/new')
    .get(async (req, res) => {
        // If logged in and the role is admin
        if (req.session.user && req.session.user.role === "admin") {
            return res.render("createDrink", {
                title: "Add A Drink",
                isAdmin: true,
                login: true,
                userId: req.session.user.userId
            });
            //if not admin
        } else if (req.session.user && req.session.user.role !== "admin") {
            return res.status(403).render("error", {
                errorMsg: "Sorry, You are not admin, hence you cannot add a drink...",
                title: "Authorization Error"
            });
        } else {
            //if not logged in
            return res.status(401).render("error", {
                errorMsg: "Please Login to add a drink.",
                title: "Error"
            });
        }
    })
    .post(upload.single("drinkPicture"), async (req, res) => {
        if (req.session.user && req.session.user.role === "admin") {
            let name, category, recipe, price, stocks;
            try {
                name = validation.validateDrinkName(xss(req.body.drinkName), "Drink Name");
                category = validation.validateDrinkCategory(xss(req.body.category));
                recipe = validation.validateDrinkRecipe(xss(req.body.recipe));
                stocks = validation.validateStocks(xss(req.body.stocks));
                price = validation.validatePrice(xss(req.body.price));

                const drinkPictureLocation = req.file;
                if (req.file === undefined) {
                    throw "you must attach a picture to show to the customers";
                }

                const newDrink = await createDrink(name, category, recipe, drinkPictureLocation, stocks, price);
                res.status(200).json({success: true, drinkId: newDrink._id.toString()});
            } catch (error) {
                console.error(error);
                res.status(500).json({error: `Internal Server Error, reanson: ${error}`});
            }
        } else {
            res.status(401).json({error: "Please Login to add a drink."});
        }
    });


// "/:id" to see the detail about a drink, has method: get, delete, post
router
    .route('/:id')
    .get(async (req, res) => {
        // If logged in
        if (req.session.user) {
            //if the drinkId is wrong
            let drinkId = null;
            try {
                drinkId = validation.validateId(req.params.id, "ID");
            } catch (error) {
                return res.status(400).render("drinkInfo", {
                    error: error,
                    login: true,
                    errorMsg: "Please enter a valid drink ID",
                    title: "Drink Detail"
                });
            }
            // get the drinksInfo
            try {
                const sessionUserId = req.session.user.userId;
                const drinkInfo = await getDrinkInfoByDrinkId(drinkId);
                const reviews = await getAllReviewsOnADrink(drinkId);
                let hasReview = false;
                const sessionUserAllReviews = await getAllReviewsByUserId(sessionUserId);
                for(const review of reviews){
                    review.canEdit =false;
                    // if the reviewId is pointing to a userId
                    if(review.userId === sessionUserId){
                        //if the user's reviews has the reviewid
                        const sessionUserReview = await getAllReviewsByUserId(sessionUserId)
                        if(sessionUserAllReviews.includes(review.reviewId)){
                            review.canEdit =true;
                            review.canRemove = true;
                        }
                    }
                    if(req.session.user.role ==='admin'){
                        review.canRemove = true;
                    }
                    if(sessionUserAllReviews.includes(review.reviewId)){
                        hasReview = true;
                    }
                }
                const isAdmin = req.session.user.role === "admin";
                let isReservable = true;
                if(drinkInfo.available === false || drinkInfo.stocks ===0){
                    isReservable = false;
                }
                return res.status(200).render('drinkInfo', {
                    userId: req.session.user.userId,
                    title: "Drink Detail",
                    drinkInfo: drinkInfo,
                    reviews: reviews,
                    login: true,
                    isAdmin: isAdmin,
                    hasReview: hasReview,
                    isReservable: isReservable
                });
            } catch (error) {
                console.error(error);
                return res.status(500).render('error', {
                    title: "Internal Server Error",
                    errorMsg: "Please enter a valid drink ID"
                });
            }
            //if not logged in
        } else {
            return res.status(401).render("error", {
                errorMsg: "Please Login to view details about this drink.",
                title: "Error"
            });
        }
    })
    .post(upload.single("drinkPicture_update"),async (req, res) => {
        if (!req.session.user) {
            return res.status(401).render("error", {
                errorMsg: "Please login first to edit a drink",
                title: "Error"
            });
        }
        if (req.session.user && req.session.user.role !== "admin") {
            return res.status(401).render("error", {
                errorMsg: "You do not have privileges to edit a drink",
                title: "Error"
            });
        }

        try {
            const drinkId = validation.validateId(xss(req.body.drinkId_update));
            const name = validation.validateDrinkName(xss(req.body.drinkName_update), "Drink Name");
            const category = validation.validateDrinkCategory(xss(req.body.category_update), "Drink Category")
            const recipe = validation.validateDrinkRecipe(xss(req.body.recipe_update));
            const stocks = validation.validateStocks(xss(req.body.stocks_update));
            const price = validation.validatePrice(xss(req.body.price_update));
            let drinkPictureLocation = "";
            if (req.file) {
                drinkPictureLocation = req.file;
            }

            const updatedDrink = await updateDrink(drinkId, name, category, recipe, drinkPictureLocation, stocks,price);
            if (!updatedDrink.updatedDrink) {
                throw "Error happened while updating the drink.";
            }

            return res.status(200).json({success: true});

        } catch (error) {
            console.error(error);
            return res.status(500).render("error", {
                errorMsg: error,
                title: "Error"
            });
        }
    })
    .delete(async (req, res) => {
        if (req.session.user && req.session.user.role === "admin") {
            let drinkId = null;
            try {
                drinkId = validation.validateId(req.params.id, "drinkId");
                const deletedDrink = await deleteDrink(drinkId);
                if (deletedDrink.deleteDrink === true) {
                    return res.status(200).json({message: 'Drink deleted successfully'});
                } else {
                    throw "Error happened then deleting a drink.";
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({error: 'Internal Server Error'});
            }
        } else if (req.session.user && req.session.user.role !== "admin") {
            return res.status(401).json({error: 'You do not have privileges to delete a drink'});
        } else {
            return res.status(401).json({error: 'Please login first to delete a drink'});
        }
    });


router
    .post('/reserveDrink/:id', async (req, res) => {
        if (req.session.user) {
            try {
                const drinkId = req.params.id;
                const userId = req.session.user.userId;
                await reserveDrink(userId, drinkId);
                return res.status(200).send("Drink reserved successfully.");
            } catch (error) {
                console.error("Error reserving drink:", error);
                return res.status(500).send("Error reserving drink.");
            }
        } else {
            console.error("Error reserving drink");
            return res.status(401).send("Please Login in first to reverse a Drink");
        }
    });


router
    .post('/restockDrink/:id', async (req, res) => {
        if (!req.session.user || req.session.user.role !== "admin") {
            return res.status(401).json({error: "Unauthorized access"});
        }
        try {
            const drinkId = req.params.id;
            let stockAmount = xss(req.body.stockAmount);
            stockAmount = validation.validateStocks(stockAmount);
            await restockDrink(drinkId, stockAmount);
            return res.status(200).json({message: "Drink restocked successfully"});
        } catch (error) {
            return res.status(500).json({error: error.toString()});
        }
    });

router
    .get('/api/:id', async (req, res) => {
        if (!req.session.user || req.session.user.role !== "admin") {
            return res.status(401).json({error: "Unauthorized access"});
        }
        try {
            const drinkId = req.params.id;
            const drinkInfo = await getDrinkInfoByDrinkId(drinkId);
            return res.status(200).json(drinkInfo);
        } catch (error) {
            return res.status(500).json({error: error.toString()});
        }
    });

export default router;
