var express = require('express');
var router = express.Router();
var request = require('request');
//处理要识别的图片
const fs = require('fs')
const multer = require('multer')
let upload = multer({dest: './uploads/'})
router.post('/', upload.single('avatar'), function (req, res, next) {
    //req.body是普通表单域
    //req.file是文件域
    console.log("识别类型:" + req.body.findType)
    // console.log(req.file)
    //将图片以base64编码
    let image = fs.readFileSync(req.file.path)
    let imageData = Buffer.from((image).toString('base64'))
    let findType = req.body.findType
    let Token = req.body.Token
//console.log(imageData)
//console.log(findType)
//console.log(Token)
    //人脸识别处理
    if (findType == "0") {
        //开始识别
        let request_url = "https://aip.baidubce.com/rest/2.0/face/v3/detect"
        request_url = request_url + "?access_token=" + Token

        var options = {
            url: request_url,
            timeout: 5000,
            headers: {
                "Content-Type": "application/json"
            },
            form: {
                "image_type": "BASE64",
                "image": imageData,
                "max_face_num": 5
            }
        }

        request.post(options, function (error, response, body) {
            //console.log(body)
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body))
            }else if(typeof(body) == "undefined"){
                res.json({"error_msg":"timeout",})
            }

        })
    } else if (findType == "1") {
        //开始识别
        let request_url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/animal"
        request_url = request_url + "?access_token=" + Token

        var options = {
            url: request_url,
            timeout: 5000,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form: {
                "image": imageData,
                "top_num": 3
            }
        }

        request.post(options, function (error, response, body) {
            //console.log(body)
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body))
            }else if(typeof(body) == "undefined"){
                res.json({"error_msg":"timeout","result":[]})
            }
        })
    } else if (findType == "2") {
        //申请植物识别Toke
        //开始识别
        let request_url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/plant"
        request_url = request_url + "?access_token=" + Token

        var options = {
            url: request_url,
            timeout: 5000,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form: {
                "image": imageData,
            }
        }

        request.post(options, function (error, response, body) {
            //console.log(body)
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body))
            }else if(typeof(body) == "undefined"){
                res.json({"error_msg":"timeout","result":[]})
            }
        })
    }


})
//---------------------


module.exports = router;