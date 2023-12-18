let validateReviewText = (description) => {
    if (typeof description !== "string" || description.trim().length === 0) {
        throw `Error: description should be a valid string (no empty spaces)`;
    }
    description = description.trim();
    if (description.length < 5 || description.length > 10000) {
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
    if (numericRating < 1 || numericRating > 5) {
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

    document.querySelectorAll('.editReviewButton').forEach(button => {
        button.addEventListener('click', function() {
            const reviewId = this.getAttribute('data-reviewid');

            document.getElementById('updateReviewId').value = reviewId;
            document.getElementById('updateReviewModal').style.display = 'block';
        });
    });

    const updateInput = document.getElementById('updateReviewPhoto');
    const previewUpdateImg = document.getElementById('previewUpdateImg');
    const deleteImageBtn = document.getElementById('deleteImageBtn');
    if(updateInput){
        updateInput.addEventListener('change', function(event){
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    previewUpdateImg.src = e.target.result;
                    previewUpdateImg.style.display = 'block';
                    deleteImageBtn.style.display = 'block'; // Show the remove button
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });

        deleteImageBtn.addEventListener('click', function() {
            updateInput.value = '';
            previewUpdateImg.style.display = 'none';
            deleteImageBtn.style.display = 'none';
        });
    }


    document.getElementById('closeUpdateModal').addEventListener('click', () => {
        document.getElementById('updateReviewModal').style.display = 'none';
    });

    const reserveButton = document.getElementById('reserveButton');
    const addReviewForm = document.getElementById('addReviewForm');
    const updateReviewForm = document.getElementById('updateReviewForm');

    const reviewPhotoInput = document.getElementById('reviewPhotoInput');
    const imagePreview = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImageBtn');
    if(reviewPhotoInput){
        reviewPhotoInput.addEventListener('change', function(event){
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    removeImageBtn.style.display = 'block'; // Show the remove button
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        });
        removeImageBtn.addEventListener('click', function() {
            reviewPhotoInput.value = '';
            imagePreview.style.display = 'none';
            removeImageBtn.style.display = 'none';
        });
    }



    document.getElementById('closeUpdateModal').addEventListener('click', () => {
        document.getElementById('updateReviewModal').style.display = 'none';
    });

    if (updateReviewForm) {
        updateReviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(updateReviewForm);
            const errorMessage = document.getElementById("updateReview_error");
            errorMessage.innerHTML = "";
            errorMessage.classList.add('hidden-div');

            try {
                let updateReviewText = formData.get("updateReviewText");
                let updateRating = formData.get("updateRating");
                let updateReviewPhoto = formData.get("updateReviewPhoto");
                const reviewId = formData.get("updateReviewId");

                updateReviewText = validateReviewText(updateReviewText);
                updateRating = validateRating(updateRating);

                $.ajax({
                    type: 'PUT',
                    url: `./review/${reviewId}`, // Adjust URL as needed
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        alert('Review updated successfully.');
                        location.reload();
                    },
                    error: function (xhr, status, error) {
                        errorMessage.classList.remove('hidden-div');
                        errorMessage.innerHTML = error;
                    }
                });
            } catch (error) {
                errorMessage.classList.remove('hidden-div');
                errorMessage.innerHTML = error;
            }
        });
    }

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
                        if (xhr.responseJSON && xhr.responseJSON.error) {
                            errorMessage.innerHTML = xhr.responseJSON.error;
                        } else {
                            errorMessage.innerHTML = 'An error occurred: ' + error;
                        }
                    }
                });
            } catch (error) {
                errorMessage.classList.remove('hidden-div');
                errorMessage.innerHTML = error;
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
                    alert("Error reserving drink");
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