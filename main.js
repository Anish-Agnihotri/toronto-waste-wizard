let form = $('.search > form');
let searchbar = $('.search > form > input');
let submit = $('.search > form > button');
let results = $('.results');
let favourites = $('.favourites');

$(document).ready(function() {
    
    form.submit(function() {
        event.preventDefault();
    });

    searchbar.keyup(function(key) {
        if(key.which === 13) {
            submit.click();
        }
    });
    
    submit.click(function() {
        let query = searchbar.val();
        console.log(query);
    });

});