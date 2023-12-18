import {
    createDrink, getAllDrinks, reserveDrink, updateAllDrinkRating,
} from "./data/drinks.js"
import {fileURLToPath} from "url";
import {dirname, join} from "path";
import {createUser, getAllUsers} from "./data/user.js";
import {createReview} from "./data/reviews.js";

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
const drinkPicturePath18 = join(currentDirPath, "drinkPhotos/drink18.jpg");//join(currentDirPath, "drinkPhotos\\drink18.jpg");
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


    user1 = await createUser("Mike", "River", "mike.river1@example.com", "+19293335817", "Abc123!@#", "", "admin");
    user2 = await createUser("John", "Doe", "john.doe2@example.com", "+19293335817", "Abc123!@#", profilePicture2, "user");
    user3 = await createUser("Jane", "Smith", "jane.smith3@example.com", "+19293335817", "Abc123!@#", profilePicture3, "admin");
    user4 = await createUser("Alice", "Taylor", "alice.taylor4@example.com", "+19293335817", "Abc123!@#", profilePicture4, "user");
    user5 = await createUser("Bob", "Brown", "bob.brown5@example.com", "+19293335817", "Abc123!@#", profilePicture5, "admin");
    user6 = await createUser("Emma", "Wilson", "emma.wilson6@example.com", "+19293335817", "Abc123!@#", profilePicture6, "user");
    user7 = await createUser("Ethan", "Miller", "ethan.miller7@example.com", "+19293335817", "Abc123!@#", profilePicture7, "admin");
    user8 = await createUser("Sophia", "Davis", "sophia.davis8@example.com", "+19293335817", "Abc123!@#", profilePicture8, "user");
    user9 = await createUser("Noah", "Garcia", "noah.garcia9@example.com", "+19293335817", "Abc123!@#", profilePicture9, "admin");
    user10 = await createUser("Liam", "Martinez", "liam.martinez10@example.com", "+19293335817", "Abc123!@#", profilePicture10, "user");


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

    const numberOfReviewsPerUser=5;

    for (const userId of userIds) {
        let reviewedDrinks = new Set();
        for (let i = 0; i < numberOfReviewsPerUser; i++) {
            let randomDrinkId;
            do {
                randomDrinkId = drinkIds[Math.floor(Math.random() * drinkIds.length)];
            } while (reviewedDrinks.has(randomDrinkId));
            reviewedDrinks.add(randomDrinkId);
            const randomReviewText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
            const randomRating = (1 + Math.random() * 4).toFixed(1);
            const randomReviewPicture = reviewPictures[Math.floor(Math.random() * reviewPictures.length)];
            await createReview(randomDrinkId, userId, randomReviewText, randomRating, randomReviewPicture);
        }
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