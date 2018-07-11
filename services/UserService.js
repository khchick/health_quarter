class UserService {

    constructor(knex) {
        this.knex = knex;
    }

    createUser(email,password,img,name,tags) {
        // Insert record to User table with passed in arguments
    }

    getUserDetail(userID) {
        // Get User.img from DB for matching userID
        // Get User.name from DB for matching userID
        // Get User.email from DB for matching userID
    }

    updateUserDetail(userID,img,name,tags) {
        // Update record on form submission
    }

    listOwnReview(userID) {
        // Get rest_id from User_Review table for matching userID
        // Join Restaurant table to retrieve Restaurant.name
        // Get User_Review.comment of matching rest_id
        // Get User_Review.rating of matching rest_id
    }

}

module.exports = UserService;