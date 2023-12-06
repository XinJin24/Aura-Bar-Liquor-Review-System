import express from "express";
import session from 'express-session';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import configRoutes from './routes/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const staticDir = express.static(__dirname + '/public');
app.use('/public', staticDir);
app.use('/', staticDir);

const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        if_eq: function (val1, val2) {
            return val1 === val2;
        },
        not_past_date: function (date) {
            const eventDate = Date.parse(date);
            const now = Date.now();
            return eventDate >= now;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

app.use(session({
    name: 'AuthCookie',
    secret: 'some secretss',
    saveUninitialized: true,
    resave: false
}));

// const isLoggedIn = (req, res, next) => {
//     if (!req.session.user) {
//         return res.redirect('/login');
//     }
//     next();
// };
//
// const protectedRoutes = ['/home','/login', '/drinks', '/reviews', '/users', '/logout', '/register'];
// app.use(protectedRoutes, isLoggedIn);
//
// const redirectLoggedIn = (req, res, next) => {
//     if (req.session.user) {
//         return res.redirect('/home');
//     }
//     next();
// };

// app.use(['/login', '/register'], redirectLoggedIn);
//
// app.use('/logout', (req, res) => {
//     if (!req.session.user) {
//         return res.render('login', { title: 'Login' });
//     }
//     req.session.destroy();
//     return res.render('logout', { title: 'logout' });
// });

configRoutes(app);

app.use('*', (req, res) => {
    res.render('Error', { title: '404' });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
