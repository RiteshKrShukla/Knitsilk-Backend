let mongoose=require("mongoose");

let cartschema=new mongoose.Schema({
    productId:{
        type:String
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1,
    },

    userID:{
        type:String
    }
})

let Cartmodel=mongoose.model("cart",cartschema);

module.exports={
    Cartmodel
}