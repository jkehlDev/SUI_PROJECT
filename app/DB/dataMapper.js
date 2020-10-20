const dataBase_client = require('./dataBase_client');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description DATA MAPPER module.
 */
const dataMapper = {
    /**
     * @method dataMapper#getAllRoles - GET ALL CARDS REQUEST
     * @param {CallableFunction} callback (err: Error, result: QueryArrayResult<R>) - Function call after resolve request.
     */
    getAllRoles(callback) {
        const query = {
            text: `SELECT * FROM "roles"`
        };
        dataBase_client.query(query, callback);
    },
};


module.exports = dataMapper;