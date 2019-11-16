const  mongoose=require('mongoose')
const model=require('./models')

mongoose.model("photos",model.PhotoSchema)

mongoose.model("faces",model.FaceSchema)