$(()=> {
    // Get favourite status of restaurants
    $.get(`/api/fav/rest/${restID}`).then(res => {
        console.log('run');
        let status = JSON.parse(res);
        if (status === true) {
            $('#favBtn').data(restID).addClass("fa-heart");
            $('#favBtn').data(restID).removeClass("fa-heart-o");
        } else {
            $('#favBtn').data(restID).addClass("fa-heart-o");
            $('#favBtn').data(restID).removeClass("fa-heart");
        }
    })

    // Get favourite status of meal plans
    $.get(`/api/fav/rest/${restID}`).then(res => {
        let status = JSON.parse(res);
        if (status === true) {
            $('#favBtn').addClass("fa-heart");
            $('#favBtn').removeClass("fa-heart-o");
        } else {
            $('#favBtn').addClass("fa-heart-o");
            $('#favBtn').removeClass("fa-heart");
        }
    })

            // Get favourite status of recipes
    $.get(`/api/fav/rest/${restID}`).then(res => {
        let status = JSON.parse(res);
        if (status === true) {
            $('#favBtn').addClass("fa-heart");
            $('#favBtn').removeClass("fa-heart-o");
        } else {
            $('#favBtn').addClass("fa-heart-o");
            $('#favBtn').removeClass("fa-heart");
        }
    })
})