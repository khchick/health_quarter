$(()=>{
    // List all available tags
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
                <input type="checkbox" name="tag" value="${id}">${name}
            </div>`
    }
})

