var express = require('express');
var router = express.Router();
const mongoose=require("mongoose")



router.post('/',function (req, res) {
    let groupId=req.body.groupId
    let userId=req.body.userId
    let userInfo=req.body.userInfo
    let Face=mongoose.model("faces")
    Face.create({groupId:groupId,userId:userId,userInfo:userInfo},function (err,nc) {
        console.log("插入成功")
        res.json({"esg":"SUCCESS"})
    })
})
//---------------------

//接收前端的请求，返回上传图片的列表
router.get("/group",function (req,res) {
    let Face=mongoose.model("faces")
    Face.find().distinct("groupId").exec(function (err,rs) {
        res.json(rs)
    })

})


module.exports = router;
