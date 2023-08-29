require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./configOptions/corsOptions.js");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const veriFyJWT = require("./middleware/veriFy.js");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;
const credentials = require("./middleware/credentials.js");
const mongoose = require("mongoose");
const connectDB = require("./configOptions/dbConn.js");

//Connect to DB
connectDB();

// custom middleware logger
app.use(logger);

//add fetch cookie credintels requirment
app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/refresh", require("./routes/refresh.js"));
app.use("/logout", require("./routes/logOut.js"));

app.use(veriFyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// app.get('/lala',(req,res)=>{
//     res.json({message:"Hi i am from server"})
// })

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
