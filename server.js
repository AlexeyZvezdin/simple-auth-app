const express = require("express");
const path = require("path");
const indexRoute = require("./routes/index");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models");

dotenv.config();
const app = express();

// CORS FOR DEVELOPMENT PURPOSES
app.use(cors());
app.use(express.json());
// The “extended” syntax allows for rich objects and arrays to be encoded
//  into the URL-encoded format, allowing for a JSON-like experience with URL-encoded
app.use(express.urlencoded({ extended: false }));
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names

app.use("/", indexRoute);

// console.log(path.join(__dirname, "dist"));

// app.use(express.static(path.join(__dirname, "dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "dist", "index.html"));
// });

const PORT = process.env.NODE_PORT || 4000;

const eraseDatabaseOnSync = true;

db.sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
});

const createUsersWithMessages = async () => {
  await db.models.User.create(
    {
      id: "a0544680-3fd3-4309-96e4-a7f758e2f349",
      email: "abs@mail.com",
      password: "Qwerty123!",
      Profile: [
        {
          name: "React",
          country: "Russia",
          city: "Moscow",
          email: "xyz@mail.io",
          password: "Qwerty123!"
        }
      ]
    },
    {
      include: [db.models.Profile]
    }
  );

  await db.models.User.create(
    {
      id: "7f09d7eb-e80d-4577-9660-cc9d6ef9d36b",
      email: "qwerty@gmail.com",
      password: "123#Aaa",
      Profile: [
        {
          name: "Wut",
          country: "Russia",
          city: "Saint-Petersburg",
          password: "123123",
          email: "sample@email.com"
        }
      ]
    },
    {
      include: [db.models.Profile]
    }
  );
};
