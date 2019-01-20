let searchbar = $('.search > input');
let submit = $('.search > button');
let results = $('.results');
let favourites = $('.favourites');

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
                    queryResult += `<tr><td><a class='star ${index}' onClick='favourite();'><i class='fa fa-star'></i></a></td><td>${item.title}</td><td>${item.body}</td></tr>`;
                } 
                results.html(queryResult);
            });
        })
}


let favouriteList = [];

function favourite() {
    let attr = $(this).attr('class').replace('star ', '');

    $('.star' + attr).click(function () {  
        let attr = $(this).attr('class').replace('star ', '');
        
        if (favouriteList.includes(attr)) {
            console.log('already inside');

        }
        else {
            console.log('not inside');
            $('.' + attr).css('color', '#000000 !important');
            $('.' + attr).parent().parent().clone().appendTo(favourites);
        }
    });
}