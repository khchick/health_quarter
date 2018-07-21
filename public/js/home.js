$(()=>{
    $.get(`/api/fav/preference`).then(tags=>{ // Get all fav tags
        tags.forEach(tag =>{ // Insert tag as title and view all linkage
            $('#tag-list').append(` 
                <div class="title">
                    <div>
                        <span>${tag.name.toUpperCase()}</span>
                        <a href="/tag/${tag.id}">VIEW ALL</a>
                    </div>
                </div>
                <div class="wrapper" id="tag_${tag.id}_rest"></div>
            `);

            $.get(`/api/rest/tag/${tag.id}`).then(data=>{ // Get list of restaurants by each tag
                data.forEach(e =>{
                    $(`#tag_${e.tag_id}_rest`).append(Rest(e.id,e.name,e.img,e.tags));

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
                    // Calculate average rating and show as stars
                    $.get(`/api/rest/rating/${e.id}`).then(res => {
                        for (let i = 0;i < res;i++) {
                            $(`#rating_${e.id}`).append('<i class="fa fa-star" aria-hidden="true"></i>');
                        }
                        for (let i = 0;i < (5-res);i++) {
                            $(`#rating_${e.id}`).append('<i class="fa fa-star-o" aria-hidden="true"></i>');
                        }
                    });

                    // Append associated tags and linkages
                    e.tags.forEach(tag =>{
                        $(`#rest_${e.id}`).append(RestTags(tag.tag_id,tag.tag_name));
                    })
                });
                
            });
            const Rest = (id,name,img)=>{
                return `
                <div class="innerwrapper">
                    <div class="name"><a href="/rest/${id}">${name}</a></div>
                            <div class="heart"><i data-id="${id}" id="favBtn" class="fa" aria-hidden="true"></i></div>
                                <div class="image">
                                    <img src="${img}">
                                </div>
                            <div class="ratings">ratings</div>
                        <div class="stars" id="rating_${id}"></div>
                    <div class="tags" id="rest_${id}"></div>
                </div>
                `
            }
            const RestTags = (tag_id,tag_name)=>{
                return `
                    <a href="/tag/${tag_id}">${tag_name}</a>
                    `
            }
        });
    });
})

