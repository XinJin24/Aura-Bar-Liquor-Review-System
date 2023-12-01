import Router from "express"

const router = Router();
import validation from "../publicMethods.js";
import {
    createUser,
    getAllDrinkReservedByUserId, getAllReviewsByUserId,
    getUserIdByEmail,
    loginUser
} from "../data/users.js";

import {getReviewDetailByReviewId}from "../data/reviews.js"
import {getDrinkDetailByDrinkId}from "../data/drinks.js"
router
    .route('/register')
    .get(async (req, res) => {
        if (req.session.user) {
            return res.redirect('/home');
        } else {
            return res.render('register', {title: "Register"});
        }
    })
    .post(async (req, res) => {
        let firstNameInput = req.body.firstNameInput;
        let lastNameInput = req.body.lastNameInput;
        let emailAddressInput = req.body.emailAddressInput;
        let stateInput = req.body.stateInput;
        let passwordInput = req.body.passwordInput;
        let confirmPasswordInput = req.body.confirmPasswordInput;
        let profilePictureLocationInput = req.body.profilePictureLocationInput;
        let roleInput = req.body.roleInput;
        try {
            if (!firstNameInput || !lastNameInput || !emailAddressInput || !stateInput || !passwordInput || !confirmPasswordInput || !roleInput) {
                throw "Error: You must make sure that firstName, lastName, emailAddress,  password, confirmPassword, role are supplied"
            }
            lastNameInput = validation.validateName(lastNameInput, "lastname");
            firstNameInput = validation.validateName(firstNameInput, "firstName");
            emailAddressInput = validation.validateEmail(emailAddressInput);
            passwordInput = validation.validatePassword(passwordInput, "password");
            confirmPasswordInput = validation.validatePassword(confirmPasswordInput, "confirmPasswordInput");
            roleInput = validation.validateRole(roleInput);

            const defaultProfilePictureLocation = "";
            profilePictureLocationInput = profilePictureLocationInput ? profilePictureLocationInput : defaultProfilePictureLocation;

            if (passwordInput !== confirmPasswordInput) {
                throw "Error: Passwords do not match";
            }
        } catch (error) {
            return res.status(400).render('error', {
                title: "InputError", message: error
            });
        }

        try {
            const user = await createUser(firstNameInput,
                lastNameInput,
                emailAddressInput,
                stateInput,
                passwordInput,
                profilePictureLocationInput,
                roleInput);
            if (user.insertedUser) {
                return res.redirect('/login');
            } else {
                throw "Error: Internal Server Error"
            }
        } catch (error) {
            return res.status(500).render('error', {
                title: "Internal Server Error",
                message: "Error: Internal Server Error"
            });
        }
    });


router
    .route('/login')
    .get(async (req, res) => {
        //code here for GET
        return res.render("login", {title: "Login"});
    })
    .post(async (req, res) => {
        //code here for POST
        let emailAddressInput = req.body.emailAddressInput;
        let passwordInput = req.body.passwordInput;
        try {
            emailAddressInput = validation.validateEmail(emailAddressInput);
            passwordInput = validation.validatePassword(passwordInput);
            const user =
                await loginUser(emailAddressInput, passwordInput);
            req.session.user = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                state: user.state,
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

router
    .route('/user/:id')
    .get(async (req, res) => {
        //if login
        if (req.session.user) {
            try {
                const userId = validation.validateId(req.params.id, "ID");
                const userIdFromDB = await getUserIdByEmail(req.session.user.email);
                if(userIdFromDB !== userId){
                    throw `Error: You don't have access to ${userId}`
                }
                let drinkReserved = await getAllDrinkReservedByUserId(userId);
                let reviews = await getAllReviewsByUserId(userId);

                //store drink and review into a array and display them to frontend
            } catch (error){

            }
        } else {
            return res.render('register', {title: "Register"});
        }
    })
    .post(async (req, res) => {

    });