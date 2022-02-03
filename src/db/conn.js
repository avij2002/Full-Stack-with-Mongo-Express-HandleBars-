const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dynamicWeb")
.then(()=>{
    console.log("DataBase is Connected");
}).catch((e)=>{
    console.log(e);
});