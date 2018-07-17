$(()=>{
    let restID = window.location.href.split("/").pop();

    // Get restaurant details
    $.get(`/api/rest/detail/${restID}`).then(data =>{
        data.forEach(e =>{
            $('#rest-detail').append(RestDetail(
                e.name,
                e.img,
                e.about,
                e.price,
                e.website,
                e.phone,
                e.hours,
                e.lat,
                e.lng,
                e.location,
                e.tags
            ))
        });
    });
    const RestDetail = (name,img,about,price,website,phone,hours,lat,lng,location,tags)=>{
        return `
            <div class="info-container">
                <label class="lbl-info">Name: </label><p>${name}</p>
                <label class="lbl-info">img: </label><p>${img}</p>
                <label class="lbl-info">About: </label><p>${about}</p>
                <label class="lbl-info">Price: </label><p>${price}</p>
                <label class="lbl-info">Website: </label><p>${website}</p>
                <label class="lbl-info">Phone: </label><p>${phone}</p>
                <label class="lbl-info">Hours: </label><p>${hours}</p>
                <label class="lbl-info">Lat: </label><p>${lat}</p>
                <label class="lbl-info">Lng: </label><p>${lng}</p>
                <label class="lbl-info">Location: </label><p>${location}</p>
                <label class="lbl-info">Tags: </label><p>${tags}</p>
            </div>`
    }

    // Get favourite status
    $.get(`/api/fav/rest/${restID}`).then(res => {
        let status = JSON.parse(res);
        if (status === true) {
            $('#favBtn').html("isFav");
        } else {
            $('#favBtn').html("notFav");
        }
    })

    // Listen to click to toggle favourite status
    $('#favBtn').on('click',()=> {
        toggleFav(restID);
    })

    // Get users' reviews
    $.get(`/api/rest/review/${restID}`).then(data => {
        data.forEach(e =>{
            $('#rest-review').append(UsersReview(
                e.name,
                e.comment,
                e.rating,
                e.dateSubmitted
            ))
        });
    });
    const UsersReview = (name,comment,rating,date)=>{
        return `
            <div class="info-container">
                <label class="lbl-info">Name: </label><p>${name}</p>
                <label class="lbl-info">Comment: </label><p>${comment}</p>
                <label class="lbl-info">Rating: </label><p>${rating}</p>
                <label class="lbl-info">Date: </label><p>${date}</p>
            </div>`
    }

    // Post user review
    $('#submitReview').on('click', (e) => {
        e.preventDefault();
        
        let comment = $('#comment').val();
        let rating = $('input[name=rating]:checked').val()

        if (comment === '') {
            return;
        }

        // console.log(comment);
        // console.log(rating);

        axios.post('/api/rest/review/:restID', {
            "comment": comment,
            "rating": rating
        })
            .then((res) => {
            console.log(res);
            refreshReviews(res.data);
            $('#alert').html('Review added!');
            setTimeout(() => {
                $('#alert').html('&nbsp;');
            }, 1000);
        })
    })
})

function toggleFav(restID) {
    if ($('#favBtn').html() === "isFav") {
        axios.delete(`/api/fav/rest/${restID}`).then(()=> {
            $('#favBtn').html("notFav");
        })
    }
    if ($('#favBtn').html() === "notFav") {
        axios.post(`/api/fav/rest/${restID}`).then(()=> {
            $('#favBtn').html("isFav");
        })
    }
}
