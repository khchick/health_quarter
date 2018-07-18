const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development' 
const knexFile = require('../../knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

const bcrypt = require('../../bcrypt.js');


module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-signup', new LocalStrategy(
        {passReqToCallback : true},
        async (req, email, password, done) => {
            try{
                let users = await knex('users').where({email:email});
                if (users.length > 0) {
                    return done(null, false, { message: 'Email already taken' });
                }
                let hash = await bcrypt.hashPassword(password)
                const newUser = {
                    email:email,
                    password:hash,
                    name:req.body.nickname,
                    img:`/images/users/${req.file.originalname}`
                };
                console.log(req.body);
                let userId = await knex('users').insert(newUser).returning('id');
                newUser.id = userId;

                for(let i = 0; i < req.body.tag.length; i++) {
                    let favTagId = await knex("users_fav_tag").insert({users_id:`${newUser.id}`,tag_id:req.body.tag[i]}).returning('tag_id');
                }

                done(null,newUser);
            }catch(err){
                done(err);
            }
        })
    );

    passport.use('local-login', new LocalStrategy(
        async (email, password, done) => {
            try{
                let users = await knex('users').where({email:email})
                if(users.length == 0){
                    return done(null, false, { message: 'Incorrect credentials' });
                }
                let user = users[0];
                let result = await bcrypt.checkPassword(password, user.password);
                if(result) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect credentials'});
                }
            }catch(err){
                done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        let users = await knex('users').where({id:Number(id)});
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
    });
};