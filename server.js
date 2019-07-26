const express = require("express");
const path = require("path");
const indexRoute = require("./routes/index");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// The “extended” syntax allows for rich objects and arrays to be encoded
//  into the URL-encoded format, allowing for a JSON-like experience with URL-encoded
app.use(express.urlencoded({ extended: false }));
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());
console.log(path.join(__dirname, "dist"));

app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.use("/", indexRoute);

const PORT = process.env.NODE_PORT || 4000;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
