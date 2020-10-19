const pg = require('pg');

const client = new pg.Client(process.env.PG_URL);
client.connect(error => {
    if (error) {
        console.log(error);
    }
});

module.exports = client;