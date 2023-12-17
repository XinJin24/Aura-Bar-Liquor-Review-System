import Router, {query} from "express"

const router = Router();
import validation from "../publicMethods.js";
import {createUser, getUserInfoByUserId, getUserPasswordById, loginUser} from "../data/users.js";
import {getAllDrinks} from "../data/drinks.js";
import xss from "xss";
import multer from "multer";
import bcrypt from "bcrypt";
import {createReview} from "../data/reviews.js";
import twilio from 'twilio';

const accountSid = 'ACb22d7dddd58f2c92edc3422e1d16efe6';
const authToken = '923d660e2c53fab971847ee0951beba2';

const client = twilio(accountSid, authToken);

const businessPhone = "+19293335817";
const upload = multer({
    dest: "../public/uploads/",
    limits: {fileSize: 10485760},
    onError: function (err, next) {
        console.log("error", err);
        next(err);
    },
});

router
    .route('/').get(async (req, res) => {
    if (req.session.user) {
        return res.redirect('/home');
    } else {
        return res.redirect('/login');
    }
});

router
    .route('/home').get(async (req, res) => {
    let userId = null;
    let userFirstName = null;
    let userLstName = null;
    let userProfilePictureLocation = null;
    let login = false;
    let isAdmin = false;


    if (req.session.user) {
        login = true;
        userId = req.session.user.userId;
        if (req.session.user.role === "admin") {
            isAdmin = true;
        }
        const user = await getUserInfoByUserId(userId);
        userFirstName = user.firstName;
        userLstName = user.lastName;
        userProfilePictureLocation = user.profilePictureLocation;
    }
    let allDrinks = await getAllDrinks();

    allDrinks.sort((a, b) => {
        if (a.available && !b.available) {
            return -1;
        }
        if (!a.available && b.available) {
            return 1;
        }
        return 0;
    });

    if (req.session.user && req.session.user.role === "admin") {
        for (let drink of allDrinks) {
            drink.editable = true;
        }
    }
    return res.render('home', {
        title: "Aura Liquor", drinks: allDrinks, firstName: userFirstName, userId: userId,
        lastName: userLstName, userProfilePictureLocation: userProfilePictureLocation, login: login, isAdmin: isAdmin
    });
})

router
    .route('/register')
    .get(async (req, res) => {
        if (req.session.user) {
            return res.redirect('/home');
        } else {
            return res.render('register', {title: "Register"});
        }
    })
    .post(upload.single("photoInput"), async (req, res) => {
        let firstNameInput = xss(req.body.firstNameInput);//same as frontend
        let lastNameInput = xss(req.body.lastNameInput);
        let emailAddressInput = xss(req.body.emailAddressInput);
        let phoneNumberInput = xss(req.body.phoneNumberInput);
        let passwordInput = xss(req.body.passwordInput);
        let confirmPasswordInput = xss(req.body.confirmPasswordInput);
        let roleInput = xss(req.body.roleInput);

        try {
            if (!firstNameInput || !lastNameInput || !emailAddressInput || !phoneNumberInput || !passwordInput || !confirmPasswordInput || !roleInput) {
                throw "Error: You must make sure that firstName, lastName, emailAddress,  password, confirmPassword, role are supplied"
            }
            lastNameInput = validation.validateName(lastNameInput, "lastname");
            firstNameInput = validation.validateName(firstNameInput, "firstName");
            emailAddressInput = validation.validateEmail(emailAddressInput);
            phoneNumberInput = validation.validatePhoneNumber(phoneNumberInput);
            passwordInput = validation.validatePassword(passwordInput, "password");
            confirmPasswordInput = validation.validatePassword(confirmPasswordInput, "confirmPasswordInput");
            roleInput = validation.validateRole(roleInput);


            if (passwordInput !== confirmPasswordInput) {
                throw "Error: Passwords do not match";
            }
        } catch (error) {
            return res.status(400).render('error', {
                title: "InputError", errorMsg: error
            });
        }
        try {
            const user = await createUser(firstNameInput,
                lastNameInput,
                emailAddressInput,
                phoneNumberInput,
                passwordInput,
                req.file,
                // profilePictureLocationInput,
                roleInput);
            if (user.insertedUser) {
                return res.redirect('/login');
            }
        } catch (error) {
            return res.status(500).render('error', {
                title: "error",
                errorMsg: error
            });
        }
    });


router
    .route('/login')
    .get(async (req, res) => {
        //code here for GET
        if (req.session.user) {
            return res.redirect('/');
        }
        return res.render("login", {title: "Login"});
    })
    .post(async (req, res) => {
        //code here for POST
        let emailAddressInput = xss(req.body.emailAddressInput);
        let passwordInput = xss(req.body.passwordInput);
        try {
            emailAddressInput = validation.validateEmail(emailAddressInput);
            passwordInput = validation.validatePassword(passwordInput);
            const user =
                await loginUser(emailAddressInput, passwordInput);
            req.session.user = {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profilePictureLocation: user.profilePictureLocation,
                role: user.role
            };
            res.cookie('AuthState', req.session.sessionID);
            return res.redirect('/home');

        } catch (error) {
            return res.status(400).render('error', {
                title: "Inputs Error",
                message: error
            });
        }
    });

router.route("/logout").get(async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        return res.render("logout", {
            logMsg: "You have been logged out",
            url: "/",
            login: false,
            title: "Logout",
        });
    } else {
        res.status(400);
        return res.redirect("/login");
    }
});


router.route("/sendMessage").post(async (req, res) => {
    if (req.session.user) {
        let message = null;
        let userPhoneNumber = null;
        try {
            message = validation.validateCallForServiceMessage(xss(req.body.message));
            userPhoneNumber = req.session.user.phoneNumber;
        } catch (error) {
            return res.status(400).render('error', {
                title: "Inputs Error",
                message: error
            });
        }
        try {
            client.messages
                .create({
                    body: "This message is from Aura Bar Customer: " + message,
                    from: '+18334580397',
                    to: businessPhone
                })
                .then(message => console.log(message.sid));

            client.messages
                .create({
                    body: "your message was successfully sent to the Aura Service Team. We will serve your request soon!    ---Aura Management",
                    from: '+18334580397',
                    to: userPhoneNumber
                })
                .then(message => console.log(message.sid));
            res.status(200).send('Message sent successfully');
        } catch (error) {
            res.status(500).send('Error sending message');
        }
    } else {
        return res.status(401).render("error", {
            errorMsg: "Please Login to send a message",
            login: false,
            title: "Error",
            redirect: "/login"
        });
    }
});


router
    .route('/checkPassword')
    .post(async (req, res) => {
        try {
            const userId = req.session.user.userId;
            const oldPassword = xss(req.body.oldPassword);
            const realPassword = await getUserPasswordById(userId);
            const match = await bcrypt.compare(oldPassword, realPassword.password);
            if (!match) {
                return res.status(400).send("Error: Old password is incorrect.");
            }
            res.status(200).send({ success: true, message: "Password is matched and ready to be used" });
        } catch (error) {
            res.status(500).send({ success: false, message: "Internal server error." });
        }
    })


router
    .route('/getUserId')
    .get(async (req, res) => {
        if(req.session.user && req.session.user.userId) {
            res.json({ userId: req.session.user.userId });
        } else {
            res.status(401).json({ message: 'Error: User not logged in' });
        }
    })


router.
    route('/search').get(async (req, res) => {
    const keyword = req.query.query;
    let drinks = await getAllDrinks();
    let availableDrinks = drinks.filter(drink => drink.available);

    let filteredDrink = availableDrinks;

    if (keyword) {
        filteredDrink = availableDrinks.filter(drink =>
            drink.name.toLowerCase().includes(keyword.toLowerCase()) ||
            drink.category.toLowerCase().includes(keyword.toLowerCase()) ||
            drink.recipe.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    if (req.session.user && req.session.user.role === "admin") {
        for (let drink of filteredDrink) {
            drink.editable = true;
        }
    }

    return res.status(200).json(filteredDrink);
});


router.
    route('/getAllDrinks').get(async (req, res) => {
    let drinks = await getAllDrinks();
    let availableDrinks = drinks.filter(drink => drink.available);

    if (req.session.user && req.session.user.role === "admin") {
        for (let drink of availableDrinks) {
            drink.editable = true;
        }
    }
    return res.status(200).json(availableDrinks);
});


router.route('/sortDrinks').get(async (req, res) => {
    const sortBy = req.query.sortBy;
    let drinks = await getAllDrinks();
    drinks = drinks.filter(drink => drink.available);

    if (sortBy === 'priceDesc') {
        drinks =  drinks.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'priceAsc') {
        drinks =  drinks.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'topRating') {
        drinks =  drinks.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'topReserved') {
        drinks =  drinks.sort((a, b) => b.reservedCounts - a.reservedCounts);
    }
    if (req.session.user && req.session.user.role === "admin") {
        for (let drink of drinks) {
            drink.editable = true;
        }
    }
    return res.status(200).json(drinks);
});


router
    .route('/admin').get(async (req, res) => {
    if (req.session.user && req.session.user.role === "admin") {
        let userId = null;
        let userFirstName = null;
        let userLstName = null;
        let userProfilePictureLocation = null;
        let login = false;
        let isAdmin = false;

        if (req.session.user) {
            login = true;
            userId = req.session.user.userId;
            if (req.session.user.role === "admin") {
                isAdmin = true;
            }
            const user = await getUserInfoByUserId(userId);
            userFirstName = user.firstName;
            userLstName = user.lastName;
            userProfilePictureLocation = user.profilePictureLocation;
        }
        let allDrinks = await getAllDrinks();
        if (req.session.user && req.session.user.role === "admin") {
            for (let drink of allDrinks) {
                drink.editable = true;
            }
        }
        return res.render('admin', {
            title: "Admin Page", drinks: allDrinks, firstName: userFirstName, userId: userId,
            lastName: userLstName, userProfilePictureLocation: userProfilePictureLocation, login: login, isAdmin: isAdmin
        });
    } else if(req.session.user && req.session.user.role === "user"){
        return res.status(401).render("error", {
            errorMsg: "Sorry, This page is solely for admin!",
            login: false,
            title: "Access Error",
            redirect: "/home"
        });
    } else{
        return res.status(401).render("error", {
            errorMsg: "please use your admin credentials to log in!",
            login: false,
            title: "Error",
            redirect: "/login"
        });
    }
});

router
    .route('/review/new')
    .post(upload.single("reviewPhotoInput"), async (req, res) => {
        if (req.session.user) {
            let reviewText, rating, reviewPhotoInput, drinkId, userId;
            try {
                drinkId = validation.validateId(xss(req.body.drinkId));
                reviewText = validation.validateReviewText(xss(req.body.reviewText));
                rating = validation.validateRating(xss(req.body.rating));
                userId = req.session.user.userId;

                reviewPhotoInput = req.file;

                const newReview = await createReview(drinkId, userId, reviewText, rating, reviewPhotoInput);
                res.status(200).json({success: true});
            } catch (error) {
                console.error(error);
                res.status(500).json({error: `Internal Server Error, reanson: ${error}`});
            }
        } else {
            res.status(401).json({error: "Please Login to add a drink."});
        }
    });


export default router;