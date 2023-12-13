
// let drinkid_form = document.getElementById(drinkid_form);
let checkName = (strVal) =>{
    if(!strVal){
        throw `you should provide a name`;
    }
    if(typeof strVal !== "string"){
        throw `name should be a string`;
    }
    strVal = strVal.trim();
    if(strVal.length < 2 || strVal.length > 100){
        throw `name should be at least 2 characters long with a max of 100 characters`;
    }
    if (!isNaN(strVal)){
        throw `${strVal} is not a valid value for name as it only contains digits`;
    }
}

let validateDrinkCategory = (category, valName) =>{
    if (!category) {
        throw `category not supplied`;
    }
    if (typeof category !== "string" || category.trim().length === 0) {
        throw `category should be a valid string (no empty spaces)`;
    }
    category = category.trim().toLowerCase();
    const validCategories = ["whiskey", "vodka", "rum", "gin", "tequila", "brandy", "liqueur", "wine", "beer", "juice", "other"];

    if (!validCategories.includes(category)) {
        throw `category is not a valid category in this bar`;
    }

    return category;
}

let validateDrinkRecipe = (recipe) =>{
    if (typeof recipe !== "string" || recipe.trim().length === 0) {
        throw `Error: recipe should be a valid string (no empty spaces)`;
    }
    recipe = recipe.trim();
    if(recipe.length < 5 || recipe > 10000){
        throw `Error: recipe should have more than 5 chars and less than 10 thousand chars`;
    }
    return recipe;
}

let validatePrice = (price) =>{
    if (typeof price !== "number") {
        throw `price must be a valid number.`;
    }
    if (price < 0) {
        throw `price cannot be a negative value.`;
    }
    return price;
}

let validateRating = (rating) =>{
    if (typeof rating !== "string" || rating.trim().length === 0) {
        throw `rating should be a valid string with number 0 - 5(no empty spaces)`;
    }
    rating = rating.trim();
    const numericRating = Number(rating);
    if (isNaN(numericRating)) {
        throw `rating should be a valid number between 0 and 5.`;
    }
    if (numericRating < 0 || numericRating > 5) {
        throw `rating should be between 0 and 5.`;
    }
    return numericRating;
}

let checkIfFileExist = async (filePath, valName) => {
    if (typeof filePath !== "string") {
        throw `Error: ${valName} must be a valid string(no empty spaces)!`;
    } else if(filePath.trim().length === 0){
        return "";
    }
    try {
        await access(filePath);
        return filePath;
    } catch (err) {
        throw `Error: File at path ${filePath} is inaccessible.`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const reserveButton= document.getElementById('reserveButton');
    if (reserveButton) {
        reserveButton.addEventListener('click', function() {
            const drinkId = this.getAttribute('data-drinkid');
            console.log("here");
            $.ajax({
                type: "POST",
                url: `/drink/reserveDrink/${drinkId}`,
                success: function(response) {
                    alert("Drink reserved successfully.");
                },
                error: function(error) {
                    console.log(error)
                    console.error("Error reserving drink:", error);
                }
            });
        });
    }
});







// let clientError5 = document.getElementById("clientError5");
// clientError5.style.display = 'none';
// let valid5 = false;
//
// drinkid_form.addEventListener('submit', async (event) =>{
//     if(!valid5){
//         event.preventDefault();
//         try{
//             if(document.getElementById("name")){
//                 checkName(document.getElementById("name").value);
//             }
//             if(document.getElementById("category")){
//                 validateDrinkCategory(document.getElementById("category").value);
//             }
//             if(document.getElementById("recipe")){
//                 validateDrinkRecipe(document.getElementById("recipe").value);
//             }
//             if(document.getElementById("rating")){
//                 validateRating(document.getElementById("rating").value);
//             }
//             if(document.getElementById("price")){
//                 validatePrice(document.getElementById("price").value);
//             }
//             if(document.getElementById("drinkPictureLocation")){
//                 let fileInput = document.getElementById("drinkPictureLocation");
//                 if(fileInput.files.length > 0){
//                     try{
//                         await checkIfFileExist(fileInput.files[0]);
//                     }catch(e){
//                         console.error(e);
//                         throw e;
//                     }
//                 }
//             }
//             valid5 = true;
//             drinkid_form.submit();
//             valid5 = false;
//
//         }catch(e){
//             const errorInfo = document.createElement('p');
//             errorInfo.textContent = e;
//             clientError5.innerHTML = '';
//             clientError5.appendChild(errorInfo);
//             clientError5.style.display = 'block';
//         }
//     }
// });
//
// let newProfilePictureLocation = document.getElementById("drinkPictureLocation");
// let previewImg = document.getElementById("previewImg");
//
// newProfilePictureLocation.addEventListener('change', function(event){
//     if(this.files && this.files[0]){
//         previewImg.src = URL.createObjectURL(event.target.files[0]);
//         // let reader = new FileReader();
//         // reader.onload = function(e){
//         //     previewImg.src = e.target.result;//Assign the data URL to the src attribute of img
//         // }
//         // reader.readAsDataURL(this.files[0]);
//     }
// });
