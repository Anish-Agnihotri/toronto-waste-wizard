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

## Code breakdown

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

