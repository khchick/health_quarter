class RestService {

    constructor(knex) {
        this.knex = knex;
    }

    // Get Restaurant.name from DB with matching tag
    // Return average from sum of all ratings with matching rest_id
    // Get Restaurant.price from DB
    // Look up Restaurant_Tag table for tag_id per matching rest_id, return tag name for all tag_id(s), excluding the passed in arguement

    listRestByTag(tagID) {
            let query = this.knex
                .select('restaurant.name','restaurant.price','restaurant.img','tag.name')
                .from('restaurant')
                .innerJoin('restaurant_tag','restaurant_tag.rest_id','restaurant.id')
                .innerJoin('tag','restaurant_tag.tag_id','tag.id')
                .where('tag.id',tagID)
                .orderBy('tag.name');

            return query.then((rows) => {
                console.log(rows);
                return rows.map(row => ({
                    name: row.name,
                    price: row.price,
                    img: row.img,
                    tags: row.tags
                }));
            });
        }  

    listRestByGeo(coord) {
        // Get all restaurants from DB within range of specified coordinates (user's location)
        // For each restaurant, get own coordinate for pin location on map"
        // Get Restaurant.name for each restaurant
        // Get Restaurant.short_desc for each restaurant
    }

    getRestDetail(restID) {
        // Get Restaurant.name from DB for matching restID
        // Get Restaurant.img from DB for matching restID
        // Get Restaurant.about from DB for matching restID
        // Get Restaurant.price from DB for matching restID
        // Get Restaurant.website from DB for matching restID
        // Get Restaurant.phone from DB for matching restID
        // Get Restaurant.hours from DB for matching restID
        // Get Restaurant.map from DB for matching restID
        // Get Restaurant.location from DB for matching restID
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