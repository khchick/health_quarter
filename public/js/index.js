let tags = [1,2,3]; // Predefine tags for restaurant listing on generic landing page

$(()=>{
    for(let i = 0;i < tags.length;i++) { // Get lists of restaurants by tags
        $.get(`/api/rest/tag/${tags[i]}`).then((data)=>{
            data.forEach(e =>{
                $('#rest-list').append(Rest(e.tag_name,e.id,e.name,e.price,e.img,e.tags));
            });
        });
        const Rest = (tag_name,id,name,price,img,tags)=>{
            return `
                <div class="info-container">
                    <label class="lbl-info">Tag: </label><p><strong>${tag_name}</strong></p>
                    <label class="lbl-info">Name: </label><p><a href="https://localhost:8443/rest/${id}">${name}</a></p>
                    <label class="lbl-info">Price: </label><p>${price}</p>
                    <label class="lbl-info">Img: </label><p>${img}</p>
                    <label class="lbl-info">Tags: </label><p>${tags}</p>
                </div>`
        };
    }
})

