$(() => {
    $.get(`/api/fav/recipes`).then(data => { // Get list of all fav recipes
        data.forEach(e => {
            $('#fav-rec-list').append(Recipe(e.recURL));
        });
    });
    const Recipe = (recURL) => {
        return `
                <div class="info-container">
                    <label class="lbl-info">Name and ID: </label><p><strong>${recURL}</strong></p>
                    <label class="lbl-info">Full Information: </label><p><a href='https://spoonacular.com/${recURL}'>View details</a></p>
                    </div>`
    };
}) 