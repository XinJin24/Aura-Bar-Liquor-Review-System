
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
}

let validateDrinkRecipe = (recipe) =>{
    if (typeof recipe !== "string" || recipe.trim().length === 0) {
        throw `Error: recipe should be a valid string (no empty spaces)`;
    }
    recipe = recipe.trim();
    if(recipe.length < 5 || recipe > 10000){
        throw `Error: recipe should have more than 5 chars and less than 10 thousand chars`;
    }
}

let validatePrice = (price) =>{
    console.log(price);
    console.log(typeof price);
    var converted = Number(price);
    console.log(typeof converted);
    if(isNaN(converted)){
        throw `converted error`;
    }
    if (converted < 0) {
        throw `price cannot be a negative value.`;
    }
    // return converted;
    // if (typeof price !== "number") {
    //     throw `price must be a valid number.`;
    // }

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
}

let valid3 = false;
$('#error').hide()
$('#drinkEdit_form').submit((event)=>{
    if(!valid3)
    {
        event.preventDefault();
        try{
            if($('#name').length)
                checkName($('#name').val())
            if($('#category').length)
                validateDrinkCategory($('#category').val())
            if($('#recipe').length)
                validateDrinkRecipe($('#recipe').val());
            if($('#rating').length)
                validateRating($('#rating').val())
            if($('#price').length)
                validatePrice($('#price').val());
            valid3=true;
            $('#drinkEdit_form').submit();
            valid3=false;
        }catch(e){
            $('#error').hide();
            $('#error').append(`<p>${e}</p>`);
            $('#error').show();
        }
    }
})

document.addEventListener('DOMContentLoaded', function () {
    let imageInput = document.getElementById('drinkPictureLocation');
    let imagePreview = document.getElementById('previewImg');

    imageInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
});

