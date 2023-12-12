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

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("messageModal");
    const btn = document.getElementById("messageBtn");
    const span = document.getElementsByClassName("close")[0];
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

    if (btn) {
        btn.onclick = function () {
            modal.style.display = "block";
        }
    }
    if (span) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }
    const messageForm = document.getElementById("messageForm");
    if (messageForm) {
        messageForm.onsubmit = function (e) {
            e.preventDefault();
            const message = this.message.value;

            $.ajax({
                type: "POST",
                url: "/sendMessage",
                data: {message: message},
                success: function (response) {
                    alert("Message sent successfully.");
                    modal.style.display = "none";
                },
                error: function (error) {
                    alert("Error sending message.");
                }
            });
        }
    }

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
