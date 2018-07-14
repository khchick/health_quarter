$(()=>{
    let restID = window.location.href.split("/").pop();
    $.get(`/api/rest/detail/${restID}`).then((data)=>{
        data.forEach(e =>{
            $('#rest-detail').append(RestDetail(
                e.name,
                e.img,
                e.about,
                e.price,
                e.website,
                e.phone,
                e.hours,
                e.lat,
                e.lng,
                e.location,
                e.tags
            ))
        });
    });
    const RestDetail = (name,img,about,price,website,phone,hours,lat,lng,location,tags)=>{
        return `
            <div class="info-container">
                <label class="lbl-info">Name: </label><p>${name}</p>
                <label class="lbl-info">img: </label><p>${img}</p>
                <label class="lbl-info">About: </label><p>${about}</p>
                <label class="lbl-info">Price: </label><p>${price}</p>
                <label class="lbl-info">Website: </label><p>${website}</p>
                <label class="lbl-info">Phone: </label><p>${phone}</p>
                <label class="lbl-info">Hours: </label><p>${hours}</p>
                <label class="lbl-info">Lat: </label><p>${lat}</p>
                <label class="lbl-info">Lng: </label><p>${lng}</p>
                <label class="lbl-info">Location: </label><p>${location}</p>
                <label class="lbl-info">Tags: </label><p>${tags}</p>
            </div>`
    }
})

