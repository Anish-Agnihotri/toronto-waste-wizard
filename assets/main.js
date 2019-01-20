let searchbar = $('.search > input');
let submit = $('.search > button');
let results = $('.results');
let favourites = $('.favourites');
let favouriteList = [];

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

            objects.forEach(function (item, index) {

                if (`${objects[index].keywords}`.toLowerCase().indexOf(searchbar.val().toLowerCase()) !== -1) {
                    queryResult += `<tr class='${index}'><td><a href='javascript: void(0);' class='star' onClick='favourite(${index});'><i class='fa fa-star'></i></a></td><td>${item.title}</td><td>${parseHTML(item.body)}</td></tr>`;
                }
                results.html(queryResult);
            });

            jQuery.each(favouriteList, function () {
                $('.' + this).find('i').addClass('favourited');
            });
        })
}

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

function parseHTML(html) {
    var parsed = $("<div />").html(html).text();
    return parsed;
}