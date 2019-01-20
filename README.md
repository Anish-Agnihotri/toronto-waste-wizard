<p align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" width="300px"></p>
<h2 align="center">Toronto Waste Wizard</h2>
<p align="center">Simple web app to search the Toronto Waste Wizard database. Developed as a part of my application to the Shopify Summer 2019 Internship program.</p>

## Introduction
For the Summer 2019 Shopify Internship session, individuals were challenged to make a web application for the Toronto Waste Wizard database. The instructions were as followed (checkmarks indicate instructions that I have fulfilled in this application):

### Instructions
- [X] Reproduce the design as provided in the [screenshot](https://cdn.shopify.com/static/web-eng-challenge-summer-2019/design.png), which displays example search results.
- [X] The data must be taken from the [Waste Wizard Lookup data (JSON)](https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#5ed40494-a290-7807-d5da-09ab6a56fca2).
- [X] Typing in the search field should *NOT* perform an API call.
- [X] A search must be performed when hitting enter or clicking the search button.
- [X] When the search input field is cleared, the list of results should also be cleared. 
- [X] Performing a search should render a list of potential matching items based on keywords. Each item should:
   - [X] Render the title and description of the item.
   - [X] Render a grey star button *if the item is not already favourited*.
   - [X] Render a green star icon *if the item is not already favourited*.
   - [X] Clicking the star button should add the item to the favourites list.
- [X] When the number of favourites is more than one, the app should render a list of items. Each saved item should:
   - [X] Render the title and description of the item.
   - [X] Render a green star button *if the item has been favourited*.
   - [X] Clicking the green star button should remove the item from the saved list.
   
## Development desicions
As a developer, I believe in 3 main idealogies: 

1. **KISS** - Keep it simple, stupid.
2. **DRY** - Don't repeat yourself.
3. **DLBM** - Do less, be more.

Thus, when I saw this challenge, I knew I had to keep everything simple and consice. For such a small web application (only one API request, and some basic content rendering), I didn't want to re-invent the wheel. The three solutions I explored were:

1. React - The first method was to use React, create components for the search, and use Axios to process changes. **Minifed React + ReactDOM**: 133KB + misc. external loads.
2. Vue - The second method was to use JQuery alongside VueJS. This would allow me to do similar functions to React, while keeping dependency load to a minimum. **Minified VueJS w/ JQuery:** 83.8KB + misc. external loads.
3. JQuery - The third method was to use only JQuery with a minified Axios import. This would allow me to siginificantly reduce dependency load as compared to React/Vue. **Minified JQuery + Axios:** 36.6KB + misc. external loads.

After exploring my options, I decided to go with JQuery. For such a small web app, it was important to keep the dependencies to an absolute minimum, and JQuery + Axios at 36.6KB, let me do exactly that. In the future, though, if upgradeability where to be kept in mind, a framework similar to VueJS (or Mithral if looking for extreme dependency savings) should be used.

## Code breakdown
This is the fancy section for developers and the people assessing this solution at Shopify :bowtie:! The uncompressed versions of the files also include this breakdown in more depth.

Since it's redundant to discuss the breakdown of the HTML & CSS, those comments have been kept in their respective files [here](https://github.com/Anish-Agnihotri/toronto-waste-wizard/blob/master/index.html) and [here](https://github.com/Anish-Agnihotri/toronto-waste-wizard/blob/master/assets/stylesheet.css). Thus, the following, is a line-by-line breakdown of only the JQuery:

### Setting up variables
I setup variables at the beginning of the file in order to keep the code as clean as possible. This was done for both convience of reading the code, and for integrating respective functions. This block of code sets up the searchbar, submit button, results section div, and favourites section div. It also intializes an empty array which will later hold our favourite items.
```js
let searchbar = $('.search > input');
let submit = $('.search > button');
let results = $('.results');
let favourites = $('.favourites');

let favouriteList = [];
```
### Control search events
Next, I setup search events that would run on page ready. First, is the `searchbar.keyup(function)` which controls two things: (1) it presses the submit button when key 13 (enter) is pressed, and (2) it sets the innerHTML of the results div to being empty when the searchbar is empty. Following this, the `submit.click(function)` handles the button click. It runs the `fulfillQuery();` function.
```js
$(document).ready(function () {

    searchbar.keyup(function (key) {
        if (key.which === 13) {
            submit.click();
        }
        if (searchbar.val() === '') {
            results.html('');
        }
    });

    submit.click(function () {
        fulfillQuery();
    });

});
```

### fulfillQuery(); function to render results
Since this is such a large function, the explanation for the function has been directly placed into comments throughout the code, for readability:
```js
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
                In order to make this more robust, the filter has been applied to the title and the body of the item too, by adding ${objects[index].title} and ${objects[index].body} to the if operator.
                */
                if (`${objects[index].title} ${objects[index].keywords} ${objects[index].body}`.toLowerCase().indexOf(searchbar.val().toLowerCase()) !== -1) {

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
```
### favourite(); function to handle favourites
The `favourite();` function is used to handle favouriting and un-favouriting waste items. It takes the item `${index}` from the Axios request, and adds/removes items from the previously initalized `favouriteList` array. If the array already includes the item, the function removes the `favourited` class from the star (thus turning it gray), removes the item from the `favourites` section, and uses the items position in the array to splice it out. Otherwise, if the array does not include the item and a user presses the star, the function adds the `favourited` class to the star, appends the item to the `favourites` section, and pushes the index value of the item to the `favouriteList` array.
```js
function favourite(index) {

    if (favouriteList.includes(index)) {
        $('.' + index).find('i').removeClass('favourited');
        favourites.find('.' + index).remove(); 
        favouriteList.splice(favouriteList.indexOf(index), 1);
    } else {
        $('.' + index).find('i').addClass('favourited'); 
        $('.' + index).clone().appendTo(favourites); 
        favouriteList.push(index);
    }

}
```
### parseHTML(); function to parse HTML content
Finally, the `parseHTML();` function converts the body data recieved from the API to html content. It does so by using a little trick that initializes a self-enclosed `div` tag, and sets the innerHTML of this tag to the data from the API. Then, the `text()` value of this aforemenetioned tag is returned.
```js
function parseHTML(html) {
    var parsed = $("<div />").html(html).text();
    return parsed; 
}
```
## Results
After successfully completing the challenge, I conducted a benchmark on the website (while still hosted on Github Pages), to analyze performance:

| Test               | Score | Link | Description |
|--------------------|-------|------|-------------|
| Google Lighthouse Desktop  | 100%   |[Lighthouse](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fanish-agnihotri.github.io%2Ftoronto-waste-wizard%2F&tab=desktop)      | Maximum score achieved for Google Lighthouse Desktop.|
| Google Lighthouse Mobile  | 98%   |[Lighthouse](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fanish-agnihotri.github.io%2Ftoronto-waste-wizard%2F&tab=mobile)      |2% lost due to webfont rendering (font-awesome). In the future, using single search SVG would increase this score to 100%.|
| PageSpeed 1.15-gt1 | 99%   |[GTmetrix](https://gtmetrix.com/reports/anish-agnihotri.github.io/d9dkOSed)      |1% lost due to not leveraging browser caching. Moving from Github Pages to an external host, and appropriatley setting up the .htaccess for cache would increase this score to 100%.|
| YSlow 3.1.8        | 95%   |[GTmetrix](https://gtmetrix.com/reports/anish-agnihotri.github.io/d9dkOSed)      |5% lost due to not using expires headers, and the Axios CDN storing cookies. Appropriatley setting up the .htaccess and changing the source for the Axios import would increase this score to 100%.|

Page metrics were also recorded:

| Metric                   | Result |
|--------------------------|--------|
| Total Page Size          | 128KB  |
| External Requests        | 8      |
| Time to meaningful paint | 0.5s   |
| Time to render           | 300ms - 640ms |

### Thus, after analyzing these results, I concluded that my desicion to choose JQuery over the alternatives was worthwhile, and that I was successful in completing this challenge.

