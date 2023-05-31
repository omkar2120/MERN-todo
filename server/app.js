const express  = require('express');
const app = express();
const cors = require('cors');

require("./conn/connection")
app.use(express.json());
app.use(cors());
const router = require("./route/routes.js");

app.use(router)


app.listen(3001,() => {
    console.log("Server is running on port 3000")
})