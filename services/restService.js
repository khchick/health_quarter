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

    listRestByGeo(coord) {
        // Get all restaurants from DB within range of specified coordinates (user's location)
        // For each restaurant, get own coordinate for pin location on map"
        // Get Restaurant.name for each restaurant
        // Get Restaurant.short_desc for each restaurant
    }

    getRestDetail(restID) {
        let query = this.knex
            .select(
                'restaurant.name',
                'restaurant.img',
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

        // .then(rows => {
        //     return Promise.all(
        //         rows.map(row => {
        //             let query = this.knex
        //             .select('tag.name')
        //             .from('tag')
        //             .innerJoin('restaurant_tag', 'tag.id', 'restaurant_tag.tag_id')
        //             .where('restaurant_tag.rest_id', row.id)
        //             .orderBy('tag.name')

        //             return query.then(tagRows => {
        //                 tagRows.forEach(tagRow => {
        //                     row.tags.push(tagRow.name);
        //                 });
        //                 return row;
        //             })
        //         })
        //     )
        // })
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
    }
}

module.exports = RestService;