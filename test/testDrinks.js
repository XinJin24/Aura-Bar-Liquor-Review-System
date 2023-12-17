// Unit test for Data/drinks.js
import {createDrink} from "../data/drinks.js";

let drink1;
let drink2;




try {
    const drink1 = await createDrink("unknown drink two", "vodka","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\2.jpg",
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
    console.log(await updateDrink("6570d5425adfaacae3e405ec","unknown drink four", "whiskey","this, that","C:\\Users\\jinxi\\git_repos\\Aura-Bar-Liquor-Review-System\\public\\drinkPictures\\5.jpg",
        50));
}catch (error){
    console.log(error);
}


try {
    console.log(await deleteDrink("65702cca88ac720a3a01c134"));
}catch (error){
    console.log(error);
}

try {
    console.log(await getDrinkInfoByDrinkId("65702cca88ac720a3a01c134"));
}catch (error){
    console.log(error);
}

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

// Test cases for updateDrink
try {
    console.log(await updateDrink("6570d5425adfaacae3e405ec", "updated drink name", "vodka", "ingredient1, ingredient2", "C:\\path\\to\\updated\\image.jpg", 40));
} catch (error) {
    console.log(error);
}

try {
    console.log(await updateDrink("invalidDrinkID", "new drink", "rum", "rum ingredient", "C:\\path\\to\\image.jpg", 30));
} catch (error) {
    console.log(error);
}

// Test Case for deleteDrink
try {
    const result = await deleteDrink("6570d5425adfaacae3e405ec");
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}

// Test Case for deleteDrink (with non-existent drink ID)
try {
    const result = await deleteDrink("nonExistentId");
    console.log(result); // This should throw an error since the ID doesn't exist
} catch (error) {
    console.error(error); // Log the expected error
}

// Test Case for getDrinkInfoByDrinkId
try {
    const result = await getDrinkInfoByDrinkId("6570d5425adfaacae3e405ec");
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}

// Test Case for getDrinkInfoByDrinkId (with non-existent drink ID)
try {
    const result = await getDrinkInfoByDrinkId("nonExistentId");
    console.log(result); // This should throw an error since the ID doesn't exist
} catch (error) {
    console.error(error); // Log the expected error
}

// Test Case for getAllDrinks
try {
    const result = await getAllDrinks();
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}

// Test Case for getAllReviewsOnADrink
try {
    const result = await getAllReviewsOnADrink("6570d5425adfaacae3e405ec");
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}

// Test Case for increaseReservedCounts
try {
    const result = await increaseReservedCounts("6570d5425adfaacae3e405ec");
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}

// Test Case for reserveDrink
try {
    const result = await reserveDrink("userTestId", "6570d5425adfaacae3e405ec");
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}

// Test Case for updateAllDrinkRating
try {
    const result = await updateAllDrinkRating();
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}

// Test Case for getDrinkInfoByName
try {
    const result = await getDrinkInfoByName("Test Drink");
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}

// Test Case for getDrinkInfoByCategory
try {
    const result = await getDrinkInfoByCategory("Cocktail");
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}

// Test Case for getDrinkInfoByRating
try {
    const result = await getDrinkInfoByRating("ascending");
    console.log(result); // Log the result
} catch (error) {
    console.error(error); // Log any errors
}