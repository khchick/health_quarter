const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: "accelerate",
        user: "accelerate",
        password: "password"
    }
});

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());


    //confirm the data checks (make sure tables are correct as are table values.)
passport.use('local-login', new LocalStrategy(
    async (email, password, done) => {
        try {
            let users = await knex('user').where({ user_email: email });
            if (users.length == 0) {
                return done(null, false, { message: 'Incorrect Credentials.' });
            }
            let user = users[0];
            let result = await bcrypt.checkPassword(user_password, password);
            if (result) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
        } catch (err) {
            return done(err);
        }
    }
));

passport.use('local-signup', new LocalStrategy(
    async (email, password, done) => {
        try{
            let users = await knex('user').where({email:email});
            if (users.length > 0) {
                return done(null, false, { message: 'Email already taken' });
            }
            let hash = await bcrypt.hashPassword(password)
            const newUser = {
                email:email,
                password: hash
            };
            let userId = await knex('user').insert(newUser).returning('id');
            newUser.id = userId;
            done(null,newUser);
        }catch(err){
            done(err);
        }

    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let users = await knex('user').where({ id: id });
    if (users.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
});
};

// this is used to installize passport put in app.js
setupPassport(app);
