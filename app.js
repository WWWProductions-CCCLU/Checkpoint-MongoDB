const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/contact", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const contactSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  email: String,
  age: Number,
});

const Contact = mongoose.model("Contact", contactSchema);

// CRUD Operations
app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.get("/contacts/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
});

app.get("/contacts/age/greater-than-18", async (req, res) => {
  const contacts = await Contact.find({ age: { $gt: 18 } });
  res.json(contacts);
});

app.get("/contacts/age/greater-than-18/name-contains-ah", async (req, res) => {
  const contacts = await Contact.find({ age: { $gt: 18 }, firstName: /ah/i });
  res.json(contacts);
});

app.put("/contacts/update-name", async (req, res) => {
  await Contact.findOneAndUpdate(
    { lastName: "Kefi", firstName: "Seif" },
    { firstName: "Anis" }
  );
  res.send("Contact name updated");
});

app.delete("/contacts/delete-under-5", async (req, res) => {
  await Contact.deleteMany({ age: { $lt: 5 } });
  res.send("Contacts aged under 5 deleted");
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await insertInitialContacts(); // Insert initial contacts once the server starts
});

const insertInitialContacts = async () => {
  await Contact.insertMany([
    { lastName: "Ben", firstName: "Moris", email: "ben@gmail.com", age: 26 },
    { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
    {
      lastName: "Emilie",
      firstName: "brouge",
      email: "emilie.b@gmail.com",
      age: 40,
    },
    { lastName: "Alex", firstName: "brown", age: 4 },
    { lastName: "Denzel", firstName: "Washington", age: 3 },
  ]);
  console.log("Initial contacts inserted");
};
