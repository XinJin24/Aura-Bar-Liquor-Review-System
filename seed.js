import {
    addReviewIdToADrink,
    createDrink, getAllDrinks, reserveDrink, updateAllDrinkRating,
} from "./data/drinks.js"
import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {addReviewIdToAUser, createUser, getAllUsers} from "./data/users.js";
import {createReview, getAllReviews} from "./data/reviews.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath) + "/test/";


let drink1 = null;
let drink2 = null;
let drink3 = null;
let drink4 = null;
let drink5 = null;
let drink6 = null;
let drink7 = null;
let drink8 = null;
let drink9 = null;
let drink10 = null;

let drink11 = null;
let drink12 = null;
let drink13 = null;
let drink14 = null;
let drink15 = null;
let drink16 = null;
let drink17 = null;
let drink18 = null;
let drink19 = null;
let drink20 = null;

let drink21 = null;
let drink22 = null;
let drink23 = null;
let drink24 = null;
let drink25 = null;
let drink26 = null;
let drink27 = null;
let drink28 = null;
let drink29 = null;
let drink30 = null;

let drink31 = null;
let drink32 = null;
let drink33 = null;
let drink34 = null;
let drink35 = null;
let drink36 = null;
let drink37 = null;
let drink38 = null;
let drink39 = null;
let drink40 = null;
let drink41 = null;
let drink42 = null;
let drink43 = null;


const drinkPicturePath1 = join(currentDirPath, "drinkPhotos/drink1.jpg");
const drinkPicturePath2 = join(currentDirPath, "drinkPhotos/drink2.jpg");
const drinkPicturePath3 = join(currentDirPath, "drinkPhotos/drink3.jpg");
const drinkPicturePath4 = join(currentDirPath, "drinkPhotos/drink4.jpg");
const drinkPicturePath5 = join(currentDirPath, "drinkPhotos/drink5.jpg");
const drinkPicturePath6 = join(currentDirPath, "drinkPhotos/drink6.jpg");
const drinkPicturePath7 = join(currentDirPath, "drinkPhotos/drink7.jpg");
const drinkPicturePath8 = join(currentDirPath, "drinkPhotos/drink8.jpg");
const drinkPicturePath9 = join(currentDirPath, "drinkPhotos/drink9.jpg");
const drinkPicturePath10 = join(currentDirPath, "drinkPhotos/drink10.jpg");

const drinkPicturePath11 = join(currentDirPath, "drinkPhotos/drink11.jpg");
const drinkPicturePath12 = join(currentDirPath, "drinkPhotos/drink12.jpg");
const drinkPicturePath13 = join(currentDirPath, "drinkPhotos/drink13.jpg");
const drinkPicturePath14 = join(currentDirPath, "drinkPhotos/drink14.jpg");
const drinkPicturePath15 = join(currentDirPath, "drinkPhotos/drink15.jpg");
const drinkPicturePath16 = join(currentDirPath, "drinkPhotos/drink16.jpg");
const drinkPicturePath17 = join(currentDirPath, "drinkPhotos/drink17.jpg");
const drinkPicturePath18 = join(currentDirPath, "drinkPhotos/drink18.jpg");
const drinkPicturePath19 = join(currentDirPath, "drinkPhotos/drink19.jpg");
const drinkPicturePath20 = join(currentDirPath, "drinkPhotos/drink20.jpg");

const drinkPicturePath21 = join(currentDirPath, "drinkPhotos/drink21.jpg");
const drinkPicturePath22 = join(currentDirPath, "drinkPhotos/drink22.jpg");
const drinkPicturePath23 = join(currentDirPath, "drinkPhotos/drink23.jpg");
const drinkPicturePath24 = join(currentDirPath, "drinkPhotos/drink24.jpg");
const drinkPicturePath25 = join(currentDirPath, "drinkPhotos/drink25.jpg");
const drinkPicturePath26 = join(currentDirPath, "drinkPhotos/drink26.jpg");
const drinkPicturePath27 = join(currentDirPath, "drinkPhotos/drink27.jpg");
const drinkPicturePath28 = join(currentDirPath, "drinkPhotos/drink28.jpg");
const drinkPicturePath29 = join(currentDirPath, "drinkPhotos/drink29.jpg");
const drinkPicturePath30 = join(currentDirPath, "drinkPhotos/drink30.jpg");

const drinkPicturePath31 = join(currentDirPath, "drinkPhotos/drink31.jpg");
const drinkPicturePath32 = join(currentDirPath, "drinkPhotos/drink32.jpg");
const drinkPicturePath33 = join(currentDirPath, "drinkPhotos/drink33.jpg");
const drinkPicturePath34 = join(currentDirPath, "drinkPhotos/drink34.jpg");
const drinkPicturePath35 = join(currentDirPath, "drinkPhotos/drink35.jpg");
const drinkPicturePath36 = join(currentDirPath, "drinkPhotos/drink36.jpg");
const drinkPicturePath37 = join(currentDirPath, "drinkPhotos/drink37.jpg");
const drinkPicturePath38 = join(currentDirPath, "drinkPhotos/drink38.jpg");
const drinkPicturePath39 = join(currentDirPath, "drinkPhotos/drink39.jpg");
const drinkPicturePath40 = join(currentDirPath, "drinkPhotos/drink40.jpg");
const drinkPicturePath41 = join(currentDirPath, "drinkPhotos/drink41.jpg");
const drinkPicturePath42 = join(currentDirPath, "drinkPhotos/drink42.jpg");
const drinkPicturePath43 = join(currentDirPath, "drinkPhotos/drink43.jpg");


let user1 = null;
let user2 = null;
let user3 = null;
let user4 = null;
let user5 = null;
let user6 = null;
let user7 = null;
let user8 = null;
let user9 = null;
let user10 = null;
let user11 = null;
let user12 = null;
let user13 = null;
let user14 = null;
let user15 = null;
let user16 = null;
let user17 = null;
let user18 = null;
let user19 = null;
let user20 = null;
let user21 = null;
let user22 = null;
let user23 = null;
let user24 = null;
let user25 = null;
let user26 = null;
let user27 = null;
let user28 = null;
let user29 = null;
let user30 = null;
let user31 = null;
let user32 = null;
let user33 = null;
let user34 = null;
let user35 = null;
let user36 = null;
let user37 = null;
let user38 = null;
let user39 = null;
let user40 = null;
let user41 = null;
let user42 = null;
let user43 = null;
let user44 = null;
let user45 = null;
let user46 = null;
let user47 = null;
let user48 = null;
let user49 = null;
let user50 = null;

const profilePicture1 = join(currentDirPath, "profilePhotos/user1.avif");
const profilePicture2 = join(currentDirPath, "profilePhotos/user2.avif");
const profilePicture3 = join(currentDirPath, "profilePhotos/user3.avif");
const profilePicture4 = join(currentDirPath, "profilePhotos/user4.avif");
const profilePicture5 = join(currentDirPath, "profilePhotos/user5.avif");
const profilePicture6 = join(currentDirPath, "profilePhotos/user6.avif");
const profilePicture7 = join(currentDirPath, "profilePhotos/user7.avif");
const profilePicture8 = join(currentDirPath, "profilePhotos/user8.avif");
const profilePicture9 = join(currentDirPath, "profilePhotos/user9.avif");
const profilePicture10 = join(currentDirPath, "profilePhotos/user10.avif");
const profilePicture11 = join(currentDirPath, "profilePhotos/user11.avif");
const profilePicture12 = join(currentDirPath, "profilePhotos/user12.avif");
const profilePicture13 = join(currentDirPath, "profilePhotos/user13.avif");
const profilePicture14 = join(currentDirPath, "profilePhotos/user14.avif");
const profilePicture15 = join(currentDirPath, "profilePhotos/user15.avif");
const profilePicture16 = join(currentDirPath, "profilePhotos/user16.avif");
const profilePicture17 = join(currentDirPath, "profilePhotos/user17.avif");
const profilePicture18 = join(currentDirPath, "profilePhotos/user18.avif");
const profilePicture19 = join(currentDirPath, "profilePhotos/user19.avif");
const profilePicture20 = join(currentDirPath, "profilePhotos/user20.avif");
const profilePicture21 = join(currentDirPath, "profilePhotos/user21.avif");
const profilePicture22 = join(currentDirPath, "profilePhotos/user22.avif");
const profilePicture23 = join(currentDirPath, "profilePhotos/user23.avif");
const profilePicture24 = join(currentDirPath, "profilePhotos/user24.avif");
const profilePicture25 = join(currentDirPath, "profilePhotos/user25.avif");
const profilePicture26 = join(currentDirPath, "profilePhotos/user26.avif");
const profilePicture27 = join(currentDirPath, "profilePhotos/user27.avif");
const profilePicture28 = join(currentDirPath, "profilePhotos/user28.avif");
const profilePicture29 = join(currentDirPath, "profilePhotos/user29.avif");
const profilePicture30 = join(currentDirPath, "profilePhotos/user30.avif");
const profilePicture31 = join(currentDirPath, "profilePhotos/user31.avif");
const profilePicture32 = join(currentDirPath, "profilePhotos/user32.avif");
const profilePicture33 = join(currentDirPath, "profilePhotos/user33.avif");
const profilePicture34 = join(currentDirPath, "profilePhotos/user34.avif");
const profilePicture35 = join(currentDirPath, "profilePhotos/user35.avif");
const profilePicture36 = join(currentDirPath, "profilePhotos/user36.avif");
const profilePicture37 = join(currentDirPath, "profilePhotos/user37.avif");
const profilePicture38 = join(currentDirPath, "profilePhotos/user38.avif");
const profilePicture39 = join(currentDirPath, "profilePhotos/user39.avif");
const profilePicture40 = join(currentDirPath, "profilePhotos/user40.avif");
const profilePicture41 = join(currentDirPath, "profilePhotos/user41.avif");
const profilePicture42 = join(currentDirPath, "profilePhotos/user42.avif");
const profilePicture43 = join(currentDirPath, "profilePhotos/user43.avif");
const profilePicture44 = join(currentDirPath, "profilePhotos/user44.avif");
const profilePicture45 = join(currentDirPath, "profilePhotos/user45.avif");
const profilePicture46 = join(currentDirPath, "profilePhotos/user46.avif");
const profilePicture47 = join(currentDirPath, "profilePhotos/user47.avif");
const profilePicture48 = join(currentDirPath, "profilePhotos/user48.avif");
const profilePicture49 = join(currentDirPath, "profilePhotos/user49.avif");
const profilePicture50 = join(currentDirPath, "profilePhotos/user50.avif");

let review1 = null;
let review2 = null;
let review3 = null;
let review4 = null;
let review5 = null;
let review6 = null;
let review7 = null;
let review8 = null;
let review9 = null;
let review10 = null;
let review11 = null;
let review12 = null;
let review13 = null;
let review14 = null;
let review15 = null;
let review16 = null;
let review17 = null;
let review18 = null;
let review19 = null;
let review20 = null;
let review21 = null;
let review22 = null;
let review23 = null;
let review24 = null;
let review25 = null;
let review26 = null;
let review27 = null;
let review28 = null;
let review29 = null;
let review30 = null;
let review31 = null;
let review32 = null;
let review33 = null;
let review34 = null;
let review35 = null;
let review36 = null;
let review37 = null;
let review38 = null;
let review39 = null;
let review40 = null;
let review41 = null;
let review42 = null;
let review43 = null;
let review44 = null;
let review45 = null;
let review46 = null;
let review47 = null;
let review48 = null;
let review49 = null;
let review50 = null;
let review51 = null;
let review52 = null;
let review53 = null;
let review54 = null;
let review55 = null;
let review56 = null;
let review57 = null;
let review58 = null;
let review59 = null;
let review60 = null;
let review61 = null;
let review62 = null;
let review63 = null;
let review64 = null;
let review65 = null;
let review66 = null;
let review67 = null;
let review68 = null;
let review69 = null;
let review70 = null;
let review71 = null;
let review72 = null;
let review73 = null;
let review74 = null;
let review75 = null;
let review76 = null;
let review77 = null;
let review78 = null;
let review79 = null;
let review80 = null;
let review81 = null;
let review82 = null;
let review83 = null;
let review84 = null;
let review85 = null;
let review86 = null;
let review87 = null;
let review88 = null;
let review89 = null;
let review90 = null;
let review91 = null;
let review92 = null;
let review93 = null;
let review94 = null;
let review95 = null;
let review96 = null;
let review97 = null;
let review98 = null;
let review99 = null;
let review100 = null;

const reviewPicture1 = join(currentDirPath, "reviewPhotos/review1.jpg");
const reviewPicture2 = join(currentDirPath, "reviewPhotos/review2.jpg");
const reviewPicture3 = join(currentDirPath, "reviewPhotos/review3.jpg");
const reviewPicture4 = join(currentDirPath, "reviewPhotos/review4.jpg");
const reviewPicture5 = join(currentDirPath, "reviewPhotos/review5.jpg");
const reviewPicture6 = join(currentDirPath, "reviewPhotos/review6.jpg");
const reviewPicture7 = join(currentDirPath, "reviewPhotos/review7.jpg");
const reviewPicture8 = join(currentDirPath, "reviewPhotos/review8.jpg");
const reviewPicture9 = join(currentDirPath, "reviewPhotos/review9.jpg");
const reviewPicture10 = join(currentDirPath, "reviewPhotos/review10.jpg");
const reviewPicture11 = join(currentDirPath, "reviewPhotos/review11.jpg");
const reviewPicture12 = join(currentDirPath, "reviewPhotos/review12.jpg");
const reviewPicture13 = join(currentDirPath, "reviewPhotos/review13.jpg");
const reviewPicture14 = join(currentDirPath, "reviewPhotos/review14.jpg");
const reviewPicture15 = join(currentDirPath, "reviewPhotos/review15.jpg");
const reviewPicture16 = join(currentDirPath, "reviewPhotos/review16.jpg");
const reviewPicture17 = join(currentDirPath, "reviewPhotos/review17.jpg");
const reviewPicture18 = join(currentDirPath, "reviewPhotos/review18.jpg");
const reviewPicture19 = join(currentDirPath, "reviewPhotos/review19.jpg");
const reviewPicture20 = join(currentDirPath, "reviewPhotos/review20.jpg");
const reviewPicture21 = join(currentDirPath, "reviewPhotos/review21.jpg");
const reviewPicture22 = join(currentDirPath, "reviewPhotos/review22.jpg");
const reviewPicture23 = join(currentDirPath, "reviewPhotos/review23.jpg");
const reviewPicture24 = join(currentDirPath, "reviewPhotos/review24.jpg");
const reviewPicture25 = join(currentDirPath, "reviewPhotos/review25.jpg");
const reviewPicture26 = join(currentDirPath, "reviewPhotos/review26.jpg");
const reviewPicture27 = join(currentDirPath, "reviewPhotos/review27.jpg");
const reviewPicture28 = join(currentDirPath, "reviewPhotos/review28.jpg");
const reviewPicture29 = join(currentDirPath, "reviewPhotos/review29.jpg");
const reviewPicture30 = join(currentDirPath, "reviewPhotos/review30.jpg");
const reviewPicture31 = join(currentDirPath, "reviewPhotos/review31.jpg");
const reviewPicture32 = join(currentDirPath, "reviewPhotos/review32.jpg");
const reviewPicture33 = join(currentDirPath, "reviewPhotos/review33.jpg");
const reviewPicture34 = join(currentDirPath, "reviewPhotos/review34.jpg");
const reviewPicture35 = join(currentDirPath, "reviewPhotos/review35.jpg");
const reviewPicture36 = join(currentDirPath, "reviewPhotos/review36.jpg");
const reviewPicture37 = join(currentDirPath, "reviewPhotos/review37.jpg");
const reviewPicture38 = join(currentDirPath, "reviewPhotos/review38.jpg");
const reviewPicture39 = join(currentDirPath, "reviewPhotos/review39.jpg");
const reviewPicture40 = join(currentDirPath, "reviewPhotos/review40.jpg");
const reviewPicture41 = join(currentDirPath, "reviewPhotos/review41.jpg");
const reviewPicture42 = join(currentDirPath, "reviewPhotos/review42.jpg");
const reviewPicture43 = join(currentDirPath, "reviewPhotos/review43.jpg");
const reviewPicture44 = join(currentDirPath, "reviewPhotos/review44.jpg");
const reviewPicture45 = join(currentDirPath, "reviewPhotos/review45.jpg");
const reviewPicture46 = join(currentDirPath, "reviewPhotos/review46.jpg");
const reviewPicture47 = join(currentDirPath, "reviewPhotos/review47.jpg");
const reviewPicture48 = join(currentDirPath, "reviewPhotos/review48.jpg");
const reviewPicture49 = join(currentDirPath, "reviewPhotos/review49.jpg");
const reviewPicture50 = join(currentDirPath, "reviewPhotos/review50.jpg");


const reviewTexts = [
    "A delightful surprise.",
    "Exemplary quality.",
    "Pure perfection.",
    "Absolutely outstanding.",
    "Exquisitely crafted.",
    "Unmatched excellence.",
    "A remarkable discovery.",
    "Magnificent flavor profile.",
    "An exquisite treat.",
    "Mouthwateringly good.",
    "Exceptional craftsmanship.",
    "A flavor sensation.",
    "Deliciously satisfying.",
    "Rich and rewarding.",
    "A work of art.",
    "Unforgettable and divine.",
    "A toast to excellence.",
    "Absolutely incredible.",
    "A cut above the rest.",
    "A must-have experience.",
    "Truly exceptional.",
    "A sip of heaven.",
    "Exceptionally smooth.",
    "Masterfully created.",
    "Superbly balanced.",
    "A treasure of taste.",
    "The pinnacle of perfection.",
    "An epic adventure in flavor.",
    "Elegance in every sip.",
    "A symphony of taste.",
    "Absolutely top-tier.",
    "An exquisite masterpiece.",
    "Indulgence at its finest.",
    "Sip and savor the greatness.",
    "Pure liquid luxury.",
    "A true masterpiece.",
    "A journey in taste.",
    "Exceptional from start to finish.",
    "A revelation in flavor.",
    "A sip of pure joy.",
    "Unforgettable and delicious.",
    "Simply phenomenal.",
    "The taste of elegance.",
    "Absolutely superb.",
    "A true treasure.",
    "An exceptional choice.",
    "A taste of luxury.",
    "A taste sensation.",
    "Incredibly good.",
    "A masterpiece of flavor.",
    "Unparalleled quality.",
    "Absolutely stunning.",
    "A sip of perfection.",
    "Exquisite and divine.",
    "A true gem of taste.",
    "A work of art.",
    "An absolute treat.",
    "A flavor sensation.",
    "Absolutely phenomenal.",
    "An unparalleled blend.",
    "A flavor masterpiece.",
    "Pure liquid joy.",
    "A true delight.",
    "An absolute pleasure.",
    "An exquisite blend.",
    "A true taste sensation.",
    "A journey through flavor.",
    "A taste to cherish.",
    "A flavor masterpiece.",
    "A sip of heaven.",
    "An unmatched delight.",
    "A taste revelation.",
    "Absolutely superb.",
    "A true treasure.",
    "An exceptional choice.",
    "A taste of luxury.",
    "A taste sensation.",
    "Incredibly good.",
    "A masterpiece of flavor.",
    "Unparalleled quality.",
    "Absolutely stunning.",
    "A sip of perfection.",
    "Exquisite and divine.",
    "A true gem of taste.",
    "A work of art.",
    "An absolute treat.",
    "An absolute pleasure.",
    "An exquisite blend.",
    "A true taste sensation.",
    "A journey through flavor.",
    "A taste to cherish.",
    "A flavor masterpiece.",
    "A sip of heaven.",
    "An unmatched delight.",
    "A taste revelation.",
    "Absolutely superb.",
    "A true treasure.",
    "An exceptional choice.",
    "A taste of luxury.",
    "A taste sensation.",
    "Incredibly good.",
    "A masterpiece of flavor.",
    "Unparalleled quality.",
    "Absolutely stunning.",
    "A sip of perfection.",
    "Exquisite and divine.",
    "A true gem of taste.",
    "A work of art.",
    "An absolute treat.",
    "A flavor sensation.",
    "Absolutely phenomenal.",
    "An unparalleled blend.",
    "A flavor masterpiece.",
    "Pure liquid joy.",
    "A true delight.",
    "An absolute pleasure.",
    "An exquisite blend.",
    "A true taste sensation.",
    "A journey through flavor.",
    "A taste to cherish.",
    "A flavor masterpiece.",
    "A sip of heaven.",
    "An unmatched delight.",
    "A taste revelation.",
    "Absolutely superb.",
    "A true treasure.",
    "An exceptional choice.",
    "A taste of luxury.",
    "A taste sensation.",
    "Incredibly good.",
    "A masterpiece of flavor.",
    "Unparalleled quality.",
    "Absolutely stunning.",
    "A sip of perfection.",
    "Exquisite and divine.",
    "A true gem of taste.",
    "A work of art.",
    "An absolute treat.",
    "A flavor sensation.",
    "Absolutely phenomenal.",
    "An unparalleled blend.",
    "A flavor masterpiece.",
    "Pure liquid joy.",
    "A true delight.",
    "An absolute pleasure.",
    "An exquisite blend.",
    "A true taste sensation.",
    "A journey through flavor.",
    "A taste to cherish.",
    "A flavor masterpiece.",
    "A sip of heaven.",
    "An unmatched delight.",
    "A taste revelation.",
    "Absolutely superb.",
    "A true treasure.",
    "An exceptional choice.",
    "A taste of luxury.",
    "A taste sensation.",
    "Incredibly good.",
    "A masterpiece of flavor.",
    "Unparalleled quality.",
    "Absolutely stunning.",
    "A sip of perfection.",
    "A flavor sensation.",
    "Absolutely phenomenal.",
    "An unparalleled blend.",
    "A flavor masterpiece.",
    "Pure liquid joy.",
    "A true delight.",
    "An absolute pleasure.",
    "An exquisite blend.",
    "A true taste sensation.",
    "A journey through flavor.",
    "A taste to cherish.",
    "A flavor masterpiece.",
    "A sip of heaven.",
    "An unmatched delight."]

const reviewPictures = [
    reviewPicture1,
    reviewPicture2,
    reviewPicture3,
    reviewPicture4,
    reviewPicture5,
    reviewPicture6,
    reviewPicture7,
    reviewPicture8,
    reviewPicture9,
    reviewPicture10,
    reviewPicture11,
    reviewPicture12,
    reviewPicture13,
    reviewPicture14,
    reviewPicture15,
    reviewPicture16,
    reviewPicture17,
    reviewPicture18,
    reviewPicture19,
    reviewPicture20,
    reviewPicture21,
    reviewPicture22,
    reviewPicture23,
    reviewPicture24,
    reviewPicture25,
    reviewPicture26,
    reviewPicture27,
    reviewPicture28,
    reviewPicture29,
    reviewPicture30,
    reviewPicture31,
    reviewPicture32,
    reviewPicture33,
    reviewPicture34,
    reviewPicture35,
    reviewPicture36,
    reviewPicture37,
    reviewPicture38,
    reviewPicture39,
    reviewPicture40,
    reviewPicture41,
    reviewPicture42,
    reviewPicture43,
    reviewPicture44,
    reviewPicture45,
    reviewPicture46,
    reviewPicture47,
    reviewPicture48,
    reviewPicture49,
    reviewPicture50,
];


//"whiskey", "vodka", "rum", "gin", "tequila", "brandy", "liqueur", "wine", "beer", "juice", "other"
try {
    drink1 = await createDrink("Old Fashioned", "whiskey", "- 2 oz bourbon or rye whiskey\n" +
        "- 2 dashes Angostura bitters\n" +
        "- 1 sugar cube or 1 tsp sugar\n" +
        "- Orange twist garnish", drinkPicturePath1, 10, 10);

    drink2 = await createDrink("Margarita", "tequila", "- 2 oz silver tequila\n" +
        "- 1 oz Cointreau\n" +
        "- 1 oz lime juice\n" +
        "- Salt for the rim", drinkPicturePath2, 10, 12);

    drink3 = await createDrink("Cosmopolitan", "vodka", "- 1.5 oz citrus vodka\n" +
        "- 1 oz Cointreau\n" +
        "- .5 oz lime juice\n" +
        "- .25 oz cranberry juice", drinkPicturePath3, 10, 15);

    drink4 = await createDrink("Negroni", "gin", "- 1 oz gin\n" +
        "- 1 oz Campari\n" +
        "- 1 oz sweet vermouth", drinkPicturePath4, 10, 19);

    drink5 = await createDrink("Moscow Mule", "vodka ", "- 2 oz vodka\n" +
        "- 4 to 6 oz ginger beer\n" +
        "- .5 oz lime juice", drinkPicturePath5, 10, 10);

    drink6 = await createDrink("Martini", "vodka", "- 3 oz gin or vodka\n" +
        "- .5 oz dry vermouth\n" +
        "- Lemon peel or olive", drinkPicturePath6, 10, 22);

    drink7 = await createDrink("Mojito", "rum", "- 3 mint leaves\n" +
        "- 2 oz white rum\n" +
        "- .75 oz lime juice\n" +
        "- .5 oz simple syrup", drinkPicturePath7, 10, 18);

    drink8 = await createDrink("Whiskey Sour", "whiskey", "- 2 oz whiskey\n" +
        "- 1 oz lemon juice\n" +
        "- 1 tsp sugar\n" +
        "- 1 egg white (optional)", drinkPicturePath8, 10, 14);

    drink9 = await createDrink("French 75", "gin", "- 2 oz gin\n" +
        "- 2 dashes simple syrup\n" +
        "- .5 oz lemon juice\n" +
        "- Champagne", drinkPicturePath9, 10, 20);

    drink10 = await createDrink("Manhattan", "whiskey", "- 2 oz rye whiskey\n" +
        "- 1 oz sweet vermouth\n" +
        "- 2 dashes Angostura bitters", drinkPicturePath10, 10, 24);

    // New drinks
    drink11 = await createDrink("Spritz", "mix", "- Equal parts Aperol\n" +
        "- Equal parts Cinzano Prosecco\n" +
        "- Splash of Soda", drinkPicturePath11, 10, 16);

    drink12 = await createDrink("Gimlet", "mix", "- 2 oz gin or vodka\n" +
        "- .75 oz simple syrup\n" +
        "- .75 oz lime juice", drinkPicturePath12, 10, 14);

    drink13 = await createDrink("Sazerac", "whiskey", "- 2 oz rye whiskey\n" +
        "- .5 oz simple syrup\n" +
        "- 2 dashes Peychaud's bitters\n" +
        "- Absinthe", drinkPicturePath13, 10, 21);

    drink14 = await createDrink("Pimm's Cup", "mix", "- 50 ml (about 1.75 oz) Pimm's No.1\n" +
        "- 150 ml (about 5 oz) lemonade\n" +
        "- Mint, orange, strawberries\n" +
        "- Cucumber to garnish", drinkPicturePath14, 10, 18);

    drink15 = await createDrink("Aviation", "gin", "- 2 oz gin\n" +
        "- .5 oz maraschino liqueur\n" +
        "- .75 oz lemon juice\n" +
        "- .25 oz creme de violette", drinkPicturePath15, 10, 20);

    drink16 = await createDrink("Vesper", "mix", "- 3 oz gin\n" +
        "- 1 oz vodka\n" +
        "- .5 oz Lillet blanc", drinkPicturePath16, 10, 25);

    drink17 = await createDrink("Tom Collins", "gin", "- 2 oz Old Tom gin\n" +
        "- 1 oz lemon juice\n" +
        "- .5 oz simple syrup\n" +
        "- Club soda to top", drinkPicturePath17, 10, 16);

    drink18 = await createDrink("Mimosa", "champagne", "- 2.5 oz champagne\n" +
        "- 2.5 oz orange juice", drinkPicturePath18, 10, 12);

    drink19 = await createDrink("Paloma", "tequila", "- 2 oz tequila\n" +
        "- .5 oz lime juice\n" +
        "- Grapefruit soda to top", drinkPicturePath19, 10, 14);

    drink20 = await createDrink("Last Word", "mix", "- .75 oz gin\n" +
        "- .75 oz maraschino liqueur\n" +
        "- .75 oz green chartreuse\n" +
        "- .75 oz lime juice", drinkPicturePath20, 10, 22);

    drink21 = await createDrink("Sidecar", "brandy", "- 2 oz VS or VSOP Cognac\n" +
        "- 1 oz Cointreau\n" +
        "- .75 oz lemon juice", drinkPicturePath21, 10, 18);

    drink22 = await createDrink("Mint Julep", "bourbon", "- 2 oz bourbon\n" +
        "- 8-10 mint leaves\n" +
        "- .25 oz simple syrup", drinkPicturePath22, 10, 15);

    drink23 = await createDrink("Daiquiri", "rum", "- 2 oz light rum\n" +
        "- 1 oz simple syrup\n" +
        "- 1 oz lime juice", drinkPicturePath23, 10, 14);

    drink24 = await createDrink("Dark 'n Stormy", "rum", "- 1.5 oz Gosling's Black Seal Rum\n" +
        "- Ginger beer to top", drinkPicturePath24, 10, 16);

    drink25 = await createDrink("Martinez", "gin", "- 1.5 oz Old Tom gin\n" +
        "- 1.5 oz sweet vermouth\n" +
        "- .25 oz Luxardo maraschino liqueur\n" +
        "- 2 dashes Angostura or orange bitters", drinkPicturePath25, 10, 20);

    drink26 = await createDrink("Boulevardier", "mix", "- 1 oz Campari\n" +
        "- 1 oz sweet red vermouth\n" +
        "- 1 oz to 1.5 oz bourbon (rye whiskey is often used instead in modern-day versions)", drinkPicturePath26, 10,19);

    drink27 = await createDrink("Gin and Tonic", "gin", "- 2 oz gin\n" +
        "- 4 to 6 oz tonic water", drinkPicturePath27, 10, 12);

    drink28 = await createDrink("Penicillin", "whiskey", "- 2 oz blended Scotch\n" +
        "- .75 oz freshly squeezed lemon juice\n" +
        "- .75 oz honey-ginger syrup\n" +
        "- .25 oz Islay single malt Scotch", drinkPicturePath28, 10, 23);

    drink29 = await createDrink("Champagne Cocktail", "champagne", "- 1 sugar cube\n" +
        "- 3 dashes Angostura bitters\n" +
        "- Top with champagne", drinkPicturePath29, 10, 17);

    drink30 = await createDrink("Long Island Iced Tea", "mix", "- .5 oz gin\n" +
        "- .5 oz white rum\n" +
        "- .5 oz blanco tequila\n" +
        "- .5 oz vodka\n" +
        "- .5 oz triple sec\n" +
        "- 1.25 oz homemade sour mix, or .75 oz freshly squeezed lemon juice and .5 oz simple syrup\n" +
        "Coca Cola, to taste", drinkPicturePath30, 10, 21);

    // New drinks
    drink31 = await createDrink("Greyhound", "mix", "- 2 oz vodka or gin\n" +
        "- 4 oz grapefruit juice", drinkPicturePath31, 10, 14);

    drink32 = await createDrink("Kir Royale", "mix", "- .5 oz creme de cassis\n" +
        "- Champagne, to top (or another sparkling wine)", drinkPicturePath32, 10, 18);

    drink33 = await createDrink("Bloody Mary", "vodka", "- 2.5 oz vodka\n" +
        "- .75 cup tomato juice\n" +
        "- 2 tbsp lemon juice\n" +
        "- 2 tsp Worcestershire sauce\n" +
        "- 2 dashes hot sauce (optional)\n" +
        "- .25 tsp prepared horseradish\n" +
        "- 1 pinch celery salt\n" +
        "- 1 pinch black pepper", drinkPicturePath33, 10, 16);

    drink34 = await createDrink("Mai Tai", "rum", "- Lime wedge, for rimming\n" +
        "- .5 tbsp chili powder\n" +
        "- 1 oz dark rum\n" +
        "- 1 oz white rum\n" +
        "- 1 oz freshly squeezed orange juice\n" +
        "- Juice of 1 lime\n" +
        "- 1 oz orange Curaçao\n" +
        "- .5 oz orgeat syrup\n" +
        "- 1 tbsp grenadine", drinkPicturePath34, 10, 22);

    drink35 = await createDrink("Bellini", "mix", "- 1.5 oz fresh white peach puree\n" +
        "- Prosecco, to top", drinkPicturePath35, 10, 16);

    drink36 = await createDrink("Sex on the Beach", "mix", "- 1.5 oz vodka\n" +
        "- .5 oz peach schnapps\n" +
        "- 2 oz orange juice\n" +
        "- 2 oz cranberry juice", drinkPicturePath36, 10, 20);

    drink37 = await createDrink("White Russian", "mix", "- 1.5 oz vodka\n" +
        "- .75 oz Kahlua\n" +
        "- .75 oz heavy cream", drinkPicturePath37, 10, 18);

    drink38 = await createDrink("Piña Colada", "rum", "- 2.5 oz rum\n" +
        "- 3 oz pineapple juice\n" +
        "- 1 oz coconut cream (usually Coco Lopez)", drinkPicturePath38, 10, 15);

    drink39 = await createDrink("Bee's Knees", "gin", "- 2 oz gin\n" +
        "- .75 oz freshly squeezed lemon juice\n" +
        "- .5 oz honey syrup", drinkPicturePath39, 10, 17);

    drink40 = await createDrink("Sangria", "mix", "- 1 (750-ml) bottle red wine\n" +
        "- 1 cup orange juice\n" +
        "- .5 cup brandy\n" +
        "- .25 cup granulated sugar\n" +
        "- 1 orange, sliced\n" +
        "- 1 apple, sliced\n" +
        "- 1 cup blueberries\n" +
        "- 1 cup sliced strawberries\n" +
        "- 1 (12-oz) can seltzer", drinkPicturePath40, 10, 25);

    drink41 = await createDrink("Espresso Martini", "mix", "- 2 oz vodka\n" +
        "- 1 oz coffee liquor\n" +
        "- 1 oz espresso (or cold brew coffee concentrate)\n" +
        "- .5 oz simple syrup", drinkPicturePath41, 10, 21);

    drink42 = await createDrink("Death in the Afternoon", "mix", "- 1.5 oz absinthe\n" +
        "- About 4.5 oz chilled Champagne", drinkPicturePath42, 10, 24);

    drink43 = await createDrink("Screwdriver", "vodka", "- 1 to 2 oz vodka\n" +
        "- Freshly squeezed orange juice, to top*", drinkPicturePath43, 10, 14);


    user1 = await createUser("Mike", "River", "mike.river1@example.com", "9293335817", "Abc123!@#", profilePicture1, "admin");
    user2 = await createUser("John", "Doe", "john.doe2@example.com", "9293335817", "Abc123!@#", profilePicture2, "user");
    user3 = await createUser("Jane", "Smith", "jane.smith3@example.com", "9293335817", "Abc123!@#", profilePicture3, "admin");
    user4 = await createUser("Alice", "Taylor", "alice.taylor4@example.com", "9293335817", "Abc123!@#", profilePicture4, "user");
    user5 = await createUser("Bob", "Brown", "bob.brown5@example.com", "9293335817", "Abc123!@#", profilePicture5, "admin");
    user6 = await createUser("Emma", "Wilson", "emma.wilson6@example.com", "9293335817", "Abc123!@#", profilePicture6, "user");
    user7 = await createUser("Ethan", "Miller", "ethan.miller7@example.com", "9293335817", "Abc123!@#", profilePicture7, "admin");
    user8 = await createUser("Sophia", "Davis", "sophia.davis8@example.com", "9293335817", "Abc123!@#", profilePicture8, "user");
    user9 = await createUser("Noah", "Garcia", "noah.garcia9@example.com", "9293335817", "Abc123!@#", profilePicture9, "admin");
    user10 = await createUser("Liam", "Martinez", "liam.martinez10@example.com", "9293335817", "Abc123!@#", profilePicture10, "user");


    const drinkIds = [];
    const userIds = [];

    const users = await getAllUsers();
    const drinks = await getAllDrinks();


    for (const user of users) {
        userIds.push(user._id.toString());
    }

    for (const drink of drinks) {
        drinkIds.push(drink._id.toString());
    }

    for (let i = 1; i <= 100; i++) {
        const randomDrinkId = drinkIds[Math.floor(Math.random() * drinkIds.length)];
        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
        const randomReviewText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
        const randomRating = (Math.random() * 5).toFixed(1);
        const randomReviewPicture = reviewPictures[Math.floor(Math.random() * reviewPictures.length)];

        await createReview(randomDrinkId, randomUserId, randomReviewText, randomRating, randomReviewPicture);
    }

    const reviews = await getAllReviews();
    for (const review of reviews) {
        const reviewId = review._id.toString();
        const drinkId = review.drinkId.toString();
        const userId = review.userId.toString();
        await addReviewIdToAUser(reviewId, userId);
        await addReviewIdToADrink(reviewId, drinkId);
    }
    await updateAllDrinkRating();

    for (const userId of userIds) {
        let reservedDrinks = new Set();
        const randomDrinkId = drinkIds[Math.floor(Math.random() * drinkIds.length)];
        if (!reservedDrinks.has(randomDrinkId)) {
            try {
                await reserveDrink(userId, randomDrinkId);
                reservedDrinks.add(randomDrinkId);
            } catch (error) {
                console.error(`Error reserving drink: ${error}`);
            }
        }
    }

    console.log("Finished loading all drinks, users, reviews, and added reservations");
} catch (error) {
    console.log(error);
}