var express = require('express');
var router = express.Router();
const mongoose=require("mongoose")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//-------图片上传-------
//文件上传中间件(指定上传的临时文件夹是/uploads)
const fs=require('fs')
const multer=require('multer')
let upload = multer({ dest: './uploads/' })
//文件上传的处理（avatar是上传时的filedName）
router.post('/upload', upload.single('avatar'), function (req, res, next) {
  //req.body是普通表单域
  //req.file是文件域
  let msg={
    body:req.body,
    file:req.file
  }


  const FILE_PATH="./public/images/"
  //将临时文件上传到/public/images中
  let output=fs.createWriteStream(FILE_PATH+req.file.originalname)
  let input=fs.createReadStream(req.file.path)
  input.pipe(output)
  //将图片以base64编码存储到数据库
  let image = fs.readFileSync(req.file.path)
  let imageData=Buffer.from((image).toString('base64'))

  let Photo=mongoose.model("photos")
  Photo.create({name:req.file.originalname,content:imageData,createTime:new Date().getTime()},function (err,nc) {
    console.log("插入成功")
    res.json({"id":nc._id})
  })
})
//---------------------

//接收前端的请求，返回上传图片的列表
router.get("/list",function (req,res) {
   let Photo=mongoose.model("photos")
   Photo.find(function (err,rs) {
      res.json(rs)
   })

})
//根据id删除图片
router.post("/delete",function (req,res) {
  let Photo=mongoose.model("photos")
  let id=req.body.id
  Photo.deleteOne({_id:id},function (err,rs) {
    res.json(rs)
})

})

//接收前端的请求，返回上传图片的列表
router.get("/files",function (req,res) {
  fs.readdir('public/images',function (err,dir) {
    res.json(dir)
  })
})
//图片列表
router.get("/listImages",function (req,res) {
  res.render("index")
})


module.exports = router;
