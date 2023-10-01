const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

// Enable CORS to make API Calls from front to back end
app.use(cors());

app.use(express.static("front-end"));

// Initialize port for listening
const port = process.env.PORT || 5050;

app.use(bodyParser.urlencoded({ extended: false }));

// this helps in parsing data with JSON Format
app.use(bodyParser.json());

// MySQL Connection
const pool = mysql.createPool({
  //Maximum number of connections
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "contact_list",
});

app.get("/get-contacts", (req, res) => {
  pool.getConnection((err, connect) => {
    if (err) throw err;
    console.log(`connected as ${connect.threadId}`);

    connect.query("SELECT * FROM contacts", (err, rows) => {
      connect.release();

      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
        res.status(500).json({ error: "Error fetching contacts" });
      }
    });
  });
});

app.post("/add-contact", (req, res) => {
  pool.getConnection((err, connect) => {
    if (err) throw err;
    console.log(`connected as id ${connect.threadId}`);

    const { firstname, lastname, email, conNumber } = req.body;

    connect.query(
      "INSERT INTO contacts (firstname, lastname, email, conNumber) VALUES (?, ?, ?, ?)",
      [firstname, lastname, email, conNumber],
      (err, result) => {
        connect.release();

        if (!err) {
          const newContact = {
            conID: result.insertId,
            firstname: firstname,
            lastname: lastname,
            email: email,
            conNumber: conNumber,
          };

          res.json(newContact);
        } else {
          console.log(err);
          res.status(500).json({ error: "Error adding contact" });
        }
      }
    );
    console.log(req.body);
  });
});

// Delete a contact by ID
app.delete("/delete-contact/:id", (req, res) => {
  pool.getConnection((err, connect) => {
    if (err) throw err;
    console.log(`connected as id ${connect.threadId}`);

    connect.query(
      "DELETE FROM contacts WHERE conID = ?",
      [req.params.id],
      (err, rows) => {
        connect.release();

        if (!err) {
          res.json({
            message: `Contact ID Number ${req.params.id} is being deleted`,
          });
        } else {
          console.log(err);
        }
      }
    );
  });
});

// Update a contact by ID
app.put("/update-contact/:id", (req, res) => {
  const conID = req.params.id;

  // Data destructuring
  const { firstname, lastname, email, conNumber } = req.body;

  pool.getConnection((err, connect) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database connection error" });
    }

    connect.query(
      "UPDATE contacts SET firstname = ?, lastname = ?, email = ?, conNumber = ? WHERE conID = ?",
      [firstname, lastname, email, conNumber, conID],
      (err, result) => {
        connect.release();

        if (!err) {
          res.json({ message: `Contact ID Number ${conID} is updated` });
        } else {
          console.error(err);
          res.status(500).json({ error: "Error updating contact" });
        }
      }
    );
  });
});

//Listen on environment port or 5050
app.listen(port, () => console.log(`Listening on port ${port}`));
