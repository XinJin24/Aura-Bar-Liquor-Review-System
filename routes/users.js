import Router from "express"

const router = Router();
import validation from "../publicMethods.js";
import {
    createUser,
    getAllDrinkReservedByUserId,
    getAllReviewsByUserId,
    getUserIdByEmail,
    getUserInfoByUserId,
    loginUser, updateUser
} from "../data/users.js";
import {getReviewInfoByReviewId} from "../data/reviews.js"
import {getDrinkInfoByDrinkId} from "../data/drinks.js"
import e from "express";
import xss from "xss";


router
    .route('/profile/:id')
    .get(async (req, res) => {
        //if login
        if (req.session.user) {
            try {
                const userId = validation.validateId(req.params.id, "ID");
                const userIdFromDB = await getUserIdByEmail(req.session.user.email);
                if (userIdFromDB !== userId) {
                    throw `Error: You don't have access to ${userId}`
                }
                let drinkReserved = await getAllDrinkReservedByUserId(userId);
                let reviews = await getAllReviewsByUserId(userId);

                //store drink and review into a array and display them to frontend
                let drinkReservedArray = [];
                let reviewsArray = [];
                for (let i = 0; i < drinkReserved.length; i++) {
                    drinkReservedArray.push(getDrinkInfoByDrinkId(drinkReserved[i].toString()));
                }
                for (let j = 0; j < reviews.length; j++) {
                    reviewsArray.push(getReviewInfoByReviewId(reviews[j].toString()));
                }
                //render drink, review, user info to user home page
                return res.render('profile',
                    {
                        title: "Profile",
                        user: req.session.user,
                        drinkReserved: drinkReservedArray,
                        reviews: reviewsArray
                    });
            } catch (error) {
                //render error page that shows internal error
            }
        } else {
            return res.render('register', {title: "Register"});
        }
    })
    .post(async (req, res) => {

    });

// ask user to enter firstName, LastName, oldPassword, newPassword, confirmNewPassword,
// phoneNumber, newProfilePictureLocation,
router
    .route('/modify/:id')
    .get(async (req, res) => {
        if (req.session.user) {
            try {
                const userId = validation.validateId(req.params.id, "ID");
                const userIdFromDB = await getUserIdByEmail(req.session.user.email);
                if (userIdFromDB !== userId) {
                    throw `Error: You don't have access to others' account: ${userId}`
                }
                const user = await getUserInfoByUserId(userId);
                const url = "/user/modify/" + userId + "?_method=PUT";
                return res.render("modifyUserInfo", {
                    title: "editUserInfo",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    url: url,
                    login: true
                });
            } catch (error) {
                //return render error page, internal error
            }
        } else {
            //return render error page
        }
    })
    .post(async (req, res) => {
        if (req.session.user) {
            try {
                const userId = validation.validateId(req.params.id, "ID");
                const userIdFromDB = await getUserIdByEmail(req.session.user.email);
                if (userIdFromDB !== userId) {
                    throw `Error: You don't have access to others' account: ${userId}`
                }

                let firstName = validation.validateName(xss(req.body.firstName), "firstName");
                let lastName = validation.validateName(xss(req.body.lastName), "lastName");
                let oldPassword = validation.validatePassword(xss(req.body.oldPassword), "password");
                let newPassword = validation.validatePassword(xss(req.body.newPassword), "new Password");
                let confirmNewPassword = validation.validatePassword(xss(req.body.confirmNewPassword), "confirm New Password");
                let phoneNumber = validation.validatePhoneNumber(xss(req.body.phoneNumber));
                let newProfilePictureLocation = await validation.validateIfFileExist(xss(req.body.newProfilePictureLocation));

                if (oldPassword === newPassword) {
                    throw "Error: New Password cannot be same as the previous password!";
                }
                if (newPassword !== confirmNewPassword) {
                    throw "Error: New Password and Confirm New Password do not match!";
                }
                const user = await getUserInfoByUserId(userId);
                const newUser = await updateUser(
                    firstName,
                    lastName,
                    user.email,
                    phoneNumber,
                    newPassword,
                    user.reviewIds,
                    newProfilePictureLocation,
                    user.drinkReserved,
                    user.role
                );
                req.session.destroy();
                res.status(200).redirect("/user/login");
            } catch (error) {
                //return render internal error
            }
        } else {
            //if not logged in, return error to guide user to log in first
        }
    });

export default router;