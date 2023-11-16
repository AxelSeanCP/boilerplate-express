let express = require('express');
let app = express();
// ---------- OPTIONAL IMPORTS ----------
require('dotenv').config(); // for challenge #6
let bodyParser = require('body-parser'); // for challenge #11
// ---------- OPTIONAL IMPORTS ----------

// ---------- THIS MIDDLEWARE MUST BE MOUNTED BEFORE ALL THE ROUTES THAT DEPENDS ON IT ----------

// #3 serve an html file
absolutePath = __dirname + "/views/index.html";
app.get("/", (req,res) => {
    res.sendFile(absolutePath);
})

// #7 implement a root level request logger middleware
app.use((req,res,next) => {
    const output = req.method + " " + req.path + " - " + req.ip;
    console.log(output);
    next();
});

// #11 use body-parser to parse post request
app.use(bodyParser.urlencoded({extended: false}));

// ---------- THIS MIDDLEWARE MUST BE MOUNTED BEFORE ALL THE ROUTES THAT DEPENDS ON IT ----------

// ---------- THIS IS WHERE YOU CAN START LEARNING ----------

// #1 meet the node console
// console.log("Hello World");

// #2 start working express server
// app.get("/", (req,res) => {
//     res.send("Hello Express");
// });

// #4 serve static assets
absPath = __dirname + "/public";
app.use("/public", express.static(absPath));

// #5 serve JSON on a specific route
// app.get("/json", (req, res) => {
//     res.json({"message": "Hello json"});
// });

// #6 use the .env file
process.env.MESSAGE_STYLE='uppercase';
app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({"message": "HELLO JSON"});
    }else {
        res.json({"message": "Hello json"});
    }
});

// #8 chain middleware to create a time server
app.get("/now", (req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req,res) => {
    res.json({"time": req.time});
});

// #9 get route parameter input from the client
app.get("/:word/echo", (req,res) => {
    const { word } = req.params;
    res.json({"echo": word});
});

// #10 get query parameter input from the client
// /name?first=Axel&last=Sean
// app.get("/name", (req,res) => {
//     const { first: firstName , last: lastName } = req.query;
//     res.json({"name": `${firstName} ${lastName}`});
// });

// #12 get data from post requests
app.post("/name", (req,res) => {
    const { first: firstName , last: lastName } = req.body;
    res.json({"name": `${firstName} ${lastName}`});
});

app.get("/pesan", (req,res) => {
    res.json({"pesan": "maaf anda telah dinyatakan mengundurkan diri"});
});


































 module.exports = app;
