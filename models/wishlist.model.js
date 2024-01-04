let mongoose=require("mongoose");

let wishlistSchema=new mongoose.Schema({
    productId:{
        type:String
    },
    userID:{
        type:String
    }
})

let Wishlistmodel=mongoose.model("wishlist",wishlistSchema);

module.exports={
    Wishlistmodel
}