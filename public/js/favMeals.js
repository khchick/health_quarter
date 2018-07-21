$(() => {
    $.get(`/api/fav/meals`).then(data => { // Get list of all fav meals
        data.forEach(e => {
            $('#fav-meal-list').append(Meal(e.name, e.img, e.id));
        });
    });
    const Meal = (name, img, id) => {
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


