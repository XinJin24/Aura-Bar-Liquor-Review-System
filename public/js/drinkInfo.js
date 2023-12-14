
// let drinkid_form = document.getElementById(drinkid_form);
let checkReviewText = (strVal) =>{
    if(!strVal){
        throw `you should provide a review`;
    }
    if(typeof strVal !== "string"){
        throw `review should be a string`;
    }
    strVal = strVal.trim();
    if(strVal.length < 2 || strVal.length > 1000){
        throw `review should be at least 2 characters long with a max of 1000 characters`;
    }
    if (!isNaN(strVal)){
        throw `${strVal} is not a valid value for review as it only contains digits`;
    }
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

let valid5 = false;
$('#error').hide()
$('#addReview').submit((event)=>{
    if(!valid5)
    {
        event.preventDefault();
        try{
            if($('#reviewText').length)
                checkReviewText($('#reviewText').val())
            if($('#rating').length)
                validateRating($('#rating').val())
            valid5=true;
            $('#addReview').submit();
            valid5=false;
        }catch(e){
            $('#error').hide();
            $('#error').append(`<p>${e}</p>`);
            $('#error').show();
        }
    }
})


// function previewImage(event) {
//     var reader = new FileReader();
//     reader.onload = function(){
//         var output = document.getElementById('imagePreview');
//         output.src = reader.result;
//         output.style.display = 'block';
//     };
//     reader.readAsDataURL(event.target.files[0]);
// }

document.addEventListener('DOMContentLoaded', function () {
    let imageInput = document.getElementById('reviewPictureLocation');
    let imagePreview = document.getElementById('imagePreview');

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
