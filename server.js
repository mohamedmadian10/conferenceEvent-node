let express = require("express");
let authrouter = require ("./routes/auth");
let speakerrouter = require("./routes/speakerrouters");
let eventrouter = require("./routes/eventroutes");
let userrouter = require("./routes/users");
let morgan = require("morgan");
let path = require ("path");
let body_parser =require("body-parser");
let express_session = require("express-session");
let connect_flash=require("connect-flash");
let cookie_parser=require("cookie-parser");
let mongoose = require("mongoose");
// let bcrypt = require("bcrypt");
//creat server
let app = express();
mongoose.connect("mongodb://localhost:27017/eventsdatabase",{ useNewUrlParser: true ,useUnifiedTopology: true,})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(error);
});

//middle ware
//first mw

// app.use((request,response,next)=>{
// console.log(request.url,request.method);
// // response.send("first")
// next();

// })


//setting
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(morgan("short"));
app.use(express.static(path.join(__dirname,"publics")));
app.use(express.static(path.join(__dirname,"/node_modules/bootstrap/dist")));
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json())
app.use(express_session({secret: 'keyboard cat',
resave: false,
saveUninitialized: true,}));
app.use(connect_flash());
// app.use(cookie_parser);

//second mw 
// // app.use((request,response,next)=>{
// // let min=(new Date()).getMinutes();

// // if(min<20 ){
// // // response.send("auth")
// // console.log("authorized");
// // next();

// // }
// // else{
// // // response.send("not auth")
// // next(new Error("not  now"))

// // }


// })

//3rd mw
// app.use((request,response)=>{

// response.send("offer page")

// })


//err mw

app.use((err,request,response,next)=>{

    response.send("ERROR "+err.message)
})



//routing

app.use(/\//,(request,response)=>{
    console.log(path.join(__dirname,"views","home.html"));
// response.sendFile(path.join(__dirname,"views","home.html"));
response.render("home");


})

app.use(authrouter);
app.use((request,response,next)=>{
    if(request.session.username && request.session.userpass){
        response.locals.username=request.session.username;

        next()
    }
    else
    {
        response.redirect("/login")
    }

})
app.use("/speakers",speakerrouter);
app.use("/users",userrouter);
app.use("/events",eventrouter);

//listen
app.listen(8080,()=>{


    console.log("its lestenning")

})