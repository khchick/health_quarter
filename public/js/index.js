$(()=>{
    // Get lists of restaurants tagged as Food
    $.get(`/api/rest/tag/1`).then(data=>{ 
        data.forEach(e =>{
            $('#1stTagList').append(FoodRest(e.id,e.name,e.img,e.rating)); // Append restaurant details

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
        });
        // Append associated tags and linkages
        for (let i = 0;i < data.length;i++) {
            let tagData = data[i].tags;
            console.log(data[1].tags);
            console.log(data[1].id);
            return tagData.forEach(e =>{
                $(`#rest_${data[i].id}`).append(RestTags(e.tag_id,e.tag_name));
            });
        }
    });

    const FoodRest = (id,name,img,rating)=>{
        return `
            <div class="innerwrapper">
                <div class="name"><a href="/rest/${id}">${name}</a></div>
                        <div class="heart"><i data-id="${id}" id="favBtn" class="fa" aria-hidden="true"></i></div>
                            <div class="image">
                                <img src="${img}">
                            </div>
                        <div class="ratings">ratings</div>
                    <div class="stars">${rating}stars</div>
                <div class="tags" id="rest_${id}"></div>
            </div>
            `
    };

    const RestTags = (tag_id,tag_name)=>{
        return `
            <a href="/tag/${tag_id}">${tag_name}</a>
            `
    }

    // Get lists of restaurants tagged as Food
    $.get(`/api/rest/tag/10`).then(data=>{ 
        data.forEach(e =>{
            $('#2ndTagList').append(DrinkRest(e.id,e.name,e.img,e.rating)); // Append restaurant details

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
        });
        // Append associated tags and linkages
        for (let i = 0;i < data.length;i++) {
            let tagData = data[i].tags;
            console.log(data[1].tags);
            console.log(data[1].id);
            return tagData.forEach(e =>{
                $(`#rest_${data[i].id}`).append(DrinkTags(e.tag_id,e.tag_name));
            });
        }
    });

    const DrinkRest = (id,name,img,rating)=>{
        return `
            <div class="innerwrapper">
                <div class="name"><a href="/rest/${id}">${name}</a></div>
                        <div class="heart"><i data-id="${id}" id="favBtn" class="fa" aria-hidden="true"></i></div>
                            <div class="image">
                                <img src="${img}">
                            </div>
                        <div class="ratings">ratings</div>
                    <div class="stars">${rating}stars</div>
                <div class="tags" id="rest_${id}"></div>
            </div>
            `
    };

    const DrinkTags = (tag_id,tag_name)=>{
        return `
            <a href="/tag/${tag_id}">${tag_name}</a>
            `
    }

    // Get all meal plans
    $.get(`/api/meal`).then(data => {
        data.forEach(e => {
            $('#mealPlanList').append(MealPlan(
                e.id,
                e.name,
                e.img,
                e.about,
                e.rest_id
            ));
            $.get(`/api/fav/meal/${e.id}`).then(res => { // Check and return fav status
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
            function toggleFav(mealID) {
                if ($(`i[data-id="${mealID}"]`).hasClass("fa-heart")) {
                    axios.delete(`/api/fav/meal/${mealID}`).then(() => {
                        $(`i[data-id="${mealID}"]`).removeClass("fa-heart");
                        $(`i[data-id="${mealID}"]`).addClass("fa-heart-o");
                    })
                }
                if ($(`i[data-id="${mealID}"]`).hasClass("fa-heart-o")) {
                    axios.post(`/api/fav/meal/${mealID}`).then(() => {
                        $(`i[data-id="${mealID}"]`).removeClass("fa-heart-o");
                        $(`i[data-id="${mealID}"]`).addClass("fa-heart");
                    })
                }
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
            <div class="about">${about}"></div>
            <div class="link"><a href="/rest/${rest_id}">View in restaurant page</div>
        </div>
            `
    };

})

// For prototype

// let tags = [1,2,3]; // Predefine tags for restaurant listing on generic landing page

// $(()=>{
//     for(let i = 0;i < tags.length;i++) { // Get lists of restaurants by tags
//         $.get(`/api/rest/tag/${tags[i]}`).then((data)=>{
//             data.forEach(e =>{
//                 $('#rest-list').append(Rest(e.tag_name,e.id,e.name,e.price,e.img,e.tags));
//             });
//         });
//         const Rest = (tag_name,id,name,price,img,tags)=>{
//             return `
//                 <div class="info-container">
//                     <label class="lbl-info">Tag: </label><p><strong>${tag_name}</strong></p>
//                     <label class="lbl-info">Name: </label><p><a href="https://localhost:8443/rest/${id}">${name}</a></p>
//                     <label class="lbl-info">Price: </label><p>${price}</p>
//                     <label class="lbl-info">Img: </label><p>${img}</p>
//                     <label class="lbl-info">Tags: </label><p>${tags}</p>
//                 </div>`
//         };
//     }
// })



