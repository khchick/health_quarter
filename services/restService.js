class RestService {

    constructor(knex) {
        this.knex = knex;
    }

//     add(noteTitle,noteContent,username) {
//         let query = this.knex
//                     .select()
//                     .from('users')
//                     .where('users.username',username);

//         return query.then((rows) => {
//             if (rows.length !== 1) {
//                 throw new Error('Invalid user');
//             } else {
//                 return this.knex  
//                     .insert({
//                         user_id: rows[0].id,
//                         title: noteTitle,
//                         content: noteContent
//                     })
//                     .into('notes');
//             }
//         })
//     }

//     list(username) {
//         if (typeof username !== 'undefined') {
//             let query = this.knex
//                 .select('notes.id','notes.title','notes.content','notes.updated_at')
//                 .from('notes')
//                 .innerJoin('users','notes.user_id','users.id')
//                 .where('users.username',username)
//                 .orderBy('notes.id');

//             return query.then((rows) => {
//                 return rows.map(row => ({
//                     id: row.id,
//                     title: row.title,
//                     content: row.content,
//                     updated_at: row.updated_at
//                 }));
//             });
//         } 
//         else {
//             let query = this.knex.select('notes.title','notes.content','notes.updated_at')
//                 .from('notes')

//             return query.then((rows) => {
//                 return rows.forEach((row) => ({
//                     id: row.id,
//                     title: row.title,
//                     content: row.content,
//                     updated_at: row.updated_at
//                 }));
//             });

//             // Alternative solution (to be revisited)
//             // let query = this.knex.select('users.username', 'notes.id', 'content')
//             // .from('notes')
//             // .innerJoin('users', 'notes.user_id', 'users.id');

//             // return query.then((rows) => {
//             //     const result = {};
                
//             //     rows.forEach(r => {
//             //         if (typeof result[r.username] === 'undefined') {
//             //             result[r.username] = [];
//             //         }
//             //         result[r.username].push({
//             //             id: r.id,
//             //             content: r.content
//             //         });
//             //     });

//             //     return result;
//             // });

//         }
//     }

//     update(id,noteTitle,noteContent,username) {
//         let query = this.knex
//                     .select()
//                     .from('users')
//                     .where('users.username',username);

//         return query.then((rows) => {
//             if (rows.length !== 1) {
//                 return new Error('Invalid user');
//             } else {
//                 return this.knex('notes')
//                     .where('id',id)
//                     .update({
//                         title: noteTitle,
//                         content: noteContent
//                     });
//             }
//         });
//     }

//     remove(id,username) {
//         let query = this.knex
//                     .select()
//                     .from('users')
//                     .where('users.username',username);

//         return query.then((rows) => {
//             if (rows.length !== 1) {
//                 return new Error('Invalid user');
//             } else {
//                 return this.knex('notes')
//                     .where('id',id)
//                     .delete();
//             }
//         })
//     }
 
}

module.exports = RestService;