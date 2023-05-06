const express = require("express");
const cors = require("cors");
const pg = require("pg");

const coonectionString =
  "postgres://idbeljxj:EP7Bdl0UuI1zk9XSJl_km9NmbwK4mApk@tiny.db.elephantsql.com/idbeljxj";

const client = new pg.Client(coonectionString);
client.connect((err) => {
  if (err) {
    console.log("error connecting database", err);
  } else console.log("database connected");
});

const port = 8000;
const app = express();
app.use(cors({
  origin: "https://main--jolly-ganache-aaaae0.netlify.app/", // only allow requests from this origin
  methods: "GET,POST", // only allow GET and POST requests
  credentials: true // allow cookies to be sent with requests
}));
app.use(express.json());

app.get("/", (req, res) => {
  client.query("SELECT * FROM users", (err, databaseRes) => {
    if (err) {
      console.log(err);
      res.status(500).send("database error ocurred");
    } else res.send(databaseRes.rows);
  });
});

app.post("/adddata", (req, res) => {
  console.log(req.body);

  const secretKey = req.body.secretKey;

  if (Number(secretKey) === 1234) {
    const newUser = req.body.newUser;

    client.query(
      `INSERT INTO  users (username , email) values ('${newUser.username}' ,' ${newUser.email}')`,
      (err, databaseRes) => {
        if (err) {
          console.log(err);
          res.status(500).send("database error ocurred");
        } else {
          client.query("SELECT * FROM users", (err2, databaseRes2) => {
            if (err2) {
              console.log(err2);
              res.status(500).send("database error ocurred");
            } else res.send(databaseRes2.rows);
          });
        }
      }
    );
    // data.push(newUser);
    // res.send(data);
  } else res.status(400).send("error occured");
});

app.listen(port, () => {
  console.log("i am running" + port);
});
