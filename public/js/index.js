$(()=>{
    $.get(`/api/rest/tag/15`).then((data)=>{ // Get lists of restaurants tagged as Food
        data.forEach(e =>{
            $('#1stRecList').append(Rest(e.id,e.name,e.img,e.rating));
        });
    });
    const Rest = (id,name,img,rating)=>{
        return `
            <div class="innerwrapper">
                <div class="name"><a href="/rest/${id}">${name}</a></div>
                        <div class="heart">heart</div>
                            <div class="image">
                                <img src="${img}">
                            </div>
                        <div class="ratings">ratings</div>
                    <div class="stars">${rating}stars</div>
                <div class="tags">tags</div>
            </div>`
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



