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

1. 

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

