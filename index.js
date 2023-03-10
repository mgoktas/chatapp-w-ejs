const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

const path = require("path");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));


app.listen(3000, function() {
    console.log("listening on port 3000");
});
 