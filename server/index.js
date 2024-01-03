import express from "express";
import connectDB from "./config/connectDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
//import schema
import userSchema from "./model/userSchema.js";

const app = express();
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

//connecting to MongoDB server
connectDB();

//formatdata to send
const formatdata = (user) => {
  const access_token = jwt.sign({ id: user._id }, process.env.Secret_Key);

  return {
    access_token,
    fullname: user.fullname,
    email: user.email,
  };
};
//handling cors
app.use(cors());
//handling json data on server
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const { fullname, email, password, repeatPass } = req.body;

  //validating the data
  if (!fullname) {
    res.status(403).json({ error: "Full Name is required." });
  }
  if (fullname.trim().length <= 4) {
    return res
      .status(403)
      .json({ error: "Full Name must be at least 4 letters long" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Please Enter Email" });
  }
  if (!emailRegex.test(email)) {
    return res
      .status(403)
      .json({ error: "Email is not a valid Email address. Please try again." });
  }
  if (!password) {
    return res.status(403).json({ error: "Please enter the Password" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password must be 6 to 20 character long with 1 capital and 1 lower case letter.",
    });
  }
  if (!repeatPass) {
    return res.status(403).json({ error: "Please repeat the Password." });
  }
  if (!(repeatPass === password)) {
    return res.status(403).json({
      error:
        "Repeat Password is not matching with the Password. Please try again.",
    });
  }
  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let user = userSchema({
      fullname: fullname,
      email: email,
      password: hashed_password,
    });

    user
      .save()
      .then((data) => {
        return res.status(200).json(formatdata(data));
      })
      .catch((err) => {
        if (err.code == 11000) {
          res.status(500).json({ error: "Email is already exist." });
        } else res.status(500).json({ error: err.message });
      });
  });
});

//sign-in request
app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;
  userSchema
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "Email not Found." });
      } else
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res
              .status(403)
              .json({ error: "error occured while login, please try again." });
          }
          if (!result) {
            return res.status(403).json({ error: "Incorrect Password." });
          } else {
            return res.status(200).json(formatdata(user));
          }
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running.");
});
