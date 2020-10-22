const dataBase_client = require('./dataBase_client');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description DATA MAPPER module.
 */
const dataMapper = {
    /**
     * @method dataMapper#getUser - GET USER REQUEST BY USER NAME
     * @param {String} user_name User name
     * @param {CallableFunction} callback (err: Error, result: QueryArrayResult<R>) - Function call after resolve request.
     */
    getUser(user_name, callback) {
        const query = {
            text: `SELECT * FROM "users" WHERE "user_name"=$1`
        };
        dataBase_client.query(query,[user_name], callback);
    },
    
    /**
     * @method dataMapper#addUser - ADD USER REQUEST
     * @param {String} user_name User name
     * @param {CallableFunction} callback (err: Error, result: QueryArrayResult<R>) - Function call after resolve request.
     */
    addUser(user, callback) {
        const query = {
            text: `INSERT INTO "users"("user_name","user_mail","user_password") VALUES ($1,$2,$3) RETURNING "user_name","user_mail"`
        };
        dataBase_client.query(query,[user.user_name, user.user_mail, user.user_password], callback);
    },

    /**
     * @method dataMapper#deleteUser - DELETE USER REQUEST
     * @param {String} user_name User name
     * @param {CallableFunction} callback (err: Error, result: QueryArrayResult<R>) - Function call after resolve request.
     */
    deleteUser(user_name, callback) {
        const query = {
            text: `DELETE FROM "users" WHERE "user_name" = $1`
        };
        dataBase_client.query(query,[user_name], callback);
    },
};


module.exports = dataMapper;