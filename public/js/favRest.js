$(() => {
    $.get(`/api/fav/restaurants`).then(data => { // Get list of all fav restaurants
        data.forEach(e => {
            $('#fav-rest-list').append(Rest(e.name, e.img, e.id));
        });
    });
    const Rest = (name, img, id) => {
        return `
            <div class="innerwrapper">
                <div class="name">${name}</div>
                        <div class="heart">heart</div>
                            <div class="image">
                                <img src="${img}">
                            </div>
                <div class="link"><a href="/rest/${id}">View in restaurant page</div>
            </div>
            `
    };
})


