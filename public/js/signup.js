$(()=>{
    $.get('/api/user/tags/all').then(data =>{ // List all available tags
        data.forEach(e =>{
            $('#tag-list').append(Tags(
                e.id,
                e.name
            ))
        });
    });
    const Tags = (id,name)=>{ // Display as checkboxes
        return `
            <div class="info-container">
                <input type="checkbox" name="tag" value="${id}">${name}
            </div>`
    }
})

