$(()=> {
    $('#logout').on('click',()=> {
        sessionStorage.clear();
    })

    if (sessionStorage.getItem('status') === 'loggedIn') {
        $('#signup').css('display', 'none');
        $('#login').css('display', 'none');
        $('#favourite').css('display', 'block');
        $('#profile').css('display', 'block');
        $('#logout').css('display', 'block');
    }
    
    if (sessionStorage.getItem('status') === null) {
        $('#favourite').css('display', 'none');
        $('#profile').css('display', 'none');
        $('#logout').css('display', 'none');
        $('#signup').css('display', 'block');
        $('#login').css('display', 'block');

    }
})

