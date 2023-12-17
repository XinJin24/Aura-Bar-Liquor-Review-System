import drinkRoute from './drinks.js';
import userRoute from './user.js';
import reviewRoute from './review.js';
import authRoute from './authentication.js';


const constructorMethod = (app) => {

    app.use('/', authRoute);
    app.use('/drink', drinkRoute);
    app.use('/review', reviewRoute);
    app.use('/user', userRoute);

    app.use('*', (req, res) => {
        res.status(404).render('error', {
            errorMsg: "PageNotFound",
            title: "Routing error"
        })
    });
};

export default constructorMethod;