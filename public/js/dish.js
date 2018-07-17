$(()=>{
    let dishID = window.location.href.split("/").pop();

    // Get Dish details
    $.get(`/api/dish/detail/${dishID}`).then(data =>{
        data.forEach(e =>{
            $('#dish-detail').append(DishDetail(
                e.name,
                e.img
            ))
        });
    });
    const DishDetail = (name,img)=>{
        return `
            <div class="info-container">
                <label class="lbl-info">Name: </label><p>${name}</p>
                <label class="lbl-info">img: </label><p>${img}</p>
            </div>`
    }

    // Get favourite status
    $.get(`/api/fav/dish/${dishID}`).then(res => {
        console.log(res);
        let status = JSON.parse(res);
        if (status === true) {
            $('#favBtn').html("isFav");
        } else {
            $('#favBtn').html("notFav");
        }
    })

    // Listen to click to toggle favourite status
    $('#favBtn').on('click',()=> {
        toggleFav(dishID);
    })

})

function toggleFav(dishID) {
    if ($('#favBtn').html() === "isFav") {
        axios.delete(`/api/fav/dish/${dishID}`).then(()=> {
            $('#favBtn').html("notFav");
        })
    }
    if ($('#favBtn').html() === "notFav") {
        axios.post(`/api/fav/dish/${dishID}`).then(()=> {
            $('#favBtn').html("isFav");
        })
    }
}

