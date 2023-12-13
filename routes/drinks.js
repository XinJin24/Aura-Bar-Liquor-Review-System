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
            res.status(403).render("error", {
                errorMsg: "Sorry, You are not admin, hence you cannot add a drink...",
                login: true,
                isAdmin: false,
                title: "Authorization Error"
            });
        } else {
            //if not logged in
            return res.status(401).render("error", {
                errorMsg: "Please Login to add a drink.",
                login: false,
                isAdmin: false,
                title: "Error"
            });
        }
    })
    .post(async (req, res) => {
        //adding a drink
        if (req.session.user && req.session.user.role === "admin") {
            let name = null;
            let category = null;
            let recipe = null;
            let drinkPictureLocation = null;
            let price = null;
            try {
                name = validation.validateName(xss(req.body.name), "Drink Name");//改个名字，别叫name
                category = validation.validateDrinkCategory(xss(req.body.category));
                recipe = validation.validateDrinkRecipe(xss(req.body.recipe));
                drinkPictureLocation = validation.validateIfFileExist(xss(req.body.drinkPictureLocation));
                price = validation.validatePrice(xss(req.body.price));
                console.log(price);
            } catch (error) {
                return res.status(400).render("createDrink", {
                    error: error,
                    login: true,
                    title: "Add A Drink"
                });
            }

            try {
                const newDrink = await createDrink(name, category, recipe, drinkPictureLocation, price);
                res.status(200).redirect("/drinks/" + newDrink._id.toString());
            } catch (error) {
                console.error(error);
                return res.status(500).render('error', {
                    title: "Error",
                    message: "Internal Server Error"
                });
            }

        } else {
            //if not logged in, cannot create a new drink
            return res.status(401).render("error", {
                errorMsg: "Please Login to add a drink.",
                login: false,
                title: "Error"
            });
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
                    title: "Drink Detail"
                });
            }
            // get the drinksInfo
            try {
                const drinkInfo = await getDrinkInfoByDrinkId(drinkId);
                const reviews = await getAllReviewsOnADrink(drinkId);

                const isAdmin = req.session.user.role === "admin";
                return res.status(200).render('drinkInfo', {
                    userId: req.session.user.userId,
                    title: "Drink Detail",
                    drinkInfo: drinkInfo,
                    reviews: reviews,
                    login: true,
                    isAdmin: isAdmin
                });
            } catch (error) {
                console.error(error);
                return res.status(500).render('error', {
                    title: "Error",
                    message: "Internal Server Error"
                });
            }
            //if not logged in
        } else {
            return res.status(401).render("error", {
                errorMsg: "Please Login to view details about this drink.",
                login: false,
                title: "Error",
            });
        }
    })
    .post(async (req, res) => {
        //post is to edit a drink
        if (req.session.user && req.session.user.role === "admin") {
            let drinkId = null;
            let name = null;
            let category = null;
            let recipe = null;
            let drinkPictureLocation = null;
            let price = null;
            try {
                drinkId = validation.validateId(req.params._id, "drinkId");
                name = validation.validateName(xss(req.body.name), "Drink Name");
                category = validation.validateDrinkCategory(xss(req.body.category), "Drink Category")
                recipe = validation.validateDrinkRecipe(xss(req.body.recipe));
                drinkPictureLocation = validation.validateIfFileExist(xss(req.body.drinkPictureLocation));
                price = validation.validatePrice(xss(req.body.price));
            } catch (error) {
                return res.status(400).render("updateDrinkInfo", {
                    error: error,
                    login: true,
                    title: "Update Drink"
                });
            }
            try {
                const updatedDrink = await updateDrink(drinkId, name, category, recipe, drinkPictureLocation, price);
                if (updatedDrink.updatedDrink === true) {
                    return res.status(200).redirect('/drinkInfo/' + drinkId);
                } else {
                    throw "Error happened then updating a drink."
                }

            } catch (error) {
                console.error(error);
                return res.status(500).render('error', {
                    title: "Error",
                    message: "Internal Server Error"
                });
            }
            //if no admin,
        } else if (req.session.user && req.session.user.role !== "admin") {
            return res.status(401).render("error", {
                errorMsg: "you do not have a privileges to edit a drink",
                login: true,
                title: "Error",
            });
        } else {
            return res.status(401).render("error", {
                errorMsg: "Olease login first to edit a drink",
                login: false,
                title: "Error",
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
                    return res.status(200).json({ message: 'Drink deleted successfully' });
                } else {
                    throw "Error happened then deleting a drink.";
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        } else if (req.session.user && req.session.user.role !== "admin") {
            return res.status(401).json({ error: 'You do not have privileges to delete a drink' });
        } else {
            return res.status(401).json({ error: 'Please login first to delete a drink' });
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
        }else{
            console.error("Error reserving drink:", error);
            return res.status(401).send("Please Login in first to reverse a Drink");
        }
    });


router
    .post('/restockDrink/:id', async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    try {
        const drinkId = req.params.id;
        await restockDrink(drinkId);
        res.status(200).json({ message: "Drink restocked successfully" });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

export default router;
