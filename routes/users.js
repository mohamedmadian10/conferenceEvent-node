let express =require("express");
let path =require("path");
let mongoose=require("mongoose");
require("../model/eventmodel");
require("../model/speakermodel");
let userrouter =express.Router();
let eventmodel=mongoose.model("events"); 
let speakermodel=mongoose.model("speakers");

userrouter.get("/speakerprofile",(request,response)=>{
    eventmodel.find({$or:[{otherSpeakers:request.session.Id},{mainspeaker:request.session.Id}]}).populate({path:"mainspeaker otherSpeakers"}).then((result)=>{
        console.log(result);
        response.render("speakers/speakerprofile",{events:result})
    }).catch((error)=>{
        response.send(error)
    })
    
    
})



module.exports= userrouter;