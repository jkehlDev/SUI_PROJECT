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
     * @method dataMapper#getAllRoles - SET USER REQUEST
     * @param {String} user_name User name
     * @param {CallableFunction} callback (err: Error, result: QueryArrayResult<R>) - Function call after resolve request.
     */
    setUser(user, callback) {
        const query = {
            text: `INSERT INTO "users"("user_name","user_lastName","user_firstName","user_mail","user_password") VALUES ($1,$2,$3,$4,$5) RETURNING "user_name","user_lastName","user_firstName","user_mail"`
        };
        dataBase_client.query(query,[user.user_name, user.user_lastName, user.user_firstName, user.user_mail, user.user_password], callback);
    },
};


module.exports = dataMapper;