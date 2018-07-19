class RestService {

    constructor(knex) {
        this.knex = knex;
    }

    listRestByTag(tagID) {
        // Get Restaurant.name from DB with matching tag
        // Return average from sum of all ratings with matching rest_id 
            // >>> NEED ADDITIONAL COLUMN IN DB
        // Get Restaurant.price from DB
        // Look up Restaurant_Tag table for tag_id per matching rest_id, return tag name for all tag_id(s), excluding the passed in arguement

        let query = this.knex
            .select('tag.name as tag_name','restaurant.id', 'restaurant.name', 'restaurant.price', 'restaurant.img')
            .from('restaurant')
            .innerJoin('restaurant_tag', 'restaurant_tag.rest_id', 'restaurant.id')
            .innerJoin('tag', 'restaurant_tag.tag_id', 'tag.id')
            .where('tag.id', tagID)
            .orderBy('tag.name');

        return query.then((rows) => {
            return rows.map(row => ({
                tag_name: row.tag_name,
                id: row.id,
                name: row.name,
                price: row.price,
                img: row.img,
                tags: []
            }))
        })
        .then(rows => {
            return Promise.all(
                rows.map(row => {
                    let query = this.knex
                    .select('tag.name')
                    .from('tag')
                    .innerJoin('restaurant_tag', 'tag.id', 'restaurant_tag.tag_id')
                    .where('restaurant_tag.rest_id', row.id)
                    .orderBy('tag.name')

                    return query.then(tagRows => {
                        tagRows.forEach(tagRow => {
                            row.tags.push(tagRow.name);
                        });
                        return row;
                    })
                })
            )
        })
    }

    listRestByUserFavTag (userID) {
        let query = this.knex
            .select('tag_id')
            .from('users_fav_tag')
            .innerJoin('tag','tag_id','tag.id')
            .where('users_id', userID)
            .orderBy('tag.name');

        return query.then(rows => {
            return rows.map(row => ({
                tagID: row.tag_id
            }))
            .then((tagIDrows)=> {
                tagIDrows.forEach(tagID => {
                    listRestByTag(tagID);
                })
            }) 
        })
    }

    listRestByGeo(coord) {
        // Get all restaurants from DB within range of specified coordinates (user's location)
        // For each restaurant, get own coordinate for pin location on map"
        // Get Restaurant.name for each restaurant
        // Get Restaurant.short_desc for each restaurant
    }

    getRestDetail(restID) {
        let query = this.knex
            .select(
                'restaurant.id',
                'restaurant.name',
                'restaurant.img',
                'restaurant.map',
                'restaurant.about',
                'restaurant.price',
                'restaurant.website',
                'restaurant.phone',
                'restaurant.hours',
                'restaurant.lat',
                'restaurant.lng',
                'restaurant.location'
            )
            .from('restaurant')
            .where('restaurant.id', restID)

        return query.then(rows => {
            return rows.map(row => ({
                id: row.id,
                name: row.name,
                img: row.img,
                about: row.about,
                price: row.price,
                website: row.website,
                phone: row.phone,
                hours: row.hours,
                lat: row.lat,
                lng: row.lng,
                location: row.location,
                tags: []
            }));
        })

        .then(rows => {
            return Promise.all(
                rows.map(row => {
                    console.log("hi");
                    let query = this.knex
                    .select('tag.name')
                    .from('tag')
                    .innerJoin('restaurant_tag', 'tag.id', 'restaurant_tag.tag_id')
                    .where('restaurant_tag.rest_id', row.id)
                    .orderBy('tag.name')

                    return query.then(tagRows => {
                        tagRows.forEach(tagRow => {
                            row.tags.push(tagRow.name);
                        });
                        return row;
                    })
                })
            )
        })
    }

    listReview(restID) {
        // Look up User_Review table for matching restID
        // Return User_Review.user_id(s)
        // For each user_id, look up User table for matching records
        // Return User.img
        // For each user_id, look up User table for matching records
        // Return User.name
        // For each user_id, return matching rating from User_Review table
        // For each user_id, return matching comment from User_Review table
        let query = this.knex
            .select('users.name','users_review.comment','users_review.rating','users_review.created_at')
            .from('users_review')
            .innerJoin('restaurant', 'users_review.rest_id', 'restaurant.id')
            .innerJoin('users', 'users_review.users_id', 'users.id')
            .where('rest_id',restID)
            .orderBy('users_review.created_at','desc');

        return query.then((rows) => {
            return rows.map(row => ({
                name: row.name,
                comment: row.comment,
                rating: row.rating,
                dateSubmitted: row.created_at
            }))
        })
    }

    // addReview(restID,userID,comment,rating) {
    //     return this.knex
    //         .insert({
    //             comment:comment,
    //             rating:rating,
    //             user_id:userID,
    //             rest_id:restID
    //         })
    //         .into('users_review');
    // }

    addReview(comment,rating,userID,restID) {
        let query = this.knex
                    .select()
                    .from('users')
                    .where('users.id',userID)

        return query.then((rows) => {
            console.log(rows);
            if (rows.length !== 1) {
                throw new Error('Invalid user');
            } else {
                
                return this.knex  
                    .insert({
                        users_id: userID,
                        rest_id: restID,
                        comment: comment,
                        rating: rating
                    })
                    .into('users_review');

            }
        })
    }
}

module.exports = RestService;