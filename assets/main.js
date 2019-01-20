// Setup selectors for convenience later on
let searchbar = $('.search > input');
let submit = $('.search > button');
let results = $('.results');
let favourites = $('.favourites');

// Initialize favourited items array. In the future, if favourite content is to be stored across browser sessions, cookies can be used with this and favourites to save content on refresh.
let favouriteList = [];

// Run on page ready, search events:
$(document).ready(function () {

    searchbar.keyup(function (key) {
        // If key === 13, which is enter, click the submit button
        if (key.which === 13) {
            submit.click();
        }
        // If there is no text in the searchbar, remove all results (make innerHTML of results section empty)
        if (searchbar.val() === '') {
            results.html('');
        }
    });

    submit.click(function () {
        // On clicking submit button (or the click being triggered by the enter key): fulfillQuery function
        fulfillQuery();
    });

});

// Render results to results section
function fulfillQuery() {

    // Request to the API.
    axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
        .then((response) => {
            // Let return response = objects
            let objects = response.data;
            // Initialize queryResult which will host the HTML we are pushing to the DOM at the end of this function
            let queryResult = '';

            // For each item in the data response:
            objects.forEach(function (item, index) {

                /* 
                Set the queryResult if the lowercase search term matches some value from the lowercase keywords from the API. 
                In the future, if this was to be made more robust, the filter could be applied to the title and the body of the item too, by adding ${objects[index].title} and ${objects[index].body} to the if operator.
                */
                if (`${objects[index].keywords}`.toLowerCase().indexOf(searchbar.val().toLowerCase()) !== -1) {

                    /* 
                    1. Assuming there is a match, set queryResult equal to the data in table rows. 
                    2. Set the onClick of the star to push its unique index number with it, and set this number to the class of the row as well. 
                    3. Use the parseHTML function (defined later) to parse the HTML content retrieved in the body.
                    */
                    queryResult += `<tr class='${index}'><td><a href='javascript: void(0);' class='star' onClick='favourite(${index});'><i class='fa fa-star'></i></a></td><td>${item.title}</td><td>${parseHTML(item.body)}</td></tr>`;
                }
                // Output the HTML we added to queryResult to the results section
                results.html(queryResult);
            });

            // Loop through the favourites list and add the .favourited class to the fa-star of any index items in it. If no favourites, nothing happens. If, let's say, index(36) is favourited, it'll add the class to the <i> of that item.
            jQuery.each(favouriteList, function () {
                $('.' + this).find('i').addClass('favourited');
            });
        })
}

// Handle favourites
function favourite(index) {

    // If the favourites array includes the index (aka item is already favourited):
    if (favouriteList.includes(index)) {
        $('.' + index).find('i').removeClass('favourited'); // Remove the favourited class from the <i>
        favourites.find('.' + index).remove(); // Remove the item from the favourites section
        favouriteList.splice(favouriteList.indexOf(index), 1); // Splice the favourites array at the index where the item was, thus removing it from the favourites array
    } else { // If the favourites array does not include the index (aka the item is not favourited):
        $('.' + index).find('i').addClass('favourited'); // Add the favourited class to the <i>
        $('.' + index).clone().appendTo(favourites); // Append the item to the favourites section
        favouriteList.push(index); // Add the index to the favourites array
    }

}

// Parse html content retrieved from the body
function parseHTML(html) {
    var parsed = $("<div />").html(html).text(); // Little trick that initializes a self-enclosed dummy div (<div />) and sets it's innerHTML to the content recieved from the body.
    return parsed; // Then, the text() of that dummy div is returned, thus returning proper HTML content rather than the HTML in string.
}