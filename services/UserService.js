class UserService {

    constructor(knex) {
        this.knex = knex;
    }

    getUserDetail(userID) {
        // Get User.img from DB for matching userID
        // Get User.name from DB for matching userID
        // Get User.email from DB for matching userID
        let query = this.knex
            .select('users.img','users.email', 'users.name')
            .from('users')
            .where('users.id', userID)

        return query.then(rows => {
            return rows.map(row => ({
                img: row.img,
                email: row.email,
                name: row.name
            }))
        })
    }

    updateUserDetail(userID,name,imgURL) {
        // Update record on form submission
        let query = this.knex
            .select()
            .from('users')
            .where('users.id',userID);

        return query.then(rows => {
            if (rows.length !==1) {
                return new Error('Invalid user');
            } else {
                return this.knex('users')
                    .where('id',userID)
                    .update({
                        name: name,
                        img: imgURL
                    })
            }
        })
    }

    listOwnReview(userID) {
        // Get rest_id from User_Review table for matching userID
        // Join Restaurant table to retrieve Restaurant.name
        // Get User_Review.comment of matching rest_id
        // Get User_Review.rating of matching rest_id
    }

    // isLoggedIn (req, res, next){
    //     if(req.isAuthenticated()){
    //         return next();
    //     }
    //     res.redirect('/login');
    // }

}

module.exports = UserService;