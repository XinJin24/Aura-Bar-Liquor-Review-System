import {
    createDrink,
    deleteDrink,
    getAllDrinks,
    getAllReviewsOnADrink,
    updateAllDrinkRating,
    updateDrink
} from "../data/drinks.js"

let drink1 =null;
let drink2 = null;
let drink3 =null;

try {
    const drink1 = await createDrink("unknown drink one", "whiskey","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\1.jpg",
        20);
    console.log(drink1)
}catch (error){
    console.log(error);
}

try {
    const drink2 = await createDrink("unknown drink two", "vodka","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\2.jpg",
        0);
    console.log(drink2)
}catch (error){
    console.log(error);
}

try {
    const drink3 = await createDrink("unknown drink three", "brandy","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\2.jpg",
        99);
    console.log(drink3)
}catch (error){
    console.log(error);
}




try {
    console.log(await updateDrink("65702cca88ac720a3a01c134","unknown drink four", "whiskey","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\1.jpg",
        50));
}catch (error){
    console.log(error);
}


try {
    console.log(await deleteDrink("65702cca88ac720a3a01c134"));
}catch (error){
    console.log(error);
}

// try {
//     console.log(await getDrinkInfoByDrinkId("65702cca88ac720a3a01c134"));
// }catch (error){
//     console.log(error);
// }

try {
    console.log(await getAllDrinks());
}catch (error){
    console.log(error);
}
console.log("-------------------------------------------------------------");
try {
    console.log(await getAllReviewsOnADrink("65702dedd86a8a836f64ab67"));
}catch (error){
    console.log(error);
}

console.log("-------------------------------------------------------------");
try {
    console.log(await updateAllDrinkRating());
}catch (error){
    console.log(error);
}