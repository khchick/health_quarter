class UserService {

    constructor(knex) {
        this.knex = knex;
    }

    // Profile details services
    getUserDetail(userID) {
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

    // Tag services
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

    getFavTags(userID) {
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
    }

    clearFavTags(userID) {
        return this.knex("users_fav_tag").where("users_id",userID).delete()
    }

    insertFavTag(userID,tagID) {
        return this.knex("users_fav_tag")
            .insert({
                users_id:userID,
                tag_id:tagID
            })
    }

    // User's review services
    listOwnReview(userID) {
        // Get rest_id from User_Review table for matching userID
        // Join Restaurant table to retrieve Restaurant.name
        // Get User_Review.comment of matching rest_id
        // Get User_Review.rating of matching rest_id
    }

}

module.exports = UserService;