
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


document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', function() {
            const reviewId = this.getAttribute('data-reviewid');
            deleteReview(reviewId);
        });
    });



    const reserveButton= document.getElementById('reserveButton');
    if (reserveButton) {
        reserveButton.addEventListener('click', function() {
            const drinkId = this.getAttribute('data-drinkid');
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

function deleteReview(reviewId) {
    if (confirm('Are you sure you want to delete this review?')) {
        $.ajax({
            type: 'DELETE',
            url: `./review/${reviewId}`,
            success: function(response) {
                alert('Review deleted successfully');
                location.reload();
            },
            error: function(error) {
                console.error('Error deleting review:', error);
                alert('Error deleting review');
            }
        });
    }
}