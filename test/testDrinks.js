import {
    createDrink,
    deleteDrink,
    getAllDrinks,
    getAllReviewsOnADrink,
    updateAllDrinkRating,
    updateDrink
} from "../data/drinks.js"
import {fileURLToPath} from "url";
import {dirname, join} from "path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

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


//"whiskey", "vodka", "rum", "gin", "tequila", "brandy", "liqueur", "wine", "beer", "juice", "other"
try {
     drink1 = await createDrink("Old Fashioned", "whiskey","- 2 oz bourbon or rye whiskey\n" +
         "- 2 dashes Angostura bitters\n" +
         "- 1 sugar cube or 1 tsp sugar\n" +
         "- Orange twist garnish",drinkPicturePath1,10);

    drink2 = await createDrink("Margarita", "tequila","- 2 oz silver tequila\n" +
        "- 1 oz Cointreau\n" +
        "- 1 oz lime juice\n" +
        "- Salt for the rim",drinkPicturePath2,12);

    drink3 = await createDrink("Cosmopolitan", "vodka","- 1.5 oz citrus vodka\n" +
        "- 1 oz Cointreau\n" +
        "- .5 oz lime juice\n" +
        "- .25 oz cranberry juice",drinkPicturePath3,15);

    drink4 = await createDrink("Negroni", "gin","- 1 oz gin\n" +
        "- 1 oz Campari\n" +
        "- 1 oz sweet vermouth",drinkPicturePath4,19);

    drink5 = await createDrink("Moscow Mule", "vodka ","- 2 oz vodka\n" +
        "- 4 to 6 oz ginger beer\n" +
        "- .5 oz lime juice",drinkPicturePath5,10);

    drink6 = await createDrink("Martini", "vodka", "- 3 oz gin or vodka\n" +
        "- .5 oz dry vermouth\n" +
        "- Lemon peel or olive", drinkPicturePath6, 22);

    drink7 = await createDrink("Mojito", "rum", "- 3 mint leaves\n" +
        "- 2 oz white rum\n" +
        "- .75 oz lime juice\n" +
        "- .5 oz simple syrup", drinkPicturePath7, 18);

    drink8 = await createDrink("Whiskey Sour", "whiskey", "- 2 oz whiskey\n" +
        "- 1 oz lemon juice\n" +
        "- 1 tsp sugar\n" +
        "- 1 egg white (optional)", drinkPicturePath8, 14);

    drink9 = await createDrink("French 75", "gin", "- 2 oz gin\n" +
        "- 2 dashes simple syrup\n" +
        "- .5 oz lemon juice\n" +
        "- Champagne", drinkPicturePath9, 20);

    drink10 = await createDrink("Manhattan", "whiskey", "- 2 oz rye whiskey\n" +
        "- 1 oz sweet vermouth\n" +
        "- 2 dashes Angostura bitters", drinkPicturePath10, 24);

    // New drinks
    drink11 = await createDrink("Spritz", "mix", "- Equal parts Aperol\n" +
        "- Equal parts Cinzano Prosecco\n" +
        "- Splash of Soda", drinkPicturePath11, 16);

    drink12 = await createDrink("Gimlet", "mix", "- 2 oz gin or vodka\n" +
        "- .75 oz simple syrup\n" +
        "- .75 oz lime juice", drinkPicturePath12, 14);

    drink13 = await createDrink("Sazerac", "whiskey", "- 2 oz rye whiskey\n" +
        "- .5 oz simple syrup\n" +
        "- 2 dashes Peychaud's bitters\n" +
        "- Absinthe", drinkPicturePath13, 21);

    drink14 = await createDrink("Pimm's Cup", "mix", "- 50 ml (about 1.75 oz) Pimm's No.1\n" +
        "- 150 ml (about 5 oz) lemonade\n" +
        "- Mint, orange, strawberries\n" +
        "- Cucumber to garnish", drinkPicturePath14, 18);

    drink15 = await createDrink("Aviation", "gin", "- 2 oz gin\n" +
        "- .5 oz maraschino liqueur\n" +
        "- .75 oz lemon juice\n" +
        "- .25 oz creme de violette", drinkPicturePath15, 20);

    drink16 = await createDrink("Vesper", "mix", "- 3 oz gin\n" +
        "- 1 oz vodka\n" +
        "- .5 oz Lillet blanc", drinkPicturePath16, 25);

    drink17 = await createDrink("Tom Collins", "gin", "- 2 oz Old Tom gin\n" +
        "- 1 oz lemon juice\n" +
        "- .5 oz simple syrup\n" +
        "- Club soda to top", drinkPicturePath17, 16);

    drink18 = await createDrink("Mimosa", "champagne", "- 2.5 oz champagne\n" +
        "- 2.5 oz orange juice", drinkPicturePath18, 12);

    drink19 = await createDrink("Paloma", "tequila", "- 2 oz tequila\n" +
        "- .5 oz lime juice\n" +
        "- Grapefruit soda to top", drinkPicturePath19, 14);

    drink20 = await createDrink("Last Word", "mix", "- .75 oz gin\n" +
        "- .75 oz maraschino liqueur\n" +
        "- .75 oz green chartreuse\n" +
        "- .75 oz lime juice", drinkPicturePath20, 22);

    // New drinks
    drink21 = await createDrink("Sidecar", "brandy", "- 2 oz VS or VSOP Cognac\n" +
        "- 1 oz Cointreau\n" +
        "- .75 oz lemon juice", drinkPicturePath21, 18);

    drink22 = await createDrink("Mint Julep", "bourbon", "- 2 oz bourbon\n" +
        "- 8-10 mint leaves\n" +
        "- .25 oz simple syrup", drinkPicturePath22, 15);

    drink23 = await createDrink("Daiquiri", "rum", "- 2 oz light rum\n" +
        "- 1 oz simple syrup\n" +
        "- 1 oz lime juice", drinkPicturePath23, 14);

    drink24 = await createDrink("Dark 'n Stormy", "rum", "- 1.5 oz Gosling's Black Seal Rum\n" +
        "- Ginger beer to top", drinkPicturePath24, 16);

    drink25 = await createDrink("Martinez", "gin", "- 1.5 oz Old Tom gin\n" +
        "- 1.5 oz sweet vermouth\n" +
        "- .25 oz Luxardo maraschino liqueur\n" +
        "- 2 dashes Angostura or orange bitters", drinkPicturePath25, 20);

    drink26 = await createDrink("Boulevardier", "mix", "- 1 oz Campari\n" +
        "- 1 oz sweet red vermouth\n" +
        "- 1 oz to 1.5 oz bourbon (rye whiskey is often used instead in modern-day versions)", drinkPicturePath26, 19);

    drink27 = await createDrink("Gin and Tonic", "gin", "- 2 oz gin\n" +
        "- 4 to 6 oz tonic water", drinkPicturePath27, 12);

    drink28 = await createDrink("Penicillin", "whiskey", "- 2 oz blended Scotch\n" +
        "- .75 oz freshly squeezed lemon juice\n" +
        "- .75 oz honey-ginger syrup\n" +
        "- .25 oz Islay single malt Scotch", drinkPicturePath28, 23);

    drink29 = await createDrink("Champagne Cocktail", "champagne", "- 1 sugar cube\n" +
        "- 3 dashes Angostura bitters\n" +
        "- Top with champagne", drinkPicturePath29, 17);

    drink30 = await createDrink("Long Island Iced Tea", "mix", "- .5 oz gin\n" +
        "- .5 oz white rum\n" +
        "- .5 oz blanco tequila\n" +
        "- .5 oz vodka\n" +
        "- .5 oz triple sec\n" +
        "- 1.25 oz homemade sour mix, or .75 oz freshly squeezed lemon juice and .5 oz simple syrup\n" +
        "Coca Cola, to taste", drinkPicturePath30, 21);

    // New drinks
    drink31 = await createDrink("Greyhound", "mix", "- 2 oz vodka or gin\n" +
        "- 4 oz grapefruit juice", drinkPicturePath31, 14);

    drink32 = await createDrink("Kir Royale", "mix", "- .5 oz creme de cassis\n" +
        "- Champagne, to top (or another sparkling wine)", drinkPicturePath32, 18);

    drink33 = await createDrink("Bloody Mary", "vodka", "- 2.5 oz vodka\n" +
        "- .75 cup tomato juice\n" +
        "- 2 tbsp lemon juice\n" +
        "- 2 tsp Worcestershire sauce\n" +
        "- 2 dashes hot sauce (optional)\n" +
        "- .25 tsp prepared horseradish\n" +
        "- 1 pinch celery salt\n" +
        "- 1 pinch black pepper", drinkPicturePath33, 16);

    drink34 = await createDrink("Mai Tai", "rum", "- Lime wedge, for rimming\n" +
        "- .5 tbsp chili powder\n" +
        "- 1 oz dark rum\n" +
        "- 1 oz white rum\n" +
        "- 1 oz freshly squeezed orange juice\n" +
        "- Juice of 1 lime\n" +
        "- 1 oz orange Curaçao\n" +
        "- .5 oz orgeat syrup\n" +
        "- 1 tbsp grenadine", drinkPicturePath34, 22);

    drink35 = await createDrink("Bellini", "mix", "- 1.5 oz fresh white peach puree\n" +
        "- Prosecco, to top", drinkPicturePath35, 16);

    drink36 = await createDrink("Sex on the Beach", "mix", "- 1.5 oz vodka\n" +
        "- .5 oz peach schnapps\n" +
        "- 2 oz orange juice\n" +
        "- 2 oz cranberry juice", drinkPicturePath36, 20);

    drink37 = await createDrink("White Russian", "mix", "- 1.5 oz vodka\n" +
        "- .75 oz Kahlua\n" +
        "- .75 oz heavy cream", drinkPicturePath37, 18);

    drink38 = await createDrink("Piña Colada", "rum", "- 2.5 oz rum\n" +
        "- 3 oz pineapple juice\n" +
        "- 1 oz coconut cream (usually Coco Lopez)", drinkPicturePath38, 15);

    drink39 = await createDrink("Bee's Knees", "gin", "- 2 oz gin\n" +
        "- .75 oz freshly squeezed lemon juice\n" +
        "- .5 oz honey syrup", drinkPicturePath39, 17);

    drink40 = await createDrink("Sangria", "mix", "- 1 (750-ml) bottle red wine\n" +
        "- 1 cup orange juice\n" +
        "- .5 cup brandy\n" +
        "- .25 cup granulated sugar\n" +
        "- 1 orange, sliced\n" +
        "- 1 apple, sliced\n" +
        "- 1 cup blueberries\n" +
        "- 1 cup sliced strawberries\n" +
        "- 1 (12-oz) can seltzer", drinkPicturePath40, 25);

    drink41 = await createDrink("Espresso Martini", "mix", "- 2 oz vodka\n" +
        "- 1 oz coffee liquor\n" +
        "- 1 oz espresso (or cold brew coffee concentrate)\n" +
        "- .5 oz simple syrup", drinkPicturePath41, 21);

    drink42 = await createDrink("Death in the Afternoon", "mix", "- 1.5 oz absinthe\n" +
        "- About 4.5 oz chilled Champagne", drinkPicturePath42, 24);

    drink43 = await createDrink("Screwdriver", "vodka", "- 1 to 2 oz vodka\n" +
        "- Freshly squeezed orange juice, to top*", drinkPicturePath43, 14);

}catch (error){
    console.log(error);
}












//
// try {
//     console.log(await updateDrink("6570d5425adfaacae3e405ec","unknown drink four", "whiskey","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\5.jpg",
//         50));
// }catch (error){
//     console.log(error);
// }

//
//
// try {
//     const drink2 = await createDrink("unknown drink two", "vodka","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\2.jpg",
//         0);
//     console.log(drink2)
// }catch (error){
//     console.log(error);
// }
//
// try {
//     const drink3 = await createDrink("unknown drink three", "brandy","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\2.jpg",
//         99);
//     console.log(drink3)
// }catch (error){
//     console.log(error);
// }




// try {
//     console.log(await updateDrink("6570d5425adfaacae3e405ec","unknown drink four", "whiskey","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\5.jpg",
//         50));
// }catch (error){
//     console.log(error);
// }

//
// try {
//     console.log(await deleteDrink("65702cca88ac720a3a01c134"));
// }catch (error){
//     console.log(error);
// }

// try {
//     console.log(await getDrinkInfoByDrinkId("65702cca88ac720a3a01c134"));
// }catch (error){
//     console.log(error);
// }

// try {
//     console.log(await getAllDrinks());
// }catch (error){
//     console.log(error);
// }
// console.log("-------------------------------------------------------------");
// try {
//     console.log(await getAllReviewsOnADrink("65702dedd86a8a836f64ab67"));
// }catch (error){
//     console.log(error);
// }
//
// console.log("-------------------------------------------------------------");
// try {
//     console.log(await updateAllDrinkRating());
// }catch (error){
//     console.log(error);
// }