$(()=>{
    let mealID = window.location.href.split("/").pop();

    // Get meal details
    $.get(`/api/meal/detail/${mealID}`).then(data =>{
        data.forEach(e =>{
            $('#meal-detail').append(MealDetail(
                e.name,
                e.img
            ))
        });
    });
    const MealDetail = (name,img)=>{
        return `
            <div class="info-container">
                <label class="lbl-info">Name: </label><p>${name}</p>
                <label class="lbl-info">img: </label><p>${img}</p>
            </div>`
    }

    // Get favourite status
    $.get(`/api/fav/meal/${mealID}`).then(res => {
        let status = JSON.parse(res);
        if (status === true) {
            $('#favBtn').html("isFav");
        } else {
            $('#favBtn').html("notFav");
        }
    })

    // Listen to click to toggle favourite status
    $('#favBtn').on('click',()=> {
        toggleFav(mealID);
    })

})

function toggleFav(mealID) {
    if ($('#favBtn').html() === "isFav") {
        axios.delete(`/api/fav/meal/${mealID}`).then(()=> {
            $('#favBtn').html("notFav");
        })
    }
    if ($('#favBtn').html() === "notFav") {
        axios.post(`/api/fav/meal/${mealID}`).then(()=> {
            $('#favBtn').html("isFav");
        })
    }
}

