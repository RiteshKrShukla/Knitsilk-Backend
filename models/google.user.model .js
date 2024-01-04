let mongoose=require("mongoose");

let userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
})

let GoogleUsermodel=mongoose.model("googleUser",userschema);

module.exports={
    GoogleUsermodel
}