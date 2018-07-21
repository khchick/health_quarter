$(()=>{
    let tagID = window.location.href.split("/").pop();

    $.get(`/api/rest/tag/${tagID}`).then(data=>{  // NEED TO UPDATE TAG ID INTO FOOD'S AFTER FIXING THE DATA
        $('#tagName').append(data[0].tag_name.toUpperCase());
        data.forEach(e =>{
            $('#restList').append(Rest(e.id,e.name,e.img,e.rating));

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
        });
            // Append associated tags and linkages
            for (let i = 0;i < data.length;i++) {
            let tagData = data[i].tags;
            return tagData.forEach(e =>{
                $(`#rest_${data[i].id}`).append(RestTags(e.tag_id,e.tag_name));
            });
        }
    });

    const Rest = (id,name,img)=>{
        return `
            <div class="innerwrapper">
                <div class="name"><a href="/rest/${id}">${name}</a></div>
                        <div class="heart">heart</div>
                            <div class="image">
                                <img src="${img}">
                            </div>
                        <div class="ratings">ratings</div>
                    <div class="stars" id="rating_${id}"></div>
                <div class="tags" id="rest_${id}"></div>
            </div>
            `
    };

    const RestTags = (tag_id,tag_name)=>{
        return `
            <a href="/tag/${tag_id}">${tag_name}</a>
            `
    }
})