$(()=> {
    $.get(`/api/meal`).then(data => {
        data.forEach(e => {
            $('#mealPlans').append(MealPlan(
                e.name,
                e.img,
                e.about,
                e.rest_id
            ))
        });
    });
    const MealPlan = (name,img,about,rest_id)=>{
        return `
            <div class="innerwrapper">
                <div class="name">${name}</a></div>
                        <div class="heart">heart</div>
                            <div class="image">
                                <img src="${img}">
                            </div>
                <div class="about">${about}"></div>
                <div class="link"><a href="/rest/${rest_id}">View in restaurant page</div>
            </div>
            `
    };
})