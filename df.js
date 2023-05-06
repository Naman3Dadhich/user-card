const pg = require("pg");

const client = new pg.Client(
  "postgres://idbeljxj:EP7Bdl0UuI1zk9XSJl_km9NmbwK4mApk@tiny.db.elephantsql.com/idbeljxj"
);
client.connect(() => console.log("database connected"));

module.export = client;
