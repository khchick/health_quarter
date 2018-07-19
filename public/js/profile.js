$(() => {
    // Get profile details
    $.get(`/api/user/`).then(data => {
        data.forEach(e => {
            $('#my-detail').append(UserDetail(
                e.img,
                e.email,
                e.name,
            ))
        });
    });
    const UserDetail = (img, email, name) => { // Append form with embedded details to page
        return `
            <div class="info-container">
                <form action="/api/user" method="put" enctype="multipart/form-data">
                    <div class="d-flex justify-content">
                        <label>Profile pic:  </label>
                        <img src="${img}" height="100" width="100">
                    </div>
                    <div class="d-flex justify-content">
                        <label>Upload new image</label>
                        <input type="file" id="avatar" accept="image/*" name="avatar">
                        <button id="updateImg">Upload</button>
                    </div>
                        <label>Email:  </label>
                        <input type="text" name="username" value="${email}" readonly/>
                    </div>
                    <div class="d-flex justify-content">
                        <label>Nickname:  </label>
                        <input type="text" name="nickname" id="nickname" value="${name}"/>
                    </div>
                </form> 
            </div>`
    }

    $.get('/api/user/tags/all').then(data => { // Get all available tags as checkboxes
        data.forEach(e => {
            $('#tag-list').append(Tags(
                e.id,
                e.name
            ))
        });
    });
    const Tags = (id, name) => {
        return `
            <div class="info-container">
                <input type="checkbox" name="tag" id="tag_${id}" value="${id}">${name}
            </div>`
    }

    $.get(`/api/user/tags/fav`).then(data => { // Get all fav tags (already checked)
        return data.forEach(e => {
            return $(`#tag_${e.id}`).prop('checked', true);
        });
    })

    // Update account details
    $('#updateBtn').on('click', (e) => {
        e.preventDefault();

        axios.put('/api/user', {
            "nickname": $('#nickname').val(), // Update nickname only
        })
            .then(() => {
                axios.delete('/api/user/tags/fav') // Clear all fav tags
                .then(()=> {
                    var checked = $('input:checked');
                    for (i = 0;i < checked.length;i++) {
                        axios.put('/api/user/tags/fav',{ // Insert new fav tags
                            tag: {
                                tag_id: checked[i].defaultValue
                            }
                        });
                    }
                })
            })
            .then(()=>location.reload())
            .catch(err => console.log(err));
    })

    // Update avatar image (post new)
    $('#tag-list').on('click','#updateImg', (e) => {
        e.preventDefault();
        let file = $('#avatar').get(0).files;
        var formData = new FormData();
        formData.append("avatar", file);
        axios.post(`/api/user/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(()=> {
            axios.put('/api/user', {
                "imgURL": `/images/users/${file[0].name}` // Insert image URL to DB
            }) 
        })
        .then(()=>location.reload())
    })

})

