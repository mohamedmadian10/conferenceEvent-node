let mongoose=require("mongoose");
autoIncrement = require('mongoose-auto-increment');
mongoose.set('useCreateIndex', true);

var connection = mongoose.createConnection("mongodb://localhost:27017/eventsdatabase",{ useNewUrlParser: true,useUnifiedTopology: true});

autoIncrement.initialize(connection);



let eventmodel = new mongoose.Schema({

    _id:Number,
    title:String,
    mainspeaker:{
        type:Number,
        ref:"speakers"
    },
    otherSpeakers:[{
        type:Number,
        ref:"speakers"
    }]


})

eventmodel.plugin(autoIncrement.plugin, {
    model: 'eventsdatabase',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

mongoose.model("events",eventmodel)