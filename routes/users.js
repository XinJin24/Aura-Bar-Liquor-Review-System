import Router from "express"

const router = Router();
import validation from "../publicMethods.js";
import {
    createUser,

    getAllDrinkReservedByUserId,
    getAllReviewsByUserId,
    getUserIdByEmail,
    getUserInfoByUserId, getUserPasswordById,
    updateUser
} from "../data/users.js";
import {getReviewInfoByReviewId} from "../data/reviews.js"
import {getDrinkInfoByDrinkId} from "../data/drinks.js"
import xss from "xss";
import multer from "multer";
import bcrypt from "bcrypt";

const upload = multer({
    dest: "../public/uploads/",
    limits: { fileSize: 10485760 },
    onError: function (err, next) {
        console.log("error", err);
        next(err);
    },
});


//user/6574a7ed5bc5e4a2b3d983db
router
    .route('/:id')
    .get(async (req, res) => {
        //if login
        if (req.session.user) {
            try {
                const userId = validation.validateId(req.params.id, "ID");
                let userIdFromDB = await getUserIdByEmail(req.session.user.email);
                if (userIdFromDB !== userId) {
                    throw `Error: You don't have access to ${userId}`
                }
                let drinkReserved = await getAllDrinkReservedByUserId(userId);
                let reviews = await getAllReviewsByUserId(userId);
                // console.log(drinkReserved);
                //store drink and review into a array and display them to frontend
                let drinkReservedArray = [];
                let reviewsArray = [];
                for (let i = 0; i < drinkReserved.length; i++) {
                    drinkReservedArray.push(await getDrinkInfoByDrinkId(drinkReserved[i].toString()));
                }
                for (let j = 0; j < reviews.length; j++) {
                    const review = await getReviewInfoByReviewId(reviews[j].toString());
                    const drink = await getDrinkInfoByDrinkId(review.drinkId.toString());
                    const reviewsDisplayOnUserProfile={
                        reviewId: review._id,
                        reviewText : review.reviewText,
                        timestamp: review.timeStamp,
                        drinkName: drink.name,
                        drinkPicture: drink.drinkPictureLocation
                    }
                    reviewsArray.push(reviewsDisplayOnUserProfile);
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
                res.status(404).render('error', {
                    errorMsg: error,
                    login: true
                })
            }
        } else {
            return res.render('register', {title: "Register"});
        }
    })
    .post(upload.single("photoInput"), async (req, res) => {
        if(req.session.user) {
            try{
                let firstName = validation.validateName(xss(req.body.firstName), "First Name");
                let lastName = validation.validateName(xss(req.body.lastName), "Last Name");
                let email = validation.validateEmail(xss(req.body.email));
                let phoneNumber = validation.validatePhoneNumber(xss(req.body.phoneNumber));
                let oldPassword = validation.validatePassword(xss(req.body.oldPassword), "oldPassword");
                let newPassword = validation.validatePassword(xss(req.body.newPassword), "newPassword");
                let confirmNewPassword = validation.validatePassword(xss(req.body.confirmNewPassword), "confirmNewPassword");
                const userId = req.session.user.userId;
                const realPassWord = (await getUserPasswordById(userId)).password;
                const checkOldPassword = await bcrypt.compare(
                    oldPassword,
                    realPassWord
                );
                if (!checkOldPassword) {
                    throw "Error: the old password is incorrect";
                }

                if (newPassword !== confirmNewPassword) {
                    throw "Error: new Passwords do not match";
                }

                try{
                    const user = await updateUser(
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        newPassword,
                        req.file,);
                    if(user.updatedUser !== true){
                        throw "Error: some problems when updating your user info";
                    }
                }catch (error){
                    return res.status(500).render('error', {
                        title: "Internal Server Error",
                        errorMsg: error
                    });
                }
            }catch (error){
                return res.status(400).render("modifyUserInfo", {
                    error: error,
                    login: true,
                    title: "Update User Info"
                });
            }
        }
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
    .post(upload.single("photoInput"),async (req, res) => {
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