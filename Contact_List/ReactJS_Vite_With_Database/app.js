//Used the php application XAMPP because the link can't be read
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql";

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
  database: "contactlist",
});

//Get all the information from the database
app.get("/get-contacts", (req, res) => {
  pool.getConnection((err, connect) => {
    if (err) throw err;
    console.log(`connected as ${connect.threadId}`);

    connect.query("SELECT * FROM contact", (err, rows) => {
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

//Adds all the inputted values into the database
app.post("/add-contact", (req, res) => {
  pool.getConnection((err, connect) => {
    if (err) throw err;
    console.log(`connected as id ${connect.threadId}`);

    const { firstName, lastName, email, number } = req.body;

    connect.query(
      "INSERT INTO contact (firstName, lastName, email, number) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, number],
      (err, result) => {
        connect.release();

        if (!err) {
          const newContact = {
            id: result.insertId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            number: number,
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

// Update a contact by ID
app.put("/update-contact/:id", (req, res) => {
  const id = req.params.id;

  // Data destructuring
  const { firstName, lastName, email, number } = req.body;

  pool.getConnection((err, connect) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database connection error" });
    }

    connect.query(
      "UPDATE contact SET firstName = ?, lastName = ?, email = ?, number = ? WHERE id = ?",
      [firstName, lastName, email, number, id],
      (err, result) => {
        connect.release();

        if (!err) {
          res.json({ message: `Contact ID Number ${id} is updated` });
        } else {
          console.error(err);
          res.status(500).json({ error: "Error updating contact" });
        }
      }
    );
  });
});

// Delete a contact by ID
app.delete("/delete-contact/:id", (req, res) => {
  pool.getConnection((err, connect) => {
    if (err) throw err;
    console.log(`connected as id ${connect.threadId}`);

    connect.query(
      "DELETE FROM contact WHERE id = ?",
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
