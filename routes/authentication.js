import Router from "express"

const router = Router();
import validation from "../publicMethods.js";
import {createUser, loginUser} from "../data/users.js";
import {getAllDrinks} from "../data/drinks.js";
import xss from "xss";

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
        if(req.session.user){

            login = true;
             userFirstName = req.session.user.firstName;
             userLstName = req.session.user.lastName;
             userProfilePictureLocation = req.session.user.profilePictureLocation
            console.log("logged in true"+ userProfilePictureLocation);
        }
    const allDrinks = await getAllDrinks();
    if(req.session.user && req.session.user.role === "admin"){
        for(let drink of allDrinks){
            drink.editable = true;
        }
    }
    return res.render('home', {title: "Aura Liquor", drinks: allDrinks, firstName: userFirstName,
        lastName : userLstName, userProfilePictureLocation: userProfilePictureLocation, login: login});
});


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
        let firstNameInput = xss(req.body.firstNameInput);//same as frontend
        let lastNameInput = xss(req.body.lastNameInput);
        let emailAddressInput = xss(req.body.emailAddressInput);
        let phoneNumberInput = xss(req.body.phoneNumberInput);
        let passwordInput = xss(req.body.passwordInput);
        let confirmPasswordInput = xss(req.body.confirmPasswordInput);
        let photoInput = xss(req.body.photoInput);
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

            const defaultProfilePictureLocation = "";
            photoInput = photoInput ? photoInput : defaultProfilePictureLocation;

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
                phoneNumberInput,
                passwordInput,
                photoInput,
                // profilePictureLocationInput,
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
        let emailAddressInput = xss(req.body.emailAddressInput);
        let passwordInput = xss(req.body.passwordInput);
        try {
            emailAddressInput = validation.validateEmail(emailAddressInput);
            passwordInput = validation.validatePassword(passwordInput);
            const user =
                await loginUser(emailAddressInput, passwordInput);
            req.session.user = {
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

export default router;