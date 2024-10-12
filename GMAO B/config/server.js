const express = require("express");
const app = express();
const jsonServer = require("json-server");
const mongoose = require("mongoose");
const router = jsonServer.router("db.json");
const server = jsonServer.create();

app.use(express.json());
app.use("/api", router);

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Check if the username and password are valid
  const user = db.users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Check if the username and password are valid
  const user = db.users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    // Generate a JSON Web Token (JWT) to authenticate the user
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});
mongoose.connect("mongodb://localhost/clientdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the client schema
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  ville: { type: String, required: true },
  codePostal: { type: String, required: true },
  telephone: { type: String, required: true },
  modeleTelephone: { type: String, required: true },
  modelePC: { type: String, required: true },
  modeleImprimante: { type: String, required: true },
});

// Create a client model
const Client = mongoose.model("Client", clientSchema);

// Create a new client
app.post("/clients", (req, res) => {
  const client = new Client(req.body);
  client.save((err, client) => {
    if (err) {
      res.status(500).send({ error: "Error creating client" });
    } else {
      res.send({ message: "Client created successfully" });
    }
  });
});

// Print a receipt for a client
app.get("/receipts/:clientId", (req, res) => {
  const clientId = req.params.clientId;
  Client.findById(clientId, (err, client) => {
    if (err) {
      res.status(404).send({ error: "Client not found" });
    } else {
      // Generate a unique identifier for the receipt
      const receiptId = uuid.v4();
      // Store the receipt in the database
      const receipt = new Receipt({ clientId, receiptId });
      receipt.save((err, receipt) => {
        if (err) {
          res.status(500).send({ error: "Error creating receipt" });
        } else {
          // Print the receipt
          res.send({ message: "Receipt printed successfully" });
        }
      });
    }
  });
});

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});
