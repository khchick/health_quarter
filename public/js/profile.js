$(()=>{
    // Get account details
    $.get(`/api/user/`).then(data =>{
        data.forEach(e =>{
            $('#my-detail').append(UserDetail(
                e.img,
                e.email,
                e.name,
            ))
        });
    });
    const UserDetail = (img,email,name)=>{
        return `
            <div class="info-container">
                <form action="/signup" method="post" enctype="multipart/form-data">
                    <div class="d-flex justify-content">
                        <label>Profile pic:  </label>
                        <img src="${img}" style="width: 200px;">
                    </div>
                    <div class="d-flex justify-content">
                        <label>Upload new image</label>
                        <input type="file" id="imgfile" accept="image/*" name="profilePic">
                    </div>
                        <label>Email:  </label>
                        <input type="text" name="username" value="${email}" readonly/>
                    </div>
                    <div class="d-flex justify-content">
                        <label>Nickname:  </label>
                        <input type="text" name="nickname" id="nickname" value="${name}"/>
                    </div>

                    <div class="d-flex flex-column align-items-center">
                        <input type="submit" id="updateBtn" value="Update"/>
                    </div>
                </form> 
            </div>`
    }

    $.get('/api/user/tags/all').then(data =>{
        data.forEach(e =>{
            $('#tag-list').append(Tags(
                e.id,
                e.name
            ))
        });
    });
    const Tags = (id,name)=>{
        return `
            <div class="info-container">
                <input type="checkbox" name="tag" id="${id}${name}" value="${id}">${name}
            </div>`
    }

    $.get(`/api/user/tags/fav`).then(data => {
        console.log(data);
        return data.forEach(e =>{
            return $(`#${e.id}${e.name}`).prop('checked', true);
        });
    })

    // Update account details
    $('#my-detail').on('click', '#updateBtn', (e) => {
        e.preventDefault();

        let nickname = $('#nickname').val();
        let file = $('#imgfile').val();

        var formData = new FormData();
        // formData.append("nickname",nickname);

        for(let i = 0;i < file.length; i++) {
            formData.append("imgfile",file[i]);
        }
    
        axios.post('/api/user', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            axios.put('api/user', {
                "nickname": nickname,
                "imgURL": `/public/users/${file}`
            })
            .then(res=>document.location='/profile')
        })
        .catch(err => {
            console.log(err);
        });
    })

//  // Get dish details
//  $.get(`/api/dish/rest/${restID}`).then(data =>{
//    data.forEach(e =>{
//         $('#dish-detail').append(DishDetail(
//             e.name,
//             e.img,
//         ))
//     });
// });
// const DishDetail = (name,img)=>{
//     return `
//         <div class="info-container">
//             <label class="lbl-info">Name: </label><p>${name}</p>
//             <label class="lbl-info">img: </label><p>${img}</p>
//         </div>`
// }

//  // Get meal details
//  $.get(`/api/meal/${restID}`).then(data =>{
//     data.forEach(e =>{
//         $('#meal-detail').append(MealDetail(
//             e.name,
//             e.img,
//             e.about,
//         ))
//     });
// });
// const MealDetail = (name,img,about)=>{
//     return `
//         <div class="info-container">
//             <label class="lbl-info">Name: </label><p>${name}</p>
//             <label class="lbl-info">img: </label><p>${img}</p>
//             <label class="lbl-info">About: </label><p>${about}</p>
//         </div>`
// }

//     // Get favourite status
//     $.get(`/api/fav/rest/${restID}`).then(res => {
//         console.log(res);
//         let status = JSON.parse(res);
//         if (status === true) {
//             $('#favBtn').html("isFav");
//         } else {
//             $('#favBtn').html("notFav");
//         }
//     })

//     // Listen to click to toggle favourite status
//     $('#favBtn').on('click',()=> {
//         toggleFav(restID);
//     })

//     // Get users' reviews
//     $.get(`/api/rest/review/${restID}`).then(data => {
//         data.forEach(e =>{
//             $('#rest-review').append(UsersReview(
//                 e.name,
//                 e.comment,
//                 e.rating,
//                 e.dateSubmitted
//             ))
//         });
//     });
//     const UsersReview = (name,comment,rating,date)=>{
//         return `
//             <div class="info-container">
//                 <label class="lbl-info">Name: </label><p>${name}</p>
//                 <label class="lbl-info">Comment: </label><p>${comment}</p>
//                 <label class="lbl-info">Rating: </label><p>${rating}</p>
//                 <label class="lbl-info">Date: </label><p>${date}</p>
//             </div>`
//     }

//     // Post user review
//     $('#submitReview').on('click', (e) => {
//         e.preventDefault();
        
//         let comment = $('#comment').val();
//         let rating = $('input[name=rating]:checked').val()

//         if (comment === '') {
//             return;
//         }

//         axios.post(`/api/rest/review/${restID}`, {
//             "comment": comment,
//             "rating": rating
//         })
//         .then((res) => {
//             document.location=`/rest/${restID}`;
//         })
//     })
})

function toggleFav(restID) {
    if ($('#favBtn').html() === "isFav") {
        axios.delete(`/api/fav/rest/${restID}`).then(()=> {
            $('#favBtn').html("notFav");
        })
    }
    if ($('#favBtn').html() === "notFav") {
        axios.post(`/api/fav/rest/${restID}`).then(()=> {
            $('#favBtn').html("isFav");
        })
    }
}

// function refreshReviews(review) {
//     $('#rest-review').html(reviewObject({review: review}));
// }

