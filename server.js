const express = require("express");
const CORS = require("cors");
const mongoose = require("mongoose");
let Content = require("./content.model");

// creating the testing express app
const app = express();

// connecting to mongoose
mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://localhost:27017/testFiveMonths",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB connected to your app!");
    }
  }
);

app.use(CORS());
app.use(express.json());

// creating the the first route of my server
app.get("/", (req, res) => {
  Content.find({}, (err, foundContent) => {
    if (!err) {
      if (foundContent) {
        res.send(foundContent);
      }
    } else {
      res.status(400).send("Error occured: " + err);
    }
  });
});

// creating the adding route for adding "Content" to DB and handle the front-end request
app.post("/add", (req, res) => {
  const FormData = req.body;
  const { title, date, message } = FormData;
  const newContent = new Content({ title, date, message });
  newContent
    .save()
    .then((data) => {
      // console.log(data);
      res.send({
        message: "Your content added successfully to DB!",
        data: data,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// Single Content data send
app.get("/:id", (req, res) => {
  const id = req.params.id;
  Content.findById(id, (err, foundContent) => {
    if (err) {
      res.status(400).send("Error occured: " + err);
    } else {
      res.send(foundContent);
    }
  });
});
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  Content.findByIdAndDelete(id, (err) => {
    if (!err) {
      res.send("Successfully deleted the content from DB!");
    } else {
      res
        .status(400)
        .send("Error occured when deleting items, error type: " + err);
    }
  });
});

// this route for editing
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const inputChange = req.body;
  const { title, date, message } = inputChange;
  const update = {
    title,
    message,
    date,
  };
  Content.findByIdAndUpdate(id, update, { new: true }, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send("Your data updated successfully!");
    }
  });
});
// app.patch("/:id", (req, res) => {
//   const id = req.params.id;
// });
// creating a port for my server
const PORT = 5000;
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Your app is running on port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", +err);
  }
});
