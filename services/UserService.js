class UserService {

    constructor(knex) {
        this.knex = knex;
    }

    // // Define write function
    // writeFile(file, data) {
    //     return new Promise((resolve, reject) => {
    //         fs.writeFile(`${uploadDirectory}${path.sep}${file}`, data, (err) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(file);
    //             }
    //         })
    //     })
    // }

    // // Define read function
    // readFile(file) {
    //     return new Promise((resolve, reject) => {
    //         fs.readFile(`${uploadDirectory}${path.sep}${file}`, (err, data) => {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(data);
    //             }
    //         })
    //     })
    // }

    // // Define functions to get file name and extension, for inserting timestamp
    // getFilename(filename) {
    //     return filename.split('.').shift();
    // }
    // getExtension(filename) {
    //     return filename.split('.').pop();
    // }

    createUser(email, password, img, name, tags) {
        // Insert record to User table with passed in arguments
    }

    getUserDetail(userID) {
        // Get User.img from DB for matching userID
        // Get User.name from DB for matching userID
        // Get User.email from DB for matching userID
    }

    updateUserDetail(userID, img, name, tags) {
        // Update record on form submission
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