const mongoose=require("mongoose")
mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb://localhost/myapp',{useNewUrlParser: true, useUnifiedTopology: true },function (err) {
    if(!err){
        console.log("success")
    }else{
        console.log(err)
    }
})
mongoose.model("photos",{name:String,content:String,createTime:Number})
let Photo=mongoose.model("photos")
mongoose.model("faces",{groupId:String,userId:String,userInfo:String})
let Face=mongoose.model("faces")
// Photo.create({name:"zhr",content:"666",createTime:new Date().getTime()},function (err,nc) {
//     console.log(nc)
//     Photo.find(function (err,rs) {
//         console.log(rs)
//     })
// })

// Face.find().distinct("groupId").exec(function (err,rs) {
//     console.log(rs)
// })


Face.find().exec(function (err,rs) {
    console.log(rs)
})

// Photo.findByIdAndUpdate("5dbce78b990f26426c4b4f2e",{cname:'johnson666',age:50,sex:false},function (err,old) {
//     console.log(old)
//     mongoose.disconnect()
// })
// Face.deleteOne({userId:"12"},function (err,rs) {
//     console.log(rs)
// })
// Face.deleteMany(function (err,rs) {
//     console.log(rs)
//     mongoose.disconnect()
// })
