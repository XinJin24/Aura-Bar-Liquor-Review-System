import Router from "express"

const router = Router();
import validation from "../publicMethods.js";
import {createUser, loginUser} from "../data/users.js";

router
    .route('/').get(async (req, res) => {
    if (req.session.user) {
        return res.redirect('/home');
    } else {
        return res.redirect('/login');
    }
});

