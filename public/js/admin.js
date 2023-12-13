document.addEventListener('DOMContentLoaded', () => {

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