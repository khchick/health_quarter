class UserService {

    constructor(knex) {
        this.knex = knex;
    }

    getUserDetail(userID) {
        // Get User.img from DB for matching userID
        // Get User.name from DB for matching userID
        // Get User.email from DB for matching userID
        let query = this.knex
            .select('users.img', 'users.email', 'users.name')
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

    updateUserDetail(userID, name, imgURL) {
        // Update record on form submission
        let query = this.knex
            .select()
            .from('users')
            .where('users.id', userID);

        return query.then(rows => {
            if (rows.length !== 1) {
                return new Error('Invalid user');
            } else {
                return this.knex('users')
                    .where('id', userID)
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

    listAllTags() {
        let query = this.knex
            .select('tag.id', 'tag.name')
            .from('tag')
            .orderBy('tag.name')

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                name: row.name
            }))
        })
    }

    listFavTags(userID) {
        let query = this.knex
            .select('users_fav_tag.tag_id','tag.name')
            .from('users_fav_tag')
            .innerJoin('tag','users_fav_tag.tag_id','tag.id')
            .where('users_fav_tag.users_id',userID)

            return query.then(rows => {
                return rows.map(row => ({
                    id: row.tag_id,
                    name: row.name
                }))
            })
        // let query = this.knex
        //     .select('tag.id', 'tag.name')
        //     .from('tag')
        //     .orderBy('tag.name')

        // return query.then(rows => {
        //     console.log(rows)
        //     return rows.map(row => ({
        //         id: row.id,
        //         name: row.name,
        //         checked: null
        //     }))
        // })
        //     .then(rows => {
        //         return rows.forEach(row => {
        //             let query = this.knex
        //                 .select('users_fav_tag.id')
        //                 .from('users_fav_tag')
        //                 .where('users_fav_tag.users_id', userID)
        //                 .andWhere('users_fav_tag.tag_id', row.id)

        //             return query.then(favTags => {
        //                 if (favTags[0] === 1) {
        //                     return rows.map(row => ({
        //                         id: row.id,
        //                         name: row.name,
        //                         checked: true
        //                     }))
        //                 } else {
        //                     return rows.map(row => ({
        //                         id: row.id,
        //                         name: row.name,
        //                         checked: false
        //                     }))
        //                 }
        //             })
        //         })
        //     })
    }
}

module.exports = UserService;