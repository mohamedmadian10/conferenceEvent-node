let express = require("express");
let path = require("path");
let mongoose =require("mongoose");

require("../model/speakermodel");
let speakermodel=mongoose.model("speakers");


let authrouter = express.Router();

//routing params
authrouter.get("/login",(request,response)=>{
    // response.send("login get")
    // console.log(request.params.id)
    // response.sendFile(path.join(__dirname,"..","views","auth","login.html"));
    response.render("auth/login",{msg:request.flash("msg")})
})//logon get

authrouter.post("/login",(request,response)=>{
    if(request.body.username=="mohamedmadian"&&request.body.userpass==123){
        request.session.role="admin";
        request.session.username=request.body.username;
        request.session.userpass=request.body.userpass;
        // console.log(request.session);
        response.redirect("/speakers/add");

    }else{
        speakermodel.findOne({username:request.body.username,userpass:request.body.userpass})
        .then((speakers)=>{
            console.log(speakers);
            request.session.role="speaker";
            request.session.username=speakers.username;
            request.session.userpass=speakers.userpass;
            request.session.Id= speakers._id;
            response.redirect('/users/speakerprofile')
        })
        .catch((error)=>{
            console.log(error);
            request.flash("msg","username or userpass wrong");
            response.redirect("/login")

        })
       
    }
        //  console.log(request.body)   
        // response.send("post")

})//logon post

authrouter.get("/register",(request,response)=>{

    response.send("register get ")
})//register get

authrouter.post("/register",(request,response)=>{})//register post



authrouter.get("/adminprofile",(request,response)=>{
    let name ="mo"
    // response.sendFile(path.join(__dirname,"..","views","auth","adminprofile.html"));
    response.locals.names=["ahmed","mmm","sam"];
    response.render("auth/adminprofile",{myname:name})
})

authrouter.get("/logout",(request,response)=>{
    request.session.destroy(()=>{
        response.redirect("/login");
    })

})//logout get

module.exports= authrouter;

