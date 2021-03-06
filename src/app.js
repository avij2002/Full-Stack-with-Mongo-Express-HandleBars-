const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
require("../src/db/conn");
const User = require("./models/usermessage");
const path = require("path");
const hbs = require("hbs");
const { serialize } = require("v8");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jqery/dist")));
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use(express.static(static_path));
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index")
});

app.post("/contact", async(req,res)=>{
    try{
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }catch(e){
        console.log(e);
    }
})

app.get("/about",(req,res)=>{
    res.render("about")
});

app.listen(port,()=>{
    console.log(`Connection is Successful on port ${port}`);
})
