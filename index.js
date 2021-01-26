const express = require("express");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config.js");
const app = express();
const cors = require("cors");

//  BodyParser Middleware
app.use(cors());
app.use(express.json());
const postsRoutes = require("./routes/api/posts");
const todosRoutes = require("./routes/api/todos");

// Routes

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello from node");
});

app.use("/api/posts", postsRoutes);
app.use("/api/todos", todosRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
