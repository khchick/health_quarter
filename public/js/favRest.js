$(() => {
    $.get(`/api/fav/restaurants`).then(data => { // Get list of all fav restaurants
        data.forEach(e => {
            $('#fav-rest-list').append(Rest(e.name, e.img, e.id));
        });
    });
    const Rest = (name, img, id) => {
        return `
                <div class="info-container">
                    <label class="lbl-info">Name: </label><p><strong>${name}</strong></p>
                    <label class="lbl-info">Img: </label>${img}</p>
                    <label class="lbl-info">Link: </label><p><a href="/rest/${id}">View details</a></p>
                </div>`
    };
})


