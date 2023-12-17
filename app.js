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
app.use(express.static('public'));

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
        },
        generateStarRating: function(rating) {
            let html = '';
            for(let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    html += '<span class="filled-star">&#9733;</span>';
                } else {
                    html += '<span class="empty-star">&#9734;</span>';
                }
            }
            return html;
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

const anthenticate = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

app.use('/logout', anthenticate);
app.use('/sendMessage', anthenticate);
app.use('/checkPassword', anthenticate);
app.use('/admin', anthenticate);
app.use('/review', anthenticate);
app.use('/user', anthenticate);
app.use('/drink', anthenticate)

configRoutes(app);

app.use('*', (req, res) => {
    res.render('Error', { title: 'Page No Found', errorMsg:"wrong route!" });
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Server is running on http://localhost:3000");
});
