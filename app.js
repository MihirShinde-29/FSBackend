const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const itemRouter = require("./routes/item");
dotenv.config();
const connectDB = require("./db");
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.use('/api/items', itemRouter)

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} ✅ - http://localhost:${PORT}/`
  );
});
