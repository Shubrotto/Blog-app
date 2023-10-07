require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT | "http://localhost:5000";
const MONGO_URL = process.env.MONGO_URL;
// router
const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const categoryRoute = require("./routes/categoriesRoute");

const multer = require("multer");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);

app.listen(PORT, () => {
  console.log(`Server runing at http://localhost:${PORT}`);
});
