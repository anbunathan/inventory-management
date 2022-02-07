import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

import auth from "./routes/auth";
import users from "./routes/users";
import employees from "./routes/employees";
const cors = require('cors');

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, {useMongoClient: true});

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use('/api/employees', employees);
app.use(cors());

app.post("/api/auth", (req,res) => {
    res.status(400).json({errors: {global:"Invalid credentials"}});
});


// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
//   });

// app.listen(8080, () => console.log("Running on localhost:8080"));

app.use(express.static(path.join(__dirname, '..', 'client/build')));
console.log("__dirname = %s", path.resolve(path.join(__dirname, '..', 'client/build', 'index.html')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
})
app.listen(process.env.PORT || 8080, () => console.log("Running on localhost:8080"));