let express =require("express");
let path =require("path");
let mongoose =require("mongoose");
let eventrouter = express.Router();

require("../model/eventmodel");
require("../model/speakermodel");

let eventmodel=mongoose.model("events"); 
let speakermodel=mongoose.model("speakers");

eventrouter.get("/add",(request,response)=>{
    speakermodel.find({})
    .then((data)=>{
        response.render("events/addevent",{speakers:data})

    })
    .then((error)=>{
        response.send(error)
    })

})//addevent get

eventrouter.post("/add",(request,response)=>{
    let eventobj = new eventmodel({
        // _id:request.body.id,
        title:request.body.title,
        mainspeaker:request.body.mainspeaker,
        otherSpeakers:request.body.otherSpeakers
    })
    eventobj.save().then((result)=>{
        response.redirect("/events/list")
    })
    .catch((error)=>{response.send(error)})


})//addevent post

eventrouter.get("/list",(request,response)=>{
    
eventmodel.find({}).populate({path:"mainspeaker otherSpeakers"}).then((result)=>{
    console.log(result);
    response.render("events/eventslist",{events:result})
})
.catch(error=>{response.send(error)});

})//event list get

eventrouter.get("/edit/:id",(request,response)=>{
    eventmodel.findOne({_id:request.params.id})
    .then((eventdata)=>{
        speakermodel.find({})
        .then((speakerdata)=>{
            response.render("events/editevent",{speakers:speakerdata,event:eventdata})

        }).catch((speakererror)=>{response.send(speakererror)})
    })
    .catch((error)=>{response.send(error)});
})//editevent get

eventrouter.post("/edit/:id",(request,response)=>{
    eventmodel.updateOne({_id:request.params.id},
        {$set:{title:request.body.title,
                mainspeaker:request.body.mainSpeaker,
                otherSpeakers:request.body.otherSpeakers
    }
    }
        )
        .then((result)=>{
            response.redirect("/events/list")
            console.log(result)
        })
        .catch((error)=>response.send(error))
      
    
  
})//editevent post

eventrouter.get("/delete/:id",(request,response)=>{
    eventmodel.deleteOne({_id:request.params.id})
    .then((result)=>{
        response.redirect("/events/list")
    })
    .catch((error)=>{response.send(error)})
})//delete event get










module.exports=eventrouter;