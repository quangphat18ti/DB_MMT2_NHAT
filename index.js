const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const updateDB = require("./config/updateDB");
const routers = require("./routers");

const cron = require('node-cron');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Đây là Database Mạng Máy Tính của Phát Cute 123 cho Nhật ngooooongok");
});

// routes
app.use("/api/website", routers.website);
app.use("/api/category", routers.category);
app.use("/api/product", routers.product);
app.use("/api/websiteAPI", routers.websiteAPI);

var task = cron.schedule('* * * * *', async () => {
  console.log('Update DB');
  updateDB();
}, {
  scheduled: false
});

task.start();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));