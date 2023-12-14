
let validateDrinkName=(name, valName)=> {
    if (!name) {
        throw `Error: ${valName} not supplied`;
    }
    if (typeof name !== "string" || name.trim().length === 0) {
        throw `Error: ${valName} should be a valid string (no empty spaces)`;
    }

    name = name.trim();
    const nameRegex = /^[a-zA-Z0-9\sáéíóúüñäëïöü']+$/;
    if (!nameRegex.test(name)) {
        throw `Error: ${valName} must only contain alphanumeric characters (a-z, A-Z, 0-9), spaces, and special characters including ' and should not contain other special characters`;
    }
    if (name.length < 2 || name.length > 100) {
        throw `Error: ${valName} length must be at least 2 characters long with a max of 100 characters`;
    }

    return name;
}
let validateDrinkCategory = (category, valName) =>{
    if (!category) {
        throw `Error: ${valName} not supplied`;
    }
    if (typeof category !== "string" || category.trim().length === 0) {
        throw `Error: ${valName} should be a valid string (no empty spaces)`;
    }
    category = category.trim().toLowerCase();
    const validCategories = ["whiskey", "vodka", "rum", "gin", "tequila", "brandy", "liqueur", "wine", "beer", "juice", "champagne","bourbon","mix"];

    if (!validCategories.includes(category)) {
        throw `Error: ${category} is not a valid category in this bar. Valid categories are: ${validCategories.join(", ")}`;
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
    if (typeof price !== "number" && typeof price !== "string") {
        throw `price must be a valid number.`;
    }
    if (typeof price === "string" && price.trim().length === 0) {
        throw `price cannot be a empty string`;
    }
    if(typeof price === "string"){
        price = price.trim();
        price = parseInt(price, 10);
    }
    if (price < 0) {
        throw `price cannot be a negative value.`;
    }
    return price;
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

    document.querySelectorAll('.updateButton').forEach(button => {
        button.addEventListener('click', function() {
            const drinkId = this.getAttribute('data-drinkid');
            fetchOriginalDrinkDetails(drinkId);
        });
    });

    document.getElementById('closeUpdateModal').addEventListener('click', () => {
        closeUpdateDrinkModal();
    });

    document.getElementById('submitUpdateDrink').addEventListener('click', function(e) {
        e.preventDefault();
        submitUpdateDrinkForm();
    });

    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', function() {
            console.log("delete clicked");
            const drinkId = this.getAttribute('data-drinkid');
            deleteDrink(drinkId);
        });
    });

    document.querySelectorAll('.updateButton').forEach(button => {
        button.addEventListener('click', function() {
            const drinkId = this.getAttribute('data-drinkid');
        });
    });

    document.querySelectorAll('.restockButton').forEach(button => {
        button.addEventListener('click', function() {
            const drinkId = this.getAttribute('data-drinkid');
            restockADrink(drinkId);
        });
    });

    const searchButton = document.getElementById("searchButton");
    const searchBar = document.getElementById("searchBar");
    const showAllButton = document.getElementById('showAllButton');
    const sortButton = document.getElementById('sortButton');
    const sortOptions = document.getElementById('sortOptions');

    const addDrinkButton = document.getElementById('addDrinkButton');
    const addDrinkModal = document.getElementById('addDrinkModal');
    const closeModal = document.getElementById('closeModal');
    const submitNewDrink = document.getElementById('submitNewDrink');

    const updateDrink_error = document.getElementById('updateDrink_error');
    const addDrink_error = document.getElementById('addDrink_error');

    if (addDrinkButton) {
        addDrinkButton.addEventListener('click', () => {
            addDrinkModal.style.display = 'block';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            addDrinkModal.style.display = 'none';
        });
    }

    if (submitNewDrink) {
        submitNewDrink.addEventListener('click', (e) => {
            e.preventDefault();
            submitNewDrinkForm();
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            showAllButton.style.display = 'block';
        });
    }

    if (showAllButton) {
        showAllButton.addEventListener('click', function() {
            fetchAllDrinks();
            showAllButton.style.display = 'none';
        });
    }

    sortButton.addEventListener('click', function() {
        const selectedOption = sortOptions.value;
        fetchAndSortDrinks(selectedOption);
    });

    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const query = searchBar.value.trim();
            if (query) {
                $.ajax({
                    type: "GET",
                    url: "/search",
                    data: {query: query},
                    success: function (drinks) {
                        const drinksContainer = document.getElementById('drinksContainer');
                        drinksContainer.innerHTML = '';
                        if (drinks.length === 0) {
                            drinksContainer.innerHTML = '<p>No drinks available</p>';
                            return;
                        }

                        const ul = document.createElement('ul');
                        ul.className = 'displaydrinks';
                        drinks.forEach(drink => {
                            const li = document.createElement('li');
                            li.className = 'alldrinks';
                            li.innerHTML = `
                            <h2>${drink.name}</h2>
                            <img src="${drink.drinkPictureLocation}" alt="drink Picture" class="drink-picture" />
                            <p>Category: ${drink.category}</p>
                            <p>Rating: ${drink.rating}</p>
                            <p>Price: ${drink.price}</p>
                            <p>Reserved Counts: ${drink.reservedCounts}</p>
                            <button class="btn btn-primary" onclick="redirectToPage('${drink._id}')">View Details</button>
                        `;
                            ul.appendChild(li);
                        });
                        drinksContainer.appendChild(ul);
                    },
                    error: function (error) {
                        console.error("Error during AJAX request:", error);
                    }
                });
            } else {
                alert("Please enter a search term.");
            }
        });
    }


});

function deleteDrink(drinkId) {
    if (confirm('Are you sure you want to delete this drink?')) {
        $.ajax({
            type: 'DELETE',
            url: `/drink/${drinkId}`,
            success: function(response) {
                alert('Drink deleted successfully');
                location.reload();
            },
            error: function(error) {
                console.error('Error deleting drink:', error);
                alert('Error deleting drink');
            }
        });
    }
}

function restockADrink(drinkId) {
    $.ajax({
        type: 'POST',
        url: `/drink/restockDrink/${drinkId}`,
        success: function(response) {
            alert('Drink restocked successfully');
            location.reload();
        },
        error: function(error) {
            console.error('Error restocking drink:', error);
            alert('Error restocking drink');
        }
    });
}

function redirectToPage(drinkId) {
    window.location.href = '/drink/' + drinkId;
}

function fetchAllDrinks() {
    $.ajax({
        type: "GET",
        url: "/getAllDrinks",
        success: function(drinks) {
            const drinksContainer = document.getElementById('drinksContainer');
            drinksContainer.innerHTML = '';

            if (drinks.length === 0) {
                drinksContainer.innerHTML = '<p>No drinks available</p>';
                return;
            }
            const ul = document.createElement('ul');
            ul.className = 'displaydrinks';

            drinks.forEach(drink => {
                const li = document.createElement('li');
                li.className = 'alldrinks';
                li.innerHTML = `
                    <h2>${drink.name}</h2>
                    <img src="${drink.drinkPictureLocation}" alt="drink Picture" class="drink-picture" />
                    <p>Category: ${drink.category}</p>
                    <p>Rating: ${drink.rating}</p>
                    <p>Price: ${drink.price}</p>
                    <p>Reserved Counts: ${drink.reservedCounts}</p>
                    <button class="btn btn-primary" onclick="redirectToPage('${drink._id}')">View Details</button>
                `;
                ul.appendChild(li);
            });

            drinksContainer.appendChild(ul);
        },
        error: function(error) {
            console.error("Error fetching all drinks:", error);
        }
    });
}

function fetchAndSortDrinks(sortBy) {
    $.ajax({
        type: "GET",
        url: "/sortDrinks",
        data: { sortBy: sortBy },
        success: function(drinks) {
            const drinksContainer = document.getElementById('drinksContainer');
            drinksContainer.innerHTML = '';

            if (drinks.length === 0) {
                drinksContainer.innerHTML = '<p>No drinks available</p>';
                return;
            }
            const ul = document.createElement('ul');
            ul.className = 'displaydrinks';

            drinks.forEach(drink => {
                const li = document.createElement('li');
                li.className = 'alldrinks';
                li.innerHTML = `
                    <h2>${drink.name}</h2>
                    <img src="${drink.drinkPictureLocation}" alt="drink Picture" class="drink-picture" />
                    <p>Category: ${drink.category}</p>
                    <p>Rating: ${drink.rating}</p>
                    <p>Price: ${drink.price}</p>
                    <p>Reserved Counts: ${drink.reservedCounts}</p>
                    <button class="btn btn-primary" onclick="redirectToPage('${drink._id}')">View Details</button>
                `;
                ul.appendChild(li);
            });

            drinksContainer.appendChild(ul);
        },
        error: function(error) {
            console.error("Error fetching sorted drinks:", error);
        }
    });
}

function submitNewDrinkForm() {
    const addDrinkForm = document.getElementById('addDrinkForm');
    const errorMessage = document.getElementById("error");
    errorMessage.innerHTML = "";
    errorMessage.classList.add('hidden-div');
    const formData = new FormData(addDrinkForm);

    let drinkName = formData.get('drinkName');
    let category = formData.get('category');
    let recipe = formData.get('recipe');
    let price = formData.get('price');
    let drinkPicture = formData.get('drinkPicture');
    try{
        drinkName = validateDrinkName(drinkName,"drink name");
        category = validateDrinkCategory(category,"category");
        recipe = validateDrinkRecipe(recipe,"recipe");
        price = validatePrice(price);
        if(drinkPicture === undefined){
            throw "you must attach a picture to show to the customers";
        }
        $.ajax({
            type: 'POST',
            url: '/drink/new',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                alert('New drink added successfully');
                location.reload();
            },
            error: function(error) {
                errorMessage.classList.remove('hidden-div');
                const msg = document.createElement('p');
                msg.innerHTML = "Failed to add a drink, Reason: " + error.responseText;
                errorMessage.appendChild(msg);
                return;
            }
        });
    }catch (error){
        errorMessage.classList.remove('hidden-div');
        const msg = document.createElement('p');
        msg.innerHTML = error;
        errorMessage.appendChild(msg);
        return;
    }
}


function fetchOriginalDrinkDetails(drinkId) {
    $.ajax({
        type: 'GET',
        url: `/drink/api/${drinkId}`,
        success: function(drinkData) {
            populateUpdateForm(drinkData);
            openUpdateDrinkModal();
        },
        error: function(error) {
            console.error('Error fetching drink details:', error);
            alert('Error fetching drink details');
        }
    });
}

function populateUpdateForm(drinkData) {
    document.getElementById('drinkId_update').value = drinkData._id;
    document.getElementById('drinkName_update').value = drinkData.name;
    document.getElementById('category_update').value = drinkData.category;
    document.getElementById('recipe_update').value = drinkData.recipe;
    document.getElementById('price_update').value = drinkData.price;
    document.getElementById('drinkPicture_update').src = drinkData.drinkPictureLocation;
    document.getElementById('currentDrinkImage').src = drinkData.drinkPictureLocation;
}

function openUpdateDrinkModal() {
    document.getElementById('updateDrinkModal').style.display = 'block';
}

function closeUpdateDrinkModal() {
    document.getElementById('updateDrinkModal').style.display = 'none';
}

function submitUpdateDrinkForm() {
    const updateDrinkForm = document.getElementById('updateDrinkForm');
    let formData = new FormData(updateDrinkForm);
    const updateDrink_error = document.getElementById('updateDrink_error');
    updateDrink_error.innerHTML = "";
    updateDrink_error.classList.add('hidden-div');

    let drinkName_update = formData.get('drinkName_update');
    let category_update = formData.get('category_update');
    let recipe_update = formData.get('recipe_update');
    let price_update = formData.get('price_update');

    try{
        drinkName_update = validateDrinkName(drinkName_update);
        category_update = validateDrinkCategory(category_update);
        recipe_update = validateDrinkRecipe(recipe_update);
        price_update = validatePrice(price_update);
    }catch(error){
        updateDrink_error.classList.remove('hidden-div');
        const msg = document.createElement('p');
        msg.innerHTML = error;
        updateDrink_error.appendChild(msg);
        return;
    }

    const drinkId = formData.get('drinkId_update');
    $.ajax({
        type: 'POST',
        url: `/drink/${drinkId}`,
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            alert('Drink updated successfully');
            closeUpdateDrinkModal();
            location.reload();
        },
        error: function(error) {
            console.error('Error updating drink:', error);
            alert('Error updating drink');
        }
    });
}