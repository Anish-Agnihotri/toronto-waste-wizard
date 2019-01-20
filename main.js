let searchbar = $('.search > input');
let submit = $('.search > button');
let results = $('.results');
let favourites = $('.favourites');
let star = $('.star');

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

function fulfillQuery() {

    axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
        .then((response) => {
            let objects = response.data;
            let queryResult = '';

            objects.forEach(function(item, index) {
                 
                if (`${objects[index].keywords}`.toLowerCase().indexOf(searchbar.val().toLowerCase()) !== -1) {
                    queryResult += `<tr class='${index}'><td><a class='star' onClick='favourite(${index});'><i class='fa fa-star'></i></a></td><td>${item.title}</td><td>${item.body}</td></tr>`;
                } 
                results.html(queryResult);
            });
        })
}

let favouriteList = [];

function favourite(index) {
    if (favouriteList.includes(index)) {
        $('.' + index).find('i').removeClass('favourited');
        favourites.find('.' + index).remove();
        console.log('it includes ' + index);
        favouriteList.splice(favouriteList.indexOf(index), 1);
    }
    else {
        $('.' + index).find('i').addClass('favourited');
        $('.' + index).clone().appendTo(favourites);
        console.log('it does not include ' + index);
        favouriteList.push(index);
    }
}