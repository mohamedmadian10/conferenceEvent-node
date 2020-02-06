let express= require("express");
let path = require("path");
let mongoose =require("mongoose");

let speakerrouter =express.Router();

require("../model/speakermodel");
let speakermodel= mongoose.model("speakers")

speakerrouter.get("/add",(request,response)=>{
    response.render("speakers/addSpeaker")


})//add get

speakerrouter.post("/add",(request,response)=>{
    let speaker = new speakermodel({
       // _id:request.body.id,
        name:request.body.name,
        age:request.body.age,
        username:request.body.userName,
        userpass:request.body.userPassword
    });
    speaker.save((err,result)=>{

        response.redirect("/speakers/list")
    })

    
})//add post

speakerrouter.get("/list",(request,response)=>{
    speakermodel.find({},(err,result)=>{
        if(!err){
            response.render("speakers/speakerslist",{speakers:result})
        }
    })


    
})//list

speakerrouter.get("/edit/:id",(request,response)=>{
    speakermodel.findOne({_id:request.params.id},(err,result)=>{
        response.render("speakers/editspeaker",{speaker:result})

    })


    
})//edt get

speakerrouter.post("/edit/:id",(request,response)=>{
    speakermodel.updateOne({_id:request.params.id},{

        $set:{name:request.body.name,
            age:request.body.age,
            username:request.body.username,
            userpass:request.body.userpass

        }
    })
    .then((data)=>{
        response.redirect("/speakers/list")
    })
    .catch((error)=>{response.send(error)})

})//edt post
    



speakerrouter.get("/delete/:id",(request,response)=>{
    speakermodel.deleteOne({_id:request.params.id})
    .then((data)=>{
        response.redirect("/speakers/list")
    })
    .catch((error)=>{
        response.send("error")
    })

    
})//delete get







module.exports=speakerrouter;