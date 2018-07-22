$(()=> {
    $.get(`/api/meal`).then(data => {
        data.forEach(e => {
            $('#mealPlans').append(MealPlan(
                e.id,
                e.name,
                e.img,
                e.about,
                e.rest_id
            ))

            let elem = $(`#mp${e.id}_about`); // Limit about text to 50 characters
            if(elem){
                if (elem.text().length > 10)
                        elem.text(elem.text().substr(0,50)+'...');
            }
        });
    });
    const MealPlan = (id,name,img,about,rest_id)=>{
        return `
            <div class="innerwrapper">
                <div class="name">${name}</div>
                    <div class="heart"><i data-id="${id}" id="favBtn" class="fa" aria-hidden="true"></i></i></div>
                        <div class="image">
                            <img src="${img}">
                        </div>
                    <div class="about" id="mp${id}_about">${about}"></div>
                <div class="link"><a href="/rest/${rest_id}">View more</div>
            </div>
            `
    };
})