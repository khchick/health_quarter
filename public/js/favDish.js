$(() => {
    $.get(`/api/fav/dishes`).then(data => {
        data.forEach(e => {
            $('#fav-dish-list').append(Dish(e.name, e.img, e.id));
        });
    });
    const Dish = (name, img, id) => {
        return `
                <div class="info-container">
                    <label class="lbl-info">Name: </label><p><strong>${name}</strong></p>
                    <label class="lbl-info">Img: </label>${img}</p>
                    <label class="lbl-info">Link: </label><p><a href="/rest/${id}">Open in restaurant</a></p>
                </div>`
    };
})


