let mongoose = require("mongoose");

autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/eventsdatabase",{ useNewUrlParser: true,useUnifiedTopology: true});

autoIncrement.initialize(connection);

let speakermodel=new mongoose.Schema({

    _id:Number,
    name:String,
    age:String,
    username:String,
    userpass:String

})
//mapping

//autoincreement
speakermodel.plugin(autoIncrement.plugin, {
    model: 'eventsdatabase',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});


mongoose.model("speakers",speakermodel);