$(()=>{
    let tagID = window.location.href.split("/").pop();

    $.get(`/api/rest/tag/${tagID}`).then(data=>{  // NEED TO UPDATE TAG ID INTO FOOD'S AFTER FIXING THE DATA
        $('#tagName').append(data[0].tag_name.toUpperCase());
        data.forEach(e =>{
            $('#restList').append(Rest(e.id,e.name,e.img,e.rating));
        });
        for (let i = 0;i < data.length;i++) {
            let tagData = data[i].tags;
            console.log(data[1].tags);
            console.log(data[1].id);
            return tagData.forEach(e =>{
                $(`#rest_${data[i].id}`).append(Tags(e.tag_id,e.tag_name));
            });
        }
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
                <div class="tags" id="rest_${id}"></div>
            </div>
            `
    };

    const Tags = (tag_id,tag_name)=>{
        return `
            <a href="/tag/${tag_id}">${tag_name}</a>
            `
    }
})