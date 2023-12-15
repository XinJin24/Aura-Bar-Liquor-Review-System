let validateReviewText = (description) => {
    if (typeof description !== "string" || description.trim().length === 0) {
        throw `Error: description should be a valid string (no empty spaces)`;
    }
    description = description.trim();
    if (description.length < 5 || description > 10000) {
        throw `Error: description should have more than 5 chars and less than 10 thousand chars`;
    }
    return description;
}

let validateRating = (rating) => {
    let numericRating;
    if (typeof rating === "string") {
        rating = rating.trim();
        if (rating.length === 0) throw "Rating cannot be all empty spaces";

        numericRating = Number(rating);

        if (isNaN(numericRating)) {
            throw "Rating should be a valid number.";
        }
    } else if (typeof rating === "number") {
        numericRating = rating;
    } else {
        throw "Rating should be a number or a string representing a number.";
    }
    if (numericRating < 0 || numericRating > 5) {
        throw "Rating should be between 0 and 5.";
    }
    if (!/^\d+(\.\d{1,2})?$/.test(numericRating.toString())) {
        throw "Rating should have at most two decimal places.";
    }
    return numericRating;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', function () {
            const reviewId = this.getAttribute('data-reviewid');
            deleteReview(reviewId);
        });
    });

    const reserveButton = document.getElementById('reserveButton');
    const addReviewForm = document.getElementById('addReviewForm');

    if (addReviewForm) {
        addReviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(addReviewForm);
            const errorMessage = document.getElementById("addReview_error");
            errorMessage.innerHTML = "";
            errorMessage.classList.add('hidden-div');


            try {
                let reviewText = formData.get("reviewText");
                let rating = formData.get("rating");
                let reviewPhotoInput = formData.get("reviewPhotoInput");
                reviewText = validateReviewText(reviewText);
                rating = validateRating(rating);

                $.ajax({
                    type: 'POST',
                    url: '../review/new',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        alert('Review posted successfully.');
                        location.reload();
                    },
                    error: function (xhr, status, error) {
                        errorMessage.classList.remove('hidden-div');
                        errorMessage.innerHTML = error;
                    }
                });
            } catch (error) {

            }

        });
    }

    if (reserveButton) {
        reserveButton.addEventListener('click', function () {
            const drinkId = this.getAttribute('data-drinkid');
            $.ajax({
                type: "POST",
                url: `/drink/reserveDrink/${drinkId}`,
                success: function (response) {
                    alert("Drink reserved successfully.");
                    location.reload();
                },
                error: function (error) {
                    alert(error);
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
            success: function (response) {
                alert('Review deleted successfully');
                location.reload();
            },
            error: function (error) {
                console.error('Error deleting review:', error);
                alert('Error deleting review');
            }
        });
    }
}