import Router from "express"

const router = Router();
import validation from "../publicMethods.js";
import {
    getAllDrinkReservedByUserId,
    getAllReviewsByUserId,
    getUserIdByEmail,
    getUserPasswordById,
    updateUser
} from "../data/user.js";
import {getReviewInfoByReviewId} from "../data/reviews.js"
import {getDrinkInfoByDrinkId} from "../data/drinks.js"
import xss from "xss";
import multer from "multer";
import bcrypt from 'bcrypt';

const upload = multer({
    dest: "../public/uploads/",
    limits: { fileSize: 10485760 },
    onError: function (err, next) {
        console.log("error", err);
        next(err);
    },
});

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
                //store drink and review into a array and display them to frontend
                let drinkReservedArray = [];
                let reviewsArray = [];
                for (let i = 0; i < drinkReserved.length; i++) {
                    const drinkDetail = await getDrinkInfoByDrinkId(drinkReserved[i].drinkId);
                    if(drinkDetail){
                        drinkDetail.timestamp = drinkReserved[i].timestamp;
                        drinkReservedArray.push(drinkDetail);
                    }
                }
                for (let j = 0; j < reviews.length; j++) {
                    const review = await getReviewInfoByReviewId(reviews[j].toString());
                    let drinkDetail;
                    if(review){
                        drinkDetail = await getDrinkInfoByDrinkId(review.drinkId.toString());
                    }

                    if(review && drinkDetail){
                        const reviewsDisplayOnUserProfile={
                            reviewId: review._id,
                            reviewText : review.reviewText,
                            timestamp: review.timeStamp,
                            drinkId: review.drinkId,
                            drinkName: drinkDetail.name,
                            reviewPicture: review.reviewPictureLocation,
                            drinkPicture: drinkDetail.drinkPictureLocation
                        }
                        reviewsArray.push(reviewsDisplayOnUserProfile);
                    }
                }
                reviewsArray = reviewsArray.sort((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
                drinkReservedArray = drinkReservedArray.sort((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });


                //render drink, review, user info to user home page
                return res.render('profile',
                    {
                        isAdmin: req.session.user.role === "admin",
                        login: true,
                        title: "User Center",
                        user: req.session.user,
                        drinkReserved: drinkReservedArray,
                        reviews: reviewsArray,
                        userId: req.session.user.userId
                    });
            } catch (error) {
                //render error page that shows internal error
                res.status(404).render('error', {
                    errorMsg: error,
                    title: "Internal Server Error"
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
                        req.file);

                    if(user.updatedUser !== true){
                        return res.status(500).json({ success: false, message: "internal server error" });
                    }
                    const newUserInfo = user.newUserInfo;
                    req.session.user = {
                        userId: newUserInfo.userId,
                        firstName: newUserInfo.firstName,
                        lastName: newUserInfo.lastName,
                        email: newUserInfo.email,
                        phoneNumber: newUserInfo.phoneNumber,
                        profilePictureLocation: newUserInfo.profilePictureLocation,
                        role: newUserInfo.role
                    };
                    return res.status(200).json({ success: true, message: "successfully updated the user info"});
                }catch (error){
                    return res.status(500).json({ success: false, message: error });
                }
            }catch (error){
                return res.status(500).json({ success: false, message: error });
            }
        }
    });

export default router;