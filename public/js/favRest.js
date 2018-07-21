$(() => {
    $.get(`/api/fav/restaurants`).then(data => { // Get list of all fav restaurants
        data.forEach(e => {
            $('#fav-rest-list').append(Rest(e.name, e.img, e.id));

            $.get(`/api/fav/rest/${e.id}`).then(res => { // Check and return fav status
                let status = JSON.parse(res);
                if (status === true) {
                    $(`i[data-id="${e.id}"]`).addClass("fa-heart");
                    $(`i[data-id="${e.id}"]`).removeClass("fa-heart-o");
                } else {
                    $(`i[data-id="${e.id}"]`).addClass("fa-heart-o");
                    $(`i[data-id="${e.id}"]`).removeClass("fa-heart");
                }
            });
            $(`i[data-id="${e.id}"]`).on('click', () => { // Listen to click to toggle favourite status
                toggleFav(e.id);
            });

            // Define fav button function
            function toggleFav(restID) {
                if ($(`i[data-id="${restID}"]`).hasClass("fa-heart")) {
                    axios.delete(`/api/fav/rest/${restID}`).then(() => {
                        $(`i[data-id="${restID}"]`).removeClass("fa-heart");
                        $(`i[data-id="${restID}"]`).addClass("fa-heart-o");
                    })
                }
                if ($(`i[data-id="${restID}"]`).hasClass("fa-heart-o")) {
                    axios.post(`/api/fav/rest/${restID}`).then(() => {
                        $(`i[data-id="${restID}"]`).removeClass("fa-heart-o");
                        $(`i[data-id="${restID}"]`).addClass("fa-heart");
                    })
                }
            }

            // Calculate average rating and show as stars
            $.get(`/api/rest/rating/${e.id}`).then(res => {
                for (let i = 0;i < res;i++) {
                    $(`#foodRating_${e.id}`).append('<i class="fa fa-star" aria-hidden="true"></i>');
                }
                for (let i = 0;i < (5-res);i++) {
                    $(`#foodRating_${e.id}`).append('<i class="fa fa-star-o" aria-hidden="true"></i>');
                }
            });

            // Append associated tags and linkages
            e.tags.forEach(tag =>{
                $(`#rest_${e.id}`).append(RestTags(tag.tag_id,tag.tag_name));
            })
        });
    });
    const Rest = (name, img, id) => {
        return `
            <div class="innerwrapper">
                <div class="name">${name}</div>
                    <div class="heart"><i data-id="${id}" id="favBtn" class="fa" aria-hidden="true"></i></div>
                            <div class="image">
                                <img src="${img}">
                            </div>
                <div class="link"><a href="/rest/${id}">View in restaurant page</div>
            </div>
            `
    };
})



